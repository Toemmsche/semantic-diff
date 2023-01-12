import {Action, createHook, createStore} from 'react-sweet-state';


export interface IParameterState {
    showMatches: boolean,
    showUnified: boolean,
    hideNodes: boolean,
    topDownOnly: boolean
}

const actions = {
    setShowMatches: (showMatches: boolean): Action<IParameterState> => ({
        setState,
        getState
    }) => {
        setState({
            showMatches: showMatches
        });
    },
    setShowUnified: (showUnified: boolean): Action<IParameterState> => ({
        setState,
        getState
    }) => {
        setState({
            showUnified: showUnified
        });
    },
    setHideNodes: (hideNodes: boolean): Action<IParameterState> => ({
        setState,
        getState
    }) => {
        setState({
            hideNodes: hideNodes
        });
    },
    setTopDownOnly: (topDownOnly: boolean): Action<IParameterState> => ({
        setState,
        getState
    }) => {
        setState({
            topDownOnly: topDownOnly
        });
    }
};
const Store = createStore<IParameterState, typeof actions>({
    initialState: {
        topDownOnly: false,
        showMatches: true,
        showUnified: false,
        hideNodes: false
    },
    actions
});

export const useParameterState = createHook(Store);
