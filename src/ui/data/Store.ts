import {Action, createHook, createStore} from 'react-sweet-state';
import {duckPlan15, umbraPlan15} from "./plans";


export interface IGlobalState {
    firstPlanText: string,
    secondPlanText: string,
    showMatches: boolean,
    showUnified: boolean

}

const actions = {
    setPlans: (firstPlanText: string, secondPlanText: string): Action<IGlobalState> =>
        ({setState, getState}) => {
            setState({firstPlanText: firstPlanText,
                         secondPlanText: secondPlanText
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
        }
};
const Store = createStore<IGlobalState, typeof actions>(
    {
        initialState: {
            firstPlanText: duckPlan15,
            secondPlanText: umbraPlan15,
            showMatches: false,
            showUnified: false
        },
        actions
    });

export const useGlobalState = createHook(Store);