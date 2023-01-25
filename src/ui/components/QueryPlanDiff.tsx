import React from 'react';
// @ts-ignore
import s from './QueryPlanDiff.module.scss';
import TwoWayDiffView from "./view/diff/TwoWayDiffView";
import UnifiedTreeView from "./view/unified/UnifiedTreeView";
import {defaultDiffOptions, PlanNodeBrowserSerDes} from "../../semantic-diff";
import {qpGrammar} from "../data/plans";
import UnifiedTreeGenerator, {Origin} from "../../semantic-diff/delta/UnifiedTreeGenerator";
import {PlanData} from "../model/PlanData";
import {Stack} from "@mui/material";
import {useQueryPlanState} from "../data/QueryPlanResultStore";
import {DiffViewMode, MatchAlgorithm, useParameterState} from "../data/Store";
import {ReactFlowProvider} from "reactflow";
import {MatchPipeline} from "../../semantic-diff/match/MatchPipeline";
import {Comparator} from "../../semantic-diff/compare/Comparator";
import FloatingBar from "./FloatingBar";


/**
 * Root Component for QueryPlan diff view
 */
export default function QueryPlanDiff() {

    const [state, actions] = useQueryPlanState();
    const [parameters, parameterActions] = useParameterState();

    // TODO allow nullable
    let GraphView, ChartView;
    if (state.resultSelection) {
        const [firstPlanResult, secondPlanResult] = state.resultSelection

        const planSerdes = new PlanNodeBrowserSerDes(qpGrammar, defaultDiffOptions);
        const firstPlan = planSerdes.parseFromString(firstPlanResult.queryPlanXml);
        const secondPlan = planSerdes.parseFromString(secondPlanResult.queryPlanXml);

        // set metadata on plan
        for (const node of firstPlan.toPreOrderArray()) {
            node.data.origin = Origin.OLD;
        }
        for (const node of secondPlan.toPreOrderArray()) {
            node.data.origin = Origin.NEW;
        }


        // We match in both cases
        let matchPipeline;
        switch (parameters.matchAlgorithm) {
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
                throw new Error("Unknown matching algorithm " + parameters.matchAlgorithm);
        }
        matchPipeline.execute(firstPlan, secondPlan, new Comparator(defaultDiffOptions))

        // set diff metadata on plan
        for (const node of firstPlan.toPreOrderArray()) {
            node.data.diffState = node.getDiffState();
        }
        for (const node of secondPlan.toPreOrderArray()) {
            node.data.diffState = node.getDiffState();
        }


        if (parameters.viewMode === DiffViewMode.UNIFIED) {
            const unifiedTree = new UnifiedTreeGenerator<PlanData>(defaultDiffOptions).generate(firstPlan, secondPlan);

            // tag matched nodes
            unifiedTree.toPreOrderUnique()
                .filter(pn => pn.isMatched())
                .forEach(pn => pn.data.origin = Origin.SHARED);

            GraphView = <UnifiedTreeView
                unifiedTree={unifiedTree}/>
        } else {
            GraphView = <TwoWayDiffView firstPlan={firstPlan}
                                        secondPlan={secondPlan}/>
        }
    } else {
        GraphView = <></>;
    }

    return (<Stack direction="column"
                   height="inherit"
                   width="inherit">
        <FloatingBar></FloatingBar>
            {GraphView}
    </Stack>);
}

/**
 * What is this for? -> Wraps the component in an AppContextConsumer that
 * injects the appContext (store root state) and takes in a function to
 * generate component props from store state.
 */
//export default withAppContext(connect((state: Store.RootState) =>
// ({}))(QueryPlanDiff));
