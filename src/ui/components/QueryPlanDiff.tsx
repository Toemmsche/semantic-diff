import React from 'react';
// @ts-ignore
import s from './QueryPlanDiff.module.scss';
import TwoWayDiffView from "./view/diff/TwoWayDiffView";
import UnifiedTreeView from "./view/unified/UnifiedTreeView";
import {defaultDiffOptions, PlanNodeBrowserSerDes} from "../../semantic-diff";
import {qpGrammar} from "../data/plans";
import UnifiedTreeGenerator
    from "../../semantic-diff/delta/UnifiedTreeGenerator";
import {PlanData} from "../model/PlanData";
import PlanPicker from "./PlanPicker";
import {Stack} from "@mui/material";
import {useQueryPlanState} from "../data/QueryPlanResultStore";
import {useParameterState} from "../data/Store";
import {ReactFlowProvider} from "reactflow";
import QueryPlanDiffChart from "./QueryPlanDiffChart";


/**
 * Root Component for QueryPlan diff view
 */
export default function QueryPlanDiff () {

    const [state, actions] = useQueryPlanState();
    const [parameters, parameterActions] = useParameterState();

    // TODO allow nullable
    let GraphView, ChartView;
    if (state.resultSelection) {
        const [firstPlanResult, secondPlanResult] = state.resultSelection

        const planSerdes = new PlanNodeBrowserSerDes(qpGrammar,
                                                     defaultDiffOptions);
        const firstPlan = planSerdes.parseFromString(firstPlanResult.queryPlanXml);
        const secondPlan = planSerdes.parseFromString(secondPlanResult.queryPlanXml);

        GraphView = <ReactFlowProvider>
            {
                parameters.showUnified
                    ? <UnifiedTreeView
                        unifiedTree={new UnifiedTreeGenerator<PlanData>(
                            defaultDiffOptions).generate(
                            firstPlan,
                            secondPlan)}
                        hideNodes={parameters.hideNodes}/>
                    : <TwoWayDiffView firstPlan={firstPlan}
                                      secondPlan={secondPlan}
                                      showMatches={parameters.showMatches}/>
            }
        </ReactFlowProvider>

        ChartView = <QueryPlanDiffChart firstPlanResult={firstPlanResult}
                                        secondPlanResult={secondPlanResult}></QueryPlanDiffChart>
    } else {
        GraphView = <span>Please select</span>;
        ChartView = <span>Please select</span>;
    }

    return (

        <Stack direction="column"
               height="inherit"
               width="inherit">
            <PlanPicker></PlanPicker>
            {ChartView}
            {GraphView}
        </Stack>
    );
}

/**
 * What is this for? -> Wraps the component in an AppContextConsumer that injects the appContext (store root state)
 * and takes in a function to generate component props from store state.
 */
//export default withAppContext(connect((state: Store.RootState) => ({}))(QueryPlanDiff));
