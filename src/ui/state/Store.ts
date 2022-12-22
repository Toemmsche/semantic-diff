import {createStore, createHook, Action} from 'react-sweet-state';
import {Query} from "@testing-library/react";
import QueryPlan from "../model/QueryPlan";
import {Nullable} from "../../semantic-diff/Types";
import {duckPlan15, umbraPlan15} from "../model/plans";
import {queryPlanFromXml} from "../util";


export interface IGlobalState {
    firstPlanText: string,
    secondPlanText: string

    count: number
}

const actions = {
    increment:
        (by = 1): Action<IGlobalState> =>
            ({ setState, getState }) => {
                setState({
                    count: getState().count + by,
                });
            },
    setFirstPlan: (text: string): Action<IGlobalState> =>
        ({ setState, getState }) => {
            console.log("changing first plan to " + text)
            setState({
                firstPlanText: text
            });
        },
    setSecondPlan: (text: string): Action<IGlobalState> =>
        ({ setState, getState }) => {
            setState({
                firstPlanText: text
            });
        },
};
const Store = createStore<IGlobalState,typeof actions>({
    initialState: {
        firstPlanText: duckPlan15,
        secondPlanText: umbraPlan15,
        count: 0
    },
    actions
});

export const useGlobalState = createHook(Store);