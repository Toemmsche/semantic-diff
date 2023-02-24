import QueryPlanResult from '../model/meta/QueryPlanResult';
import { MatchPipeline } from '../../semantic-diff/match/MatchPipeline';
import { defaultDiffOptions, PlanNodeBrowserSerDes } from '../../semantic-diff/index';
import { QP_GRAMMAR } from '../model/meta/QpGrammar';
import { Comparator } from '../../semantic-diff/compare/Comparator';
import { DagEdgeTreatment } from './Parameters';
import { Operator, PlanNode } from '../model/operator/Operator';
import { PipelineBreakerScan } from '../model/operator/inner/PipelineBreakerScan';
import { sum } from 'd3';
import Join, { JoinMethod } from '../model/operator/inner/Join';
import { Select } from '../model/operator/inner/Select';
import LcsLib from '../../semantic-diff/lib/LcsLib';
import { EditScriptGenerator } from '../../semantic-diff/delta/EditScriptGenerator';
import { EarlyProbe } from '../model/operator/inner/EarlyProbe';
import { TableScan } from '../model/operator/leaf/TableScan';

// dunno where to place this
export function treatDagEdges(plan: PlanNode, dagEdgeTreatment: DagEdgeTreatment) {
  if (dagEdgeTreatment >= DagEdgeTreatment.COPY_SUBTREE) {
    PipelineBreakerScan.handlePipelineBreakerScans(
      plan,
      dagEdgeTreatment === DagEdgeTreatment.COPY_SUBTREE
    );
  }
  if (dagEdgeTreatment >= DagEdgeTreatment.FULL_DAG) {
    EarlyProbe.handleEarlyProbes(plan);
  }
}

export enum SimilarityMetric {
  MATCH_ONLY,
  CHILDREN_MATCH,
  WEIGHTED_CMM,
  EDIT_SCRIPT_COST
}

export default function computeSimilarity(
  queryPlanResults: QueryPlanResult[],
  dagEdgeTreatment: DagEdgeTreatment,
  similarityMetric: SimilarityMetric = SimilarityMetric.EDIT_SCRIPT_COST
): void {
  console.time('compute_sim');

  // compute similarities
  [...new Set(queryPlanResults.map((qpr) => qpr.query))].forEach((query) => {
    const qprs = queryPlanResults.filter((qpr) => qpr.query === query);

    qprs.forEach((qpr) => (qpr.similarity = new Map()));

    // compute similarity
    qprs.forEach((first, i) => {
      qprs.slice(i + 1).forEach((second) => {
        const planSerdes = new PlanNodeBrowserSerDes(QP_GRAMMAR, defaultDiffOptions);
        const plans = [first, second].map((qpr) => {
          const plan = planSerdes.transformParsedJsonObj(qpr.queryPlan);
          treatDagEdges(plan, dagEdgeTreatment);
          return plan;
        });

        // use semantic diff
        MatchPipeline.fromMode(defaultDiffOptions).execute(
          plans[0],
          plans[1],
          new Comparator(defaultDiffOptions)
        );

        let similarity;
        if (similarityMetric === SimilarityMetric.WEIGHTED_CMM) {
          // value + weight
          const similarityMap = new Map<PlanNode, number>();
          const weightMap = new Map<PlanNode, number>();
          plans.forEach((plan) => {
            plan.toPostOrderUnique().forEach((n) => {
              let avgCmm;

              // Compute similarity of matching
              let matchSimValue = 0;
              if (n.isMatched()) {
                const cmmA = cmm(n);
                const cmmB = cmm(n.getSingleMatch());
                avgCmm = (cmmA + cmmB) / 2;
                // should give one if they are equal
                matchSimValue = (Math.min(cmmA, cmmB) + 1) / (Math.max(cmmA, cmmB) + 1);
              } else {
                avgCmm = cmm(n);
              }
              weightMap.set(n, avgCmm);
              similarityMap.set(n, matchSimValue);
            });
          });

          const values: number[] = [];
          const weights: number[] = [];

          similarityMap.forEach((v, n) => {
            values.push(v);
            weights.push(weightMap.get(n)!);
          });

          similarity = new Comparator(defaultDiffOptions).weightedAverage(values, weights, 1);
        } else if (similarityMetric === SimilarityMetric.MATCH_ONLY) {
          const matchedCount = plans[0]
            .toPreOrderUnique()
            .filter((n) => !n.isLeaf())
            .filter((n) => n.isMatched()).length;
          const firstCount = plans[0].toPreOrderUnique().filter((n) => !n.isLeaf()).length;
          const secondCount = plans[1].toPreOrderUnique().filter((n) => !n.isLeaf()).length;
          similarity = (2 * matchedCount) / (firstCount + secondCount);
        } else if (similarityMetric === SimilarityMetric.CHILDREN_MATCH) {
          // value + weight
          const similarityMap = new Map<PlanNode, number>();
          plans.forEach((plan) => {
            plan
              .toPostOrderUnique()
              .filter((n) => !n.isLeaf())
              .forEach((n) => {
                let avgCmm;

                // Compute similarity of matching
                let matchSimValue = 0;
                let childSim;
                if (n.isMatched()) {
                  matchSimValue = 1;
                  const lcsLen = new LcsLib(defaultDiffOptions).getLcsLength(
                    n.children,
                    n.getSingleMatch().children,
                    (a, b) => a.isMatchedTo(b)
                  );
                  childSim =
                    (2 * lcsLen) / (n.children.length + n.getSingleMatch().children.length);
                } else {
                  childSim = sum(n.children.map((c) => similarityMap.get(c))) / n.children.length;
                }
                similarityMap.set(n, (matchSimValue + childSim) / 2);
              });
          });
          let similaritySum = 0;
          for (const value of similarityMap.values()) {
            similaritySum += value;
          }
          similarity = similaritySum / similarityMap.size;
        } else {
          // drop the leaf level of nodes
          [plans[0], plans[0]].forEach((plan) =>
            plan
              .toPostOrderUnique()
              .filter((n) => n.isLeaf() && n.isMatched())
              .forEach((n) => n.removeFromParent())
          );
          const editScript = new EditScriptGenerator(defaultDiffOptions).generateEditScript(
            plans[0],
            plans[1]
          );
          const cost = editScript.getCost() - editScript.updates(); // no updates
          similarity = Math.min(1, Math.max(0, 1 - cost / (plans[0].size() + plans[1].size())));
        }
        first.similarity.set(second, similarity);
        second.similarity.set(first, similarity);
      });
    });
  });

  console.timeEnd('compute_sim');
}

export function cmm(
  planNode: PlanNode,
  omitChildCosts: boolean = false,
  useEstimates = false
): number {
  const data = planNode.data;
  const scanDiscountFactor = 0.2;
  const indexLookupFactor = 2;

  function getCardinality(planData: Operator): number {
    if (useEstimates) {
      return planData.estimatedCardinality;
    } else {
      return planData.exactCardinality;
    }
  }

  // Real two-way join
  let cost;
  if (Join.isJoin(data) && planNode.children.length === 2) {
    const leftInput = planNode.childAt(0).data;
    const rightInput = planNode.childAt(0).data;

    if (data.method === JoinMethod.HASH_JOIN) {
      cost = getCardinality(leftInput) + getCardinality(data);
    } else if (data.method === JoinMethod.INDEX_NESTED_LOOP_JOIN) {
      if (Select.isSelect(rightInput)) {
        console.warn('cmm_indexnl_right_select');
      }

      // multiplier should always be one?
      const multiplier =
        leftInput.exactCardinality > 0
          ? Math.max(getCardinality(data) / getCardinality(leftInput), 1)
          : 1;
      cost = getCardinality(leftInput) * multiplier * indexLookupFactor;

      // early return
      if (omitChildCosts) {
        return cost;
      } else {
        // only use cost of first input
        return cost + cmm(planNode.childAt(0), omitChildCosts, useEstimates);
      }
    } else if (
      data.method === JoinMethod.BLOCKWISE_NESTED_LOOP_JOIN ||
      data.method === JoinMethod.NESTED_LOOP_JOIN
    ) {
      cost = getCardinality(leftInput) * getCardinality(rightInput);
    } else {
      // assume linear time -> sum up input cardinalities
      cost = sum(planNode.children.map((c) => getCardinality(c.data)));
    }
  } else if (TableScan.isTableScan(data)) {
    cost = scanDiscountFactor * data.tableSize;
  } else {
    // assume linear time -> sum up input cardinalities
    cost = sum(planNode.children.map((c) => getCardinality(c.data)));
  }

  if (omitChildCosts) {
    return cost;
  }

  cost += sum(planNode.children.map((c) => cmm(c, omitChildCosts, useEstimates)));
  return cost;
}
