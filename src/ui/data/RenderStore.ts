import {Action, createHook, createStore} from 'react-sweet-state';
import {PlanData} from "../model/PlanData";


export interface IRenderState {
    hoveredData: PlanData[],
}

const RenderActions = {
    setHoveredData: (hoveredData: PlanData[]): Action<IRenderState> =>
        ({setState, getState}) => {
            setState({
                         hoveredData: hoveredData
                     });
        },
};
const RenderStore = createStore<IRenderState, typeof RenderActions>(
    {
        initialState: {
            hoveredData: []
        },
        actions: RenderActions
    });

export const useRenderState = createHook(RenderStore);
