import QueryPlanResult from '../model/meta/QueryPlanResult';
import { MatchPipeline } from '../../semantic-diff/match/MatchPipeline';
import { defaultDiffOptions, PlanNodeBrowserSerDes } from '../../semantic-diff/index';
import { QP_GRAMMAR } from '../model/meta/QpGrammar';
import { Comparator } from '../../semantic-diff/compare/Comparator';
import { DagEdgeTreatment } from './Parameters';
import { PlanNode } from '../model/operator/PlanData';
import { PipelineBreakerScan } from '../model/operator/inner/PipelineBreakerScan';
import { EarlyProbe } from '../model/operator/inner/EarlyProbe';
import { sum } from 'd3';
import Join, { JoinMethod } from '../model/operator/inner/Join';
import { Select } from '../model/operator/inner/Select';

// dunno where to place this
export function treatDagEdges(plan: PlanNode, dagEdgeTreatment: DagEdgeTreatment) {
  if (dagEdgeTreatment > DagEdgeTreatment.IGNORE) {
    PipelineBreakerScan.handlePipelineBreakerScans(
      plan,
      dagEdgeTreatment === DagEdgeTreatment.COPY_SUBTREE
    );
    EarlyProbe.handleEarlyProbes(plan);
  }
}

export default function computeSimilarity(
  queryPlanResults: QueryPlanResult[],
  dagEdgeTreatment: DagEdgeTreatment
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
            weightMap.set(n, Math.log2(avgCmm + 2));

            if (n.isLeaf()) {
              similarityMap.set(n, matchSimValue);
              return;
            }

            // Compute similarity of children
            const innerChildrenSims = n.children.map((c) => similarityMap.get(c)!);

            const childSims = sum(innerChildrenSims) / n.children.length;
            similarityMap.set(n, (childSims + matchSimValue) / 2);
          });
        });

        const values: number[] = [];
        const weights: number[] = [];

        similarityMap.forEach((v, n) => {
          values.push(v);
          weights.push(weightMap.get(n)!);
        });

        let similarity = new Comparator(defaultDiffOptions).weightedAverage(values, weights, 1);
        first.similarity.set(second, similarity);
        second.similarity.set(first, similarity);
      });
    });
  });

  console.timeEnd('compute_sim');
}

export function cmm(planNode: PlanNode): number {
  const data = planNode.data;
  const scanDiscountFactor = 0.2;
  const indexLookupFactor = 2;

  // Real two-way join
  if (Join.isJoin(data) && planNode.children.length === 2) {
    const leftInput = planNode.childAt(0).data;
    const rightInput = planNode.childAt(0).data;

    if (data.method === JoinMethod.HASH_JOIN) {
      return leftInput.exactCardinality + rightInput.exactCardinality;
    } else if (data.method === JoinMethod.INDEX_NESTED_LOOP_JOIN) {
      if (planNode.childAt(0).data instanceof Select) {
        console.warn('select right of index nl');
      }
      // multiplier should always be one?
      const multiplier =
        leftInput.exactCardinality > 0
          ? Math.max(data.exactCardinality / leftInput.exactCardinality, 1)
          : 1;
      return leftInput.exactCardinality * multiplier * indexLookupFactor;
    } else if (
      data.method === JoinMethod.BLOCKWISE_NESTED_LOOP_JOIN ||
      data.method === JoinMethod.NESTED_LOOP_JOIN
    ) {
      return leftInput.exactCardinality * rightInput.exactCardinality;
    }
  }

  // assume linear time -> sum up input cardinalities
  return sum(planNode.children.map((c) => c.data.exactCardinality));
}
