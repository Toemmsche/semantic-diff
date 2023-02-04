import {Action, createHook, createStore} from 'react-sweet-state';

export enum MatchAlgorithm {
    NONE, TOP_DOWN, BOTTOM_UP, SIMPLE, SEMANTIC_DIFF
}

export enum LayoutAlgorithm {
    DAGRE, D3_HIERARCHY, ELK_JS
}

export enum EdgeType {
    BEZIER, STRAIGHT, SMOOTH_STEP, SIMPLE_BEZIER
}


export interface IParameterState {
    collapsible: boolean;
    matchAlgorithm: MatchAlgorithm;
    layoutAlgorithm: LayoutAlgorithm;
    edgeType: EdgeType;
}

const actions = {
    setCollapsible: (collapsible: boolean): Action<IParameterState> => ({
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
const ParameterStore = createStore<IParameterState, typeof actions>({
    initialState: {
        collapsible: false,
        matchAlgorithm: MatchAlgorithm.NONE,
        layoutAlgorithm: LayoutAlgorithm.DAGRE,
        edgeType: EdgeType.BEZIER
    },
    actions
});

export const useParameterState = createHook(ParameterStore);

export const useMatchAlgorithm = createHook(ParameterStore, {
    selector: (state: IParameterState) => state.matchAlgorithm
});
