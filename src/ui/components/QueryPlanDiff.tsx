import React from 'react';
// @ts-ignore
import s from './QueryPlanDiff.module.scss';
import ReactFlowGraphComponent from "./view/diff/ReactFlowGraphComponent";
import SideBar from "./SideBar";
import PlanMetadata from "./PlanMetadata";
import {useGlobalState} from "../data/Store";
import UnifiedTreeView from "./view/unified/UnifiedTreeView";
import {defaultDiffOptions, PlanNodeBrowserSerDes} from "../../semantic-diff";
import {qpGrammar} from "../data/plans";
import UnifiedTreeGenerator
    from "../../semantic-diff/delta/UnifiedTreeGenerator";
import {PlanData} from "../model/PlanData";

interface IQueryPlanDiffProps {
    /**
     * For Future:
     * AppContext to be able to execute fetching of analyzed plan
     */
    //appContext: IAppContext;

    /** The backend used to render the graphs */
}

interface IQueryPlanDiffState {
}

/**
 * Root Component for QueryPlan diff view
 */
export default function QueryPlanDiff (props: IQueryPlanDiffProps) {

    const [state, actions] = useGlobalState();
    const firstPlanResult = state.queryPlanResults[state.firstSelection];
    const secondPlanResult = state.queryPlanResults[state.secondSelection];

    const planSerdes = new PlanNodeBrowserSerDes(qpGrammar, defaultDiffOptions);
    const firstPlan = planSerdes.parseFromString(firstPlanResult.queryPlanXml);
    const secondPlan = planSerdes.parseFromString(secondPlanResult.queryPlanXml);

    return (
        <div className={s.queryPlanDiff}>
            <SideBar/>
            <PlanMetadata planResult={firstPlanResult}
                          first={true}/>
            <PlanMetadata planResult={secondPlanResult}
                          first={false}/>
            {
                state.showUnified
                    ? <UnifiedTreeView
                        unifiedTree={new UnifiedTreeGenerator<PlanData>(
                            defaultDiffOptions).generate(
                            firstPlan,
                            secondPlan)}/>
                    : <ReactFlowGraphComponent/>
            }
        </div>
    );
}

/**
 * What is this for? -> Wraps the component in an AppContextConsumer that injects the appContext (store root state)
 * and takes in a function to generate component props from store state.
 */
//export default withAppContext(connect((state: Store.RootState) => ({}))(QueryPlanDiff));
