import {Action, createHook, createStore} from 'react-sweet-state';
import {IQueryPlanResultsState} from "./QueryPlanResultStore";

export enum DiffViewMode {
    TWO_WAY, UNIFIED,

}

export enum MatchAlgorithm {
    TOP_DOWN, BOTTOM_UP, SIMPLE, SEMANTIC_DIFF
}

export enum LayoutAlgorithm {
    DAGRE, D3_HIERARCHY, ELK_JS
}

export interface IParameterState {
    showMatches: boolean;
    hideNodes: boolean;
    viewMode: DiffViewMode;
    matchAlgorithm: MatchAlgorithm;
    layoutAlgorithm: LayoutAlgorithm;
}

const actions = {
    setShowMatches: (showMatches: boolean): Action<IParameterState> => ({
                                                                            setState,
                                                                            getState
                                                                        }) => {
        setState({
            showMatches
        });
    },
    setViewMode: (viewMode: DiffViewMode): Action<IParameterState> => ({
                                                                           setState,
                                                                           getState
                                                                       }) => {
        setState({
            viewMode
        });
    },
    setHideNodes: (hideNodes: boolean): Action<IParameterState> => ({
                                                                        setState,
                                                                        getState
                                                                    }) => {
        setState({
            hideNodes
        });
    },
    setMatchAlgorithm: (matchAlgorithm: MatchAlgorithm): Action<IParameterState> => ({
                                                                                         setState,
                                                                                         getState
                                                                                     }) => {
        console.log("changed match", matchAlgorithm)
        setState({
            matchAlgorithm
        });
    },
    setLayoutAlgorithm: (layoutAlgorithm: LayoutAlgorithm): Action<IParameterState> => ({
                                                                                            setState,
                                                                                            getState
                                                                                        }) => {
        setState({
            layoutAlgorithm
        });
    }
};
const Store = createStore<IParameterState, typeof actions>({
    initialState: {
        showMatches: true,
        hideNodes: false,
        viewMode: DiffViewMode.UNIFIED,
        matchAlgorithm: MatchAlgorithm.TOP_DOWN,
        layoutAlgorithm: LayoutAlgorithm.DAGRE
    },
    actions
});

export const useParameterState = createHook(Store);

export const useDiffViewMode = createHook(Store, {
    selector: (state: IParameterState) => state.viewMode
});
export const useMatchAlgorithm = createHook(Store, {
    selector: (state: IParameterState) => state.matchAlgorithm
});
