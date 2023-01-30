import {Action, createHook, createStore} from 'react-sweet-state';

export enum DiffViewMode {
    TWO_WAY, UNIFIED,

}

export enum MatchAlgorithm {
    TOP_DOWN, BOTTOM_UP, SIMPLE, SEMANTIC_DIFF
}

export enum LayoutAlgorithm {
    DAGRE, D3_HIERARCHY, ELK_JS
}

export enum EdgeType {
    BEZIER, STRAIGHT, SMOOTH_STEP, SIMPLE_BEZIER
}


export interface IParameterState {
    showMatches: boolean;
    collapsible: boolean;
    viewMode: DiffViewMode;
    matchAlgorithm: MatchAlgorithm;
    layoutAlgorithm: LayoutAlgorithm;

    edgeType: EdgeType;
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
    setcollapsible: (collapsible: boolean): Action<IParameterState> => ({
                                                                            setState,
                                                                            getState
                                                                        }) => {
        setState({
            collapsible
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
    },
    setEdgeType: (edgeType: EdgeType): Action<IParameterState> => ({
                                                                       setState,
                                                                       getState
                                                                   }) => {
        setState({
            edgeType
        });
    }
};
const Store = createStore<IParameterState, typeof actions>({
    initialState: {
        showMatches: true,
        collapsible: false,
        viewMode: DiffViewMode.UNIFIED,
        matchAlgorithm: MatchAlgorithm.TOP_DOWN,
        layoutAlgorithm: LayoutAlgorithm.DAGRE,
        edgeType: EdgeType.BEZIER
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
