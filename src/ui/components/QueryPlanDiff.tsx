import React from 'react';
import UnifiedTreeView from './view/UnifiedTreeView';
import { defaultDiffOptions, PlanNodeBrowserSerDes } from '../../semantic-diff';
import { QP_GRAMMAR } from '../model/meta/QpGrammar';
import UnifiedTreeGenerator from '../../semantic-diff/delta/UnifiedTreeGenerator';
import { PlanData } from '../model/operator/PlanData';
import { Stack } from '@mui/material';
import { useQueryPlanState } from '../state/QueryPlanResultStore';
import {MatchAlgorithm, useMatchAlgorithm, useMatchPipeline, useRenderDagEdges} from '../state/ParameterStore';
import { MatchPipeline } from '../../semantic-diff/match/MatchPipeline';
import { Comparator } from '../../semantic-diff/compare/Comparator';
import FloatingMenu from './menu/FloatingMenu';
import { FixedMatcher } from '../../semantic-diff/match/FixedMatcher';
import { PipelineBreakerScan } from '../model/operator/PipelineBreakerScan';
import { EarlyProbe } from '../model/operator/EarlyProbe';

/**
 * Root Component for QueryPlan diff view
 */
export default function QueryPlanDiff() {
  const [state, actions] = useQueryPlanState();
  const [matchPipeline] = useMatchPipeline();
  const [renderDagEdges] = useRenderDagEdges();

  let GraphView;
  if (state.resultSelection) {
    const [firstPlanResult, secondPlanResult] = state.resultSelection;

    const planSerdes = new PlanNodeBrowserSerDes(QP_GRAMMAR, defaultDiffOptions);
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

    const unifiedTree = new UnifiedTreeGenerator<PlanData>(defaultDiffOptions).generate(
      firstPlan,
      secondPlan
    );

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
