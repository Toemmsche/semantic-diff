import React from 'react';
import { UnifiedTreeView } from './view/UnifiedTreeView';
import { defaultDiffOptions, PlanNodeBrowserSerDes } from '../../semantic-diff';
import { QP_GRAMMAR } from '../model/meta/QpGrammar';
import UnifiedTreeGenerator from '../../semantic-diff/delta/UnifiedTreeGenerator';
import { PlanData, PlanNode } from '../model/operator/PlanData';
import { Stack } from '@mui/material';
import { useQueryPlanState } from '../state/QueryPlanResultStore';
import {
  getMatchPipelineForAlgorithm,
  useMatchAlgorithm,
  useRenderDagEdges
} from '../state/ParameterStore';
import { Comparator } from '../../semantic-diff/compare/Comparator';
import FloatingMenu from './menu/FloatingMenu';
import { PipelineBreakerScan } from '../model/operator/PipelineBreakerScan';
import { EarlyProbe } from '../model/operator/EarlyProbe';
import NwayUnifiedGenerator from '../../semantic-diff/delta/NwayUnifiedGenerator';
import Origin from '../../semantic-diff/tree/Origin';
import UnionFind from '../../semantic-diff/lib/UnionFind';
import { hasDuplicates } from '../../semantic-diff/lib/ArrayUtil';
import { ReactFlowProvider } from 'reactflow';

/**
 * Root Component for QueryPlan diff view
 */
export default function QueryPlanDiff() {
  const [state] = useQueryPlanState();
  const [renderDagEdges] = useRenderDagEdges();
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
        console.log('plan', plan);
        if (renderDagEdges) {
          PipelineBreakerScan.handlePipelineBreakerScans(plan);
          EarlyProbe.handleEarlyProbes(plan);
        }
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
    if (plans.length === 1) {
      // SIMPLE VIEW
      unifiedTree = plans[0];
    } else if (plans.length === 2) {
      // TWO-WAY DIFF
      matchPipeline.execute(plans[0], plans[1], new Comparator(defaultDiffOptions));
      unifiedTree = new UnifiedTreeGenerator<PlanData>(defaultDiffOptions).generate(
        plans[0],
        plans[1]
      );
    } else {
      // N-WAY DIFF

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

        // if the set contains two nodes from the same tree, do not match at all
        if (hasDuplicates(matchArr.map((node) => node.sourceIndex))) {
          console.warn('match_set_same_tree');
          return;
        }

        if (matchArr.some((node) => matchSet))
          matchArr.forEach((firstNode, i) => {
            matchArr.slice(i + 1).forEach((secondNode) => {
              // ensures complete matching
              firstNode.matchTo(secondNode);
            });
          });
      });

      unifiedTree = new NwayUnifiedGenerator<PlanData>(defaultDiffOptions).generate(plans);
    }

    GraphView = <UnifiedTreeView unifiedTree={unifiedTree} />;
  } else {
    GraphView = <></>;
  }

  return (
    <Stack direction="column" height="inherit" width="inherit">
      <FloatingMenu></FloatingMenu>
      <ReactFlowProvider>{GraphView}</ReactFlowProvider>
    </Stack>
  );
}
