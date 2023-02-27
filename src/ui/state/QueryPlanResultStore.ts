import { Action, createHook, createStore } from 'react-sweet-state';
import { batchPlans } from './defaultPlans';
import { QP_GRAMMAR } from '../model/meta/QpGrammar';
import QueryPlanResult, { QueryPlanResultCollection } from '../model/meta/QueryPlanResult';
import { defaultDiffOptions, PlanNodeBrowserSerDes } from '../../semantic-diff';
import { Nullable } from '../../semantic-diff/Types';
import { ComparisonMetric } from '../model/meta/BenchmarkResult';
import { System } from '../model/meta/QueryPlanResult';
import computeSimilarity from '../util';
import { DagEdgeTreatment } from './Parameters';

export interface IQueryPlanResultsState {
  queryPlanResults: QueryPlanResultCollection;

  resultSelection: Nullable<QueryPlanResult>[];
}

const actions = {
  setQueryPlanResults:
    (text: string): Action<IQueryPlanResultsState> =>
    ({ setState, getState }) => {
      const queryPlanResults = new PlanNodeBrowserSerDes(
        QP_GRAMMAR,
        defaultDiffOptions
      ).queryPlanResultCollectionFromJson(text);

      computeSimilarity(queryPlanResults, DagEdgeTreatment.COPY_SUBTREE);

      // TODO verify that all system have all queries or handle this in planpicker
      setState({
        queryPlanResults: queryPlanResults,
        resultSelection: []
      });
    },

  setResultSelection:
    (selection: Nullable<QueryPlanResult>[]): Action<IQueryPlanResultsState> =>
    ({ setState, getState }) => {
      setState({
        resultSelection: selection
      });
    }
};

const Store = createStore<IQueryPlanResultsState, typeof actions>({
  initialState: {
    queryPlanResults: [],
    resultSelection: []
  },
  actions
});

export const useQueryPlanState = createHook(Store);

export const useAllLabels = createHook(Store, {
  selector: (state: IQueryPlanResultsState) => {
    return [
      ...new Set(state.queryPlanResults.map((qpr) => Object.keys(qpr.benchmarkResult)).flat())
    ] as ComparisonMetric[];
  }
});

export const useUniqueSystems = createHook(Store, {
  selector: (state: IQueryPlanResultsState): System[] => {
    const systemSet = new Set(state.queryPlanResults.map((qpr) => qpr.system));
    return Array.from(systemSet.entries()).map((val) => val[1]);
  }
});
