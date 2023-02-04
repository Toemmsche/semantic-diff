import React from 'react';
import UnifiedTreeView from './view/UnifiedTreeView';
import { defaultDiffOptions, PlanNodeBrowserSerDes } from '../../semantic-diff';
import { QP_GRAMMAR } from '../model/meta/QpGrammar';
import UnifiedTreeGenerator from '../../semantic-diff/delta/UnifiedTreeGenerator';
import { PlanData } from '../model/operator/PlanData';
import { Stack } from '@mui/material';
import { useQueryPlanState } from '../state/QueryPlanResultStore';
import { MatchAlgorithm, useMatchAlgorithm, useRenderDagEdges } from '../state/ParameterStore';
import { MatchPipeline } from '../../semantic-diff/match/MatchPipeline';
import { Comparator } from '../../semantic-diff/compare/Comparator';
import FloatingBar from './menu/FloatingBar';
import { FixedMatcher } from '../../semantic-diff/match/FixedMatcher';
import { TempScan } from '../model/operator/TempScan';
import { EarlyProbe } from '../model/operator/EarlyProbe';

/**
 * Root Component for QueryPlan diff view
 */
export default function QueryPlanDiff() {
  const [state, actions] = useQueryPlanState();
  const [matchAlgorithm] = useMatchAlgorithm();
  const [renderDagEdges] = useRenderDagEdges();

  let GraphView;
  if (state.resultSelection) {
    const [firstPlanResult, secondPlanResult] = state.resultSelection;

    const planSerdes = new PlanNodeBrowserSerDes(QP_GRAMMAR, defaultDiffOptions);
    const firstPlan = planSerdes.parseFromString(firstPlanResult.queryPlanXml);
    const secondPlan = planSerdes.parseFromString(secondPlanResult.queryPlanXml);

    // We match in both cases
    let matchPipeline;
    switch (matchAlgorithm) {
      case MatchAlgorithm.NONE:
        // We cannot match literally nothing, that would break the layout algorithms
        matchPipeline = new MatchPipeline([new FixedMatcher()]);
        break;
      case MatchAlgorithm.TOP_DOWN:
        matchPipeline = MatchPipeline.topDownOnly(defaultDiffOptions);
        break;
      case MatchAlgorithm.BOTTOM_UP:
        matchPipeline = MatchPipeline.bottomUpOnly(defaultDiffOptions);
        break;
      case MatchAlgorithm.SIMPLE:
        matchPipeline = MatchPipeline.onlySimpleMatchers(defaultDiffOptions);
        break;
      case MatchAlgorithm.SEMANTIC_DIFF:
        matchPipeline = MatchPipeline.fromMode(defaultDiffOptions);
        break;
      default:
        throw new Error('Unknown matching algorithm ' + matchAlgorithm);
    }
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
      TempScan.handleTempScans(firstPlan);
      TempScan.handleTempScans(secondPlan);

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
      <FloatingBar></FloatingBar>
      {GraphView}
    </Stack>
  );
}
