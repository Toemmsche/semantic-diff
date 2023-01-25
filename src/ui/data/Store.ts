import {Action, createHook, createStore} from 'react-sweet-state';

export enum DiffViewMode {
    TWO_WAY = 30, UNIFIED = 70,

}

export enum MatchAlgorithm {
    TOP_DOWN = 20, BOTTOM_UP = 40, SIMPLE = 60, SEMANTIC_DIFF = 80
}

export enum LayoutAlgorithm {
    DAGRE = 30,
    D3_HIERARCHY=50,
    ELK_JS=70
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
