import React from 'react';
// @ts-ignore
import s from './QueryPlanDiff.module.scss';
import {duckPlan15, pgPlan15, qpGrammar} from "./model/plans";

import {defaultDiffOptions, TNodeBrowserSerDes} from "../../semantic-diff";
import {PlanNode, tNodeToPlanNode} from "./model/PlanData";
import GrammarBrowserSerDes from "../../semantic-diff/io/browser/GrammarBrowserSerDes";
import {MatchPipeline} from "../../semantic-diff/match/MatchPipeline";
import {Comparator} from "../../semantic-diff/compare/Comparator";
import ReactFlowGraphComponent from "./render/ReactFlowGraphComponent";
import DagreD3DiffGraphComponent from "./render/dagre/DagreD3DiffGraphComponent";

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
    const gramamr = new GrammarBrowserSerDes(defaultDiffOptions).parseFromString(qpGrammar);
    const serdes = new TNodeBrowserSerDes(gramamr, defaultDiffOptions);
    const firstPlan : PlanNode = tNodeToPlanNode(serdes.parseFromString(duckPlan15));
    const secondPlan : PlanNode = tNodeToPlanNode(serdes.parseFromString(pgPlan15));

    const matchPipeline = MatchPipeline.fromMode(defaultDiffOptions); // TODO with options
    matchPipeline.execute(firstPlan, secondPlan, new Comparator(defaultDiffOptions)); // TODO maybe move

    return (
        <div className={s.queryPlanDiff}>
            <div className={s.graph}>
                <ReactFlowGraphComponent
                    firstPlan={firstPlan}
                    secondPlan={secondPlan}
                />
            </div>
        </div>
    );
}

/**
 * What is this for? -> Wraps the component in an AppContextConsumer that injects the appContext (store root state)
 * and takes in a function to generate component props from store state.
 */
//export default withAppContext(connect((state: Store.RootState) => ({}))(QueryPlanDiff));
