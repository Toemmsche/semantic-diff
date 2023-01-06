import {Action, createHook, createStore} from 'react-sweet-state';
import {batchPlans, qpGrammar} from "./plans";
import QueryPlanResult, {QueryPlanResultCollection} from "./QueryPlanResult";
import {defaultDiffOptions, PlanNodeBrowserSerDes} from "../../semantic-diff";
import {Nullable} from "../../semantic-diff/Types";


export interface IQueryPlanResultsState {
    queryPlanResults: QueryPlanResultCollection,

    resultSelection: Nullable<[QueryPlanResult, QueryPlanResult]>
}

const actions = {
    setQueryPlanResults: (text: string): Action<IQueryPlanResultsState> =>
        ({setState, getState}) => {
            const queryPlanResults = new PlanNodeBrowserSerDes(qpGrammar,
                                                               defaultDiffOptions).queryPlanResultCollectionFromJson(
                text);

            // TODO verify that all dbms have all queries

            setState({
                         queryPlanResults: queryPlanResults,
                         resultSelection: null
                     });
        },

    setResultSelection: (firstPlanResult: QueryPlanResult,
                         secondPlanResult: QueryPlanResult): Action<IQueryPlanResultsState> =>
        ({setState, getState}) => {
            setState({
                         resultSelection: [firstPlanResult, secondPlanResult]
                     });
        },

};
const Store = createStore<IQueryPlanResultsState, typeof actions>(
    {
        initialState: {
            queryPlanResults: new PlanNodeBrowserSerDes(qpGrammar,
                                                        defaultDiffOptions).queryPlanResultCollectionFromJson(
                batchPlans),
            resultSelection: null
        },
        actions
    });

export const useQueryPlanState = createHook(Store);

export const useAllLabels = createHook(Store, {
    selector: (state: IQueryPlanResultsState) => {
        return Object.keys(state.queryPlanResults[0].benchmarkResult)
                     .filter(l => l !== "error" && l !== "result")
    }
});

export const useUniqueDbms = createHook(Store, {
    selector: (state: IQueryPlanResultsState) => {
        const dbmsSet = new Set(state.queryPlanResults.map(qpr => qpr.dbms))
        const uniqueDbmsArr = Array.from(dbmsSet.entries()).map(val => val[1]);
        return uniqueDbmsArr;
    }
})
