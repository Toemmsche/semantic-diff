import { Action, createHook, createStore } from 'react-sweet-state';

export enum MatchAlgorithm {
  NONE,
  TOP_DOWN,
  BOTTOM_UP,
  SIMPLE,
  SEMANTIC_DIFF
}

export enum LayoutAlgorithm {
  DAGRE,
  D3_HIERARCHY,
  ELK_JS_LAYERED,
  ELK_JS_MRTREE
}

export enum EdgeType {
  BEZIER,
  STRAIGHT,
  SMOOTH_STEP,
  SIMPLE_BEZIER
}

export interface IParameterState {
  collapsible: boolean;
  renderDagEdges: boolean;
  matchAlgorithm: MatchAlgorithm;
  layoutAlgorithm: LayoutAlgorithm;
  edgeType: EdgeType;
}

export const helpers = {
  isRenderDagEdgesPossible(state: IParameterState, renderDagEdges: boolean) {
    if (renderDagEdges) {
      return (
        state.layoutAlgorithm !== LayoutAlgorithm.D3_HIERARCHY &&
        state.layoutAlgorithm !== LayoutAlgorithm.ELK_JS_MRTREE
      );
    }
    return true;
  },
  isMatchAlgorithmPossible(state: IParameterState, matchAlgorithm: MatchAlgorithm) {
    if (
      state.layoutAlgorithm === LayoutAlgorithm.D3_HIERARCHY ||
      state.layoutAlgorithm === LayoutAlgorithm.ELK_JS_MRTREE
    ) {
      return matchAlgorithm < MatchAlgorithm.BOTTOM_UP;
    }
    return true;
  },
  isLayoutAlgorithmPossible(state: IParameterState, layoutAlgorithm: LayoutAlgorithm) {
    if (
      layoutAlgorithm === LayoutAlgorithm.D3_HIERARCHY ||
      layoutAlgorithm === LayoutAlgorithm.ELK_JS_MRTREE
    ) {
      return !state.renderDagEdges && state.matchAlgorithm < MatchAlgorithm.BOTTOM_UP;
    }
    return true;
  }
};

const actions = {
  setCollapsible:
    (collapsible: boolean): Action<IParameterState> =>
    ({ setState, getState }) => {
      setState({
        collapsible
      });
    },
  setRenderDagEdges:
    (renderDagEdges: boolean): Action<IParameterState> =>
    ({ setState, getState }) => {
      if (!helpers.isRenderDagEdgesPossible(getState(), renderDagEdges)) {
        throw new Error('Illegal state transition');
      }
      setState({
        renderDagEdges
      });
    },
  setMatchAlgorithm:
    (matchAlgorithm: MatchAlgorithm): Action<IParameterState> =>
    ({ setState, getState }) => {
      if (!helpers.isMatchAlgorithmPossible(getState(), matchAlgorithm)) {
        throw new Error('Illegal state transition');
      }
      setState({
        matchAlgorithm
      });
    },
  setLayoutAlgorithm:
    (layoutAlgorithm: LayoutAlgorithm): Action<IParameterState> =>
    ({ setState, getState }) => {
      if (!helpers.isLayoutAlgorithmPossible(getState(), layoutAlgorithm)) {
        throw new Error('Illegal state transition');
      }
      setState({
        layoutAlgorithm
      });
    },
  setEdgeType:
    (edgeType: EdgeType): Action<IParameterState> =>
    ({ setState, getState }) => {
      setState({
        edgeType
      });
    }
};
const ParameterStore = createStore<IParameterState, typeof actions>({
  initialState: {
    collapsible: false,
    renderDagEdges: false,
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
export const useRenderDagEdges = createHook(ParameterStore, {
  selector: (state: IParameterState) => state.renderDagEdges
});

export const useCouldIncludeDagEdges = createHook(ParameterStore, {
  selector: (state: IParameterState) =>
    state.renderDagEdges || state.matchAlgorithm >= MatchAlgorithm.BOTTOM_UP
});
