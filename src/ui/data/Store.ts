import {Action, createHook, createStore} from 'react-sweet-state';
import {batchPlans, qpGrammar} from "./plans";
import {QueryPlanResultCollection} from "./QueryPlanResult";
import {defaultDiffOptions, PlanNodeBrowserSerDes} from "../../semantic-diff";


export interface IGlobalState {
    queryPlanResults: QueryPlanResultCollection,
    firstSelection: number,
    secondSelection: number,
    showMatches: boolean,
    showUnified: boolean,

    hideNodes: boolean,

}

const actions = {
    setQueryPlanResults: (text: string): Action<IGlobalState> =>
        ({setState, getState}) => {
            const queryPlanResults = new PlanNodeBrowserSerDes(qpGrammar,
                                                               defaultDiffOptions).queryPlanResultCollectionFromJson(
                text);
            setState({
                         queryPlanResults: queryPlanResults
                     });
        },
    setSelection: (firstSelection: number,
                   secondSelection: number): Action<IGlobalState> =>
        ({setState, getState}) => {
            setState({
                         firstSelection,
                         secondSelection
                     });
        },
    setShowMatches: (showMatches: boolean): Action<IGlobalState> =>
        ({setState, getState}) => {
            setState({
                         showMatches: showMatches
                     });
        },
    setShowUnified: (showUnified: boolean): Action<IGlobalState> =>
        ({setState, getState}) => {
            setState({
                         showUnified: showUnified
                     });
        },
    setHideNodes: (hideNodes: boolean): Action<IGlobalState> =>
        ({setState, getState}) => {
            setState({
                         hideNodes: hideNodes
                     });
        }
};
const Store = createStore<IGlobalState, typeof actions>(
    {
        initialState: {
            queryPlanResults: new PlanNodeBrowserSerDes(qpGrammar,
                                                        defaultDiffOptions).queryPlanResultCollectionFromJson(
                batchPlans),
            firstSelection: 36,
            secondSelection: 80,
            showMatches: false,
            showUnified: false,
            hideNodes: false
        },
        actions
    });

export const useGlobalState = createHook(Store);