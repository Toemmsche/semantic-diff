import QueryPlanResult from './model/meta/QueryPlanResult';
import { MatchPipeline } from '../semantic-diff/match/MatchPipeline';
import { defaultDiffOptions, PlanNodeBrowserSerDes } from '../semantic-diff/index';
import { QP_GRAMMAR } from './model/meta/QpGrammar';
import { Comparator } from '../semantic-diff/compare/Comparator';
import { DagEdgeTreatment } from './state/Parameters';
import { Operator, PlanNode } from './model/operator/Operator';
import { PipelineBreakerScan } from './model/operator/inner/PipelineBreakerScan';
import { sum } from 'd3';
import Join, { JoinMethod } from './model/operator/inner/Join';
import { Select } from './model/operator/inner/Select';
import { EditScriptGenerator } from '../semantic-diff/delta/EditScriptGenerator';
import { EarlyProbe } from './model/operator/inner/EarlyProbe';
import { TableScan } from './model/operator/leaf/TableScan';

// don't know where to place this
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

export default function computeSimilarity(
  queryPlanResults: QueryPlanResult[],
  dagEdgeTreatment: DagEdgeTreatment
): void {
  console.time('compute_sim');

  // compute similarities
  queryPlanResults
    .map((qpr) => qpr.query)
    .filter(unique)
    .forEach((query) => {
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

          const excessUpdates = plans[0].toPreOrderUnique().filter(
            (n) =>
              n.isMatched() && // filter update ops without cardinality change
              !n.contentEquals(n.getSingleMatch()) &&
              n.data.exactCardinality == n.getSingleMatch().data.exactCardinality
          ).length;
          const editScript = new EditScriptGenerator<Operator>(
            defaultDiffOptions
          ).generateEditScript(plans[0], plans[1]);
          const cost = editScript.getCost() - excessUpdates;
          const similarity = Math.min(
            1,
            Math.max(0, 1 - cost / (plans[0].size() + plans[1].size()))
          );

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

// small helper to eliminate duplicates from an array in an FP fashion
export function unique<T>(value: T, index: number, array: T[]) {
  return array.indexOf(value) === index;
}
