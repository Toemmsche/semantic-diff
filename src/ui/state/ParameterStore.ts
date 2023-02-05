import { Action, createHook, createStore } from 'react-sweet-state';
import DagreLayouter from '../components/view/layout/DagreLayouter';
import D3HierarchyLayouter from '../components/view/layout/D3HierarchyLayouter';
import ElkJsLayouter from '../components/view/layout/ElkJsLayouter';
import { MatchPipeline } from '../../semantic-diff/match/MatchPipeline';
import { FixedMatcher } from '../../semantic-diff/match/FixedMatcher';
import { defaultDiffOptions } from '../../semantic-diff/index';
import { PlanData } from '../model/operator/PlanData';
import IAsyncLayouter from '../components/view/layout/IAsyncLayouter';
import IBlockingLayouter from '../components/view/layout/IBlockingLayouter';

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
  SMOOTH_STEP
}

export interface IParameterState {
  collapsible: boolean;
  renderDagEdges: boolean;
  matchAlgorithm: MatchAlgorithm;
  layoutAlgorithm: LayoutAlgorithm;
  edgeType: EdgeType;

  nwayDiff: boolean;
}

export const helpers = {
  isRenderDagEdgesPossible(state: IParameterState, renderDagEdges: boolean) {
    if (renderDagEdges) {
      return (
        state.layoutAlgorithm !== LayoutAlgorithm.D3_HIERARCHY &&
        state.layoutAlgorithm !== LayoutAlgorithm.ELK_JS_MRTREE &&
        !state.nwayDiff
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
  },
  isNwayDiffPossible(state: IParameterState, nwayDiff: boolean) {
    if (nwayDiff) {
      return !state.renderDagEdges;
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
    },
  setNwayDiff:
    (nwayDiff: boolean): Action<IParameterState> =>
    ({ setState, getState }) => {
      if (!helpers.isNwayDiffPossible(getState(), nwayDiff)) {
        throw new Error('Illegal state transition');
      }
      setState({
        nwayDiff: nwayDiff
      });
    }
};
const ParameterStore = createStore<IParameterState, typeof actions>({
  initialState: {
    collapsible: false,
    renderDagEdges: false,
    matchAlgorithm: MatchAlgorithm.SEMANTIC_DIFF,
    layoutAlgorithm: LayoutAlgorithm.DAGRE,
    edgeType: EdgeType.BEZIER,
    nwayDiff: false
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
export const useNwayDiff = createHook(ParameterStore, {
  selector: (state: IParameterState) => state.nwayDiff
});


export const useLayouter = createHook(ParameterStore, {
  selector: (state: IParameterState): IBlockingLayouter | IAsyncLayouter => {
    switch (state.layoutAlgorithm) {
      case LayoutAlgorithm.DAGRE:
        return new DagreLayouter();
      case LayoutAlgorithm.D3_HIERARCHY:
        return new D3HierarchyLayouter();
      case LayoutAlgorithm.ELK_JS_LAYERED:
        return new ElkJsLayouter('layered');
      case LayoutAlgorithm.ELK_JS_MRTREE:
        return new ElkJsLayouter('mrtree');
    }
  }
});

export function getMatchPipelineForAlgorithm(matchAlgorithm: MatchAlgorithm) {
  switch (matchAlgorithm) {
    case MatchAlgorithm.NONE:
      // We cannot match literally nothing, that would break the layout algorithms
      return new MatchPipeline([new FixedMatcher()]);
    case MatchAlgorithm.TOP_DOWN:
      return MatchPipeline.topDownOnly(defaultDiffOptions);
    case MatchAlgorithm.BOTTOM_UP:
      return MatchPipeline.bottomUpOnly(defaultDiffOptions);
    case MatchAlgorithm.SIMPLE:
      return MatchPipeline.onlySimpleMatchers(defaultDiffOptions);
    case MatchAlgorithm.SEMANTIC_DIFF:
      return MatchPipeline.fromMode(defaultDiffOptions);
  }
}