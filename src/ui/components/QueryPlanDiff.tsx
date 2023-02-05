import React from 'react';
import UnifiedTreeView from './view/UnifiedTreeView';
import { defaultDiffOptions, PlanNodeBrowserSerDes } from '../../semantic-diff';
import { QP_GRAMMAR } from '../model/meta/QpGrammar';
import UnifiedTreeGenerator from '../../semantic-diff/delta/UnifiedTreeGenerator';
import { PlanData } from '../model/operator/PlanData';
import { Stack } from '@mui/material';
import { useQueryPlanState } from '../state/QueryPlanResultStore';
import {
  getMatchPipelineForAlgorithm,
  useMatchAlgorithm,
  useNwayDiff,
  useRenderDagEdges
} from '../state/ParameterStore';
import { Comparator } from '../../semantic-diff/compare/Comparator';
import FloatingMenu from './menu/FloatingMenu';
import { PipelineBreakerScan } from '../model/operator/PipelineBreakerScan';
import { EarlyProbe } from '../model/operator/EarlyProbe';
import NwayUnifiedGenerator from '../../semantic-diff/delta/NwayUnifiedGenerator';

/**
 * Root Component for QueryPlan diff view
 */
export default function QueryPlanDiff() {
  const [state, actions] = useQueryPlanState();
  const [nwayDiff] = useNwayDiff();
  const [renderDagEdges] = useRenderDagEdges();
  const [matchAlgorithm] = useMatchAlgorithm();

  let GraphView;
  if (state.resultSelection) {
    const planSerdes = new PlanNodeBrowserSerDes(QP_GRAMMAR, defaultDiffOptions);
    const matchPipeline = getMatchPipelineForAlgorithm(matchAlgorithm);
    let unifiedTree;
    if (nwayDiff) {
      const plans = state.resultSelection.map((qpr) => {
        const plan = planSerdes.parseFromString(qpr.queryPlanXml, true);
        plan.toPreOrderUnique().forEach((n) => (n.debugName = qpr.system));
        return plan;
      });

      // set exclusive source index
      plans.forEach((p, i) => p.toPreOrderUnique().forEach((n) => (n.indexSourceOrigin = i)));

      for (let i = 0; i < plans.length; i++) {
        const firstPlan = plans[i];
        for (let j = i + 1; j < plans.length; j++) {
          const secondPlan = plans[j];

          matchPipeline.execute(firstPlan, secondPlan, new Comparator(defaultDiffOptions));

          // copy and clear matches
          [firstPlan, secondPlan].forEach((p) => {
            // copy matches into set
            p.toPreOrderUnique().forEach((n) => {
              if (n.isMatched()) {
                n.NaddMatch(n.getMatch());
              }
            });

            // reset regular matches
            p.NclearRegularMatchesRec();
          });
        }
      }

      unifiedTree = new NwayUnifiedGenerator<PlanData>(defaultDiffOptions).generate(plans);
    } else {
      const [firstPlanResult, secondPlanResult] = state.resultSelection;

      const firstPlan = planSerdes.parseFromString(firstPlanResult.queryPlanXml);
      const secondPlan = planSerdes.parseFromString(secondPlanResult.queryPlanXml);

      matchPipeline.execute(firstPlan, secondPlan, new Comparator(defaultDiffOptions));

      // set diff metadata on plan
      for (const node of firstPlan.toPreOrderArray()) {
        node.data.diffState = node.getDiffState();
      }
      for (const node of secondPlan.toPreOrderArray()) {
        node.data.diffState = node.getDiffState();
      }

      if (renderDagEdges) {
        // TODO find a more generalizable and extendible way to handle these DAG edges
        PipelineBreakerScan.handlePipelineBreakerScans(firstPlan);
        PipelineBreakerScan.handlePipelineBreakerScans(secondPlan);

        EarlyProbe.handleEarlyProbes(firstPlan);
        EarlyProbe.handleEarlyProbes(secondPlan);
      }

      unifiedTree = new UnifiedTreeGenerator<PlanData>(defaultDiffOptions).generate(
        firstPlan,
        secondPlan
      );
    }

    GraphView = <UnifiedTreeView unifiedTree={unifiedTree} />;
  } else {
    GraphView = <></>;
  }

  return (
    <Stack direction="column" height="inherit" width="inherit">
      <FloatingMenu></FloatingMenu>
      {GraphView}
    </Stack>
  );
}
