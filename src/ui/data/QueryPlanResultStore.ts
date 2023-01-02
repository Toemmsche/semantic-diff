import {Action, createHook, createStore} from 'react-sweet-state';
import {batchPlans, qpGrammar} from "./plans";
import {QueryPlanResultCollection} from "./QueryPlanResult";
import {defaultDiffOptions, PlanNodeBrowserSerDes} from "../../semantic-diff";
import {PlanData} from "../model/PlanData";


export interface IQueryPlanResultsState{
    queryPlanResults: QueryPlanResultCollection,
    firstSelection: number,
    secondSelection: number,
}

const actions = {
    setQueryPlanResults: (text: string): Action<IQueryPlanResultsState> =>
        ({setState, getState}) => {
            const queryPlanResults = new PlanNodeBrowserSerDes(qpGrammar,
                                                               defaultDiffOptions).queryPlanResultCollectionFromJson(
                text);
            setState({
                         queryPlanResults: queryPlanResults
                     });
        },
    setSelection: (firstSelection: number,
                   secondSelection: number): Action<IQueryPlanResultsState> =>
        ({setState, getState}) => {
            setState({
                         firstSelection,
                         secondSelection
                     });
        }
};
const Store = createStore<IQueryPlanResultsState, typeof actions>(
    {
        initialState: {
            queryPlanResults: new PlanNodeBrowserSerDes(qpGrammar,
                                                        defaultDiffOptions).queryPlanResultCollectionFromJson(
                batchPlans),
            firstSelection: 36,
            secondSelection: 80,
        },
        actions
    });

export const useQueryPlanState = createHook(Store);
