import React from 'react';
import { DeltaGraphView } from './graph/DeltaGraphView';
import { defaultDiffOptions, PlanNodeBrowserSerDes } from '../../semantic-diff';
import { QP_GRAMMAR } from '../model/meta/QpGrammar';
import { Operator, PlanNode } from '../model/operator/Operator';
import { useQueryPlanState } from '../state/QueryPlanResultStore';
import {
  getMatchPipelineForAlgorithm,
  useDagEdgeTreatment,
  useMatchAlgorithm
} from '../state/ParameterStore';
import { Comparator } from '../../semantic-diff/compare/Comparator';
import DeltaGraphGenerator from '../../semantic-diff/delta/DeltaGraphGenerator';
import Origin from '../../semantic-diff/tree/Origin';
import UnionFind from '../../semantic-diff/lib/UnionFind';
import { ReactFlowProvider } from 'reactflow';
import { treatDagEdges } from '../util';

export default function QueryPlanDiff() {
  const [state] = useQueryPlanState();
  const [dagEdgeTreatment] = useDagEdgeTreatment();
  const [matchAlgorithm] = useMatchAlgorithm();

  let GraphView;
  if (state.resultSelection.length > 0) {
    const planSerdes = new PlanNodeBrowserSerDes(QP_GRAMMAR, defaultDiffOptions);
    let workingIndex = 0;
    const plans = state.resultSelection
      .map((qpr, i) => {
        // do not skip nulls with filter, we need the updated index
        if (!qpr) {
          return null;
        }
        const plan = planSerdes.transformParsedJsonObj(qpr.queryPlan, true);
        treatDagEdges(plan, dagEdgeTreatment);
        plan
          .toPreOrderUnique()
          .forEach((n) => (n.origin = new Origin(i, workingIndex, qpr.system)));
        // ensure working indices are adjacent
        workingIndex++;
        return plan;
      })
      // now filter nulls
      .filter((plan) => plan != null) as PlanNode[];

    const matchPipeline = getMatchPipelineForAlgorithm(matchAlgorithm);
    let unifiedTree;

    const unionFind = new UnionFind<PlanNode>();
    // set exclusive source index
    plans.forEach((firstPlan, i) => {
      plans.slice(i + 1).forEach((secondPlan) => {
        matchPipeline.execute(firstPlan, secondPlan, new Comparator(defaultDiffOptions));

        // save matches and continue
        [firstPlan, secondPlan].forEach((plan) => {
          plan
            .toPreOrderUnique()
            .filter((node) => node.isMatched())
            .forEach((node) => {
              unionFind.union(node, node.getSingleMatch());

              // and clear
              node.resetMatches();
            });
        });
      });
    });

    const rootMatchSets = new Map<PlanNode, Set<PlanNode>>();
    plans
      .flatMap((plan) => plan.toPreOrderUnique())
      .forEach((node) => {
        const root = unionFind.find(node);
        if (unionFind.size(root) > 1) {
          // node was matched
          if (!rootMatchSets.has(root)) {
            rootMatchSets.set(root, new Set());
          }
          rootMatchSets.get(root)!.add(node);
        }
      });

    rootMatchSets.forEach((matchSet) => {
      const matchArr = [...matchSet];
      matchArr.forEach((firstNode, i) => {
        matchArr.slice(i + 1).forEach((secondNode) => {
          // ensures complete matching
          firstNode.matchTo(secondNode);
        });
      });
    });

    unifiedTree = new DeltaGraphGenerator<Operator>().generate(plans);

    GraphView = <DeltaGraphView unifiedTree={unifiedTree} />;
  } else {
    GraphView = <></>;
  }

  return <ReactFlowProvider>{GraphView}</ReactFlowProvider>;
}
