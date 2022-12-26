import React from 'react';
// @ts-ignore
import s from './QueryPlanDiff.module.scss';
import ReactFlowGraphComponent from "./reactflow/ReactFlowGraphComponent";
import SideBar from "./SideBar";

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
