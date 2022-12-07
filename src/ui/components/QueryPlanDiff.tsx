import React from 'react';
// @ts-ignore
import s from './QueryPlanDiff.module.scss';
import DagreD3DiffGraphComponent from "./render/DagreD3DiffGraphComponent";
import {duckPlanJson, pgPlanJson, qpGrammar} from "./model/plans";

import {defaultDiffOptions, TNodeJsonSerDes, TNode, Grammar} from "../../semantic-diff";
import {PlanData, tNodeToPlanNode} from "./model/PlanNode";
import GrammarXmlDomSerDes from "../../semantic-diff/io/node/GrammarXmlDomSerDes";
import GrammarBrowserSerDes from "../../semantic-diff/io/browser/GrammarBrowserSerDes";

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
    const serdes = new TNodeJsonSerDes(gramamr, defaultDiffOptions);
    const firstRoot : TNode<PlanData> = tNodeToPlanNode(serdes.parseFromString(duckPlanJson));
    const secondRoot : TNode<PlanData> = tNodeToPlanNode(serdes.parseFromString(pgPlanJson));

    console.log(firstRoot);
    console.log(secondRoot);
    return (
        <div className={s.queryPlanDiff}>
            <div className={s.firstGraph}>
                <DagreD3DiffGraphComponent
                    rootElement={firstRoot}
                />
            </div>
            <div className={s.secondGraph}>
                <DagreD3DiffGraphComponent
                    rootElement={secondRoot}
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
