import React from 'react';
// @ts-ignore
import s from './QueryPlanDiff.module.scss';
import {duckPlan15, qpGrammar, umbraPlan15} from "../model/plans";

import {defaultDiffOptions, TNodeBrowserSerDes} from "../../semantic-diff";
import {PlanNode} from "../model/PlanData";
import GrammarBrowserSerDes from "../../semantic-diff/io/browser/GrammarBrowserSerDes";
import {MatchPipeline} from "../../semantic-diff/match/MatchPipeline";
import {Comparator} from "../../semantic-diff/compare/Comparator";
import ReactFlowGraphComponent from "./reactflow/ReactFlowGraphComponent";
import DagreD3DiffGraphComponent from "./dagre/DagreD3DiffGraphComponent";
import PlanNodeBrowserSerDes from "../../semantic-diff/io/browser/PlanNodeBrowserSerDes";
import QueryPlan from "../model/QueryPlan";
import SideBar from "./SideBar";
import {useGlobalState} from "../state/Store";

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
export default function QueryPlanDiff(props: IQueryPlanDiffProps) {

    return (
        <div className={s.queryPlanDiff}>
            <SideBar></SideBar>
            <ReactFlowGraphComponent/>
        </div>
    );
}

/**
 * What is this for? -> Wraps the component in an AppContextConsumer that injects the appContext (store root state)
 * and takes in a function to generate component props from store state.
 */
//export default withAppContext(connect((state: Store.RootState) => ({}))(QueryPlanDiff));
