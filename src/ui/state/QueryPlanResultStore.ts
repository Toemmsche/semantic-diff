import { Action, createHook, createStore } from 'react-sweet-state';
import { batchPlans } from './defaultPlans';
import { QP_GRAMMAR } from '../model/meta/QpGrammar';
import QueryPlanResult, { QueryPlanResultCollection } from './QueryPlanResult';
import { defaultDiffOptions, PlanNodeBrowserSerDes } from '../../semantic-diff';
import { Nullable } from '../../semantic-diff/Types';
import { ComparisonMetric } from './BenchmarkResult';

export interface IQueryPlanResultsState {
  queryPlanResults: QueryPlanResultCollection;

  resultSelection: Nullable<[QueryPlanResult, QueryPlanResult]>;
}

const actions = {
  setQueryPlanResults:
    (text: string): Action<IQueryPlanResultsState> =>
    ({ setState, getState }) => {
      const queryPlanResults = new PlanNodeBrowserSerDes(
        QP_GRAMMAR,
        defaultDiffOptions
      ).queryPlanResultCollectionFromJson(text);

      // TODO verify that all dbms have all queries or handle this in planpicker
      setState({
        queryPlanResults: queryPlanResults,
        resultSelection: null
      });
    },

  setResultSelection:
    (selection: Nullable<[QueryPlanResult, QueryPlanResult]>): Action<IQueryPlanResultsState> =>
    ({ setState, getState }) => {
      setState({
        resultSelection: selection
      });
    }
};
const Store = createStore<IQueryPlanResultsState, typeof actions>({
  initialState: {
    queryPlanResults: new PlanNodeBrowserSerDes(
      QP_GRAMMAR,
      defaultDiffOptions
    ).queryPlanResultCollectionFromJson(batchPlans),
    resultSelection: null
  },
  actions
});

export const useQueryPlanState = createHook(Store);

export const useAllLabels = createHook(Store, {
  selector: (state: IQueryPlanResultsState) => {
    return Object.keys(state.queryPlanResults[0].benchmarkResult)
      .filter((l) => l !== 'error' && l !== 'result')
      .map((metric) => metric as ComparisonMetric);
  }
});

export const useUniqueDbms = createHook(Store, {
  selector: (state: IQueryPlanResultsState) => {
    const dbmsSet = new Set(state.queryPlanResults.map((qpr) => qpr.dbms));
    const uniqueDbmsArr = Array.from(dbmsSet.entries()).map((val) => val[1]);
    return uniqueDbmsArr;
  }
});
