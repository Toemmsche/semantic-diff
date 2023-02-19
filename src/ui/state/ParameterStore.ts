import { Action, createHook, createStore } from 'react-sweet-state';
import DagreLayouter from '../components/view/layout/DagreLayouter';
import D3HierarchyLayouter from '../components/view/layout/D3HierarchyLayouter';
import ElkJsLayouter from '../components/view/layout/ElkJsLayouter';
import { MatchPipeline } from '../../semantic-diff/match/MatchPipeline';
import { FixedMatcher } from '../../semantic-diff/match/FixedMatcher';
import { defaultDiffOptions } from '../../semantic-diff/index';
import IAsyncLayouter from '../components/view/layout/IAsyncLayouter';
import IBlockingLayouter from '../components/view/layout/IBlockingLayouter';

export enum MatchAlgorithm {
  NONE,
  TOP_DOWN,
  BOTTOM_UP,
  SIMPLE,
  FULL
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

export enum DagEdgeTreatment {
  IGNORE,
  COPY_SUBTREE,
  FULL_DAG
}

export interface IParameterState {
  collapsible: boolean;
  dagEdgeTreatment: DagEdgeTreatment;
  matchAlgorithm: MatchAlgorithm;
  layoutAlgorithm: LayoutAlgorithm;
  edgeType: EdgeType;
  labelBuildAndProbe: boolean;
}

export const helpers = {
  isDageEdgeTreatmentPossible(state: IParameterState, dagEdgeTreatment: DagEdgeTreatment) {
    if (dagEdgeTreatment === DagEdgeTreatment.FULL_DAG) {
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
      return (
        state.dagEdgeTreatment !== DagEdgeTreatment.FULL_DAG &&
        state.matchAlgorithm < MatchAlgorithm.BOTTOM_UP
      );
    }
    return true;
  },
  isNwayDiffPossible(state: IParameterState, nwayDiff: boolean) {
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
  setDagEdgeTreatment:
    (dagEdgeTreatment: DagEdgeTreatment): Action<IParameterState> =>
    ({ setState, getState }) => {
      if (!helpers.isDageEdgeTreatmentPossible(getState(), dagEdgeTreatment)) {
        throw new Error('Illegal state transition');
      }
      setState({
        dagEdgeTreatment: dagEdgeTreatment
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
  setLabelBuildAndProbe:
    (labelBuildAndProbe: boolean): Action<IParameterState> =>
    ({ setState, getState }) => {
      setState({
        labelBuildAndProbe: labelBuildAndProbe
      });
    }
};
const ParameterStore = createStore<IParameterState, typeof actions>({
  initialState: {
    collapsible: false,
    dagEdgeTreatment: DagEdgeTreatment.IGNORE,
    matchAlgorithm: MatchAlgorithm.NONE,
    layoutAlgorithm: LayoutAlgorithm.DAGRE,
    edgeType: EdgeType.BEZIER,
    labelBuildAndProbe: true
  },
  actions
});

export const useParameterState = createHook(ParameterStore);

export const useCollapsible = createHook(ParameterStore, {
  selector: (state: IParameterState) => state.collapsible
});
export const useMatchAlgorithm = createHook(ParameterStore, {
  selector: (state: IParameterState) => state.matchAlgorithm
});
export const useDagEdgeTreatment = createHook(ParameterStore, {
  selector: (state: IParameterState) => state.dagEdgeTreatment
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
    case MatchAlgorithm.FULL:
      return MatchPipeline.fromMode(defaultDiffOptions);
  }
}
