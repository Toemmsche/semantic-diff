import { Stack } from '@mui/material';
import React from 'react';
import {
  EdgeType,
  helpers,
  LayoutAlgorithm,
  MatchAlgorithm,
  useParameterState
} from '../../state/ParameterStore';
import DiscreteSliderPicker from './DiscreteSlider';

const matchAlgorithmSliderMarks = [
  {
    value: MatchAlgorithm.NONE,
    label: 'none'
  },
  {
    value: MatchAlgorithm.TOP_DOWN,
    label: 'top down'
  },
  {
    value: MatchAlgorithm.BOTTOM_UP,
    label: 'bottom up'
  },
  {
    value: MatchAlgorithm.SIMPLE,
    label: 'top down & bottom up'
  },
  {
    value: MatchAlgorithm.SEMANTIC_DIFF,
    label: 'semantic diff'
  }
];

const layoutAlgorithmSliderMarks = [
  {
    value: LayoutAlgorithm.DAGRE,
    label: 'dagre'
  },
  {
    value: LayoutAlgorithm.ELK_JS_LAYERED,
    label: 'elk.js (layered)'
  },

  {
    value: LayoutAlgorithm.ELK_JS_MRTREE,
    label: 'elk.js (mrtree)'
  },
  {
    value: LayoutAlgorithm.D3_HIERARCHY,
    label: 'd3-hierarchy'
  }
];

const edgeTypeSliderMarks = [
  {
    value: EdgeType.BEZIER,
    label: 'Bezier'
  },
  {
    value: EdgeType.STRAIGHT,
    label: 'straight'
  },
  {
    value: EdgeType.SMOOTH_STEP,
    label: 'smooth step'
  }
];

const collapsibleSliderMarks = [
  {
    value: false,
    label: 'no expand & collapse'
  },
  {
    value: true,
    label: 'expand & collapse'
  }
];
const renderDagEdgesSliderMarks = [
  {
    value: false,
    label: 'no DAG edges'
  },
  {
    value: true,
    label: 'render DAG edges'
  }
];

export default function ParamConfig() {
  const [parameters, parameterActions] = useParameterState();

  return (
    <Stack direction="row" width="15vw" height="100%">
      <Stack marginRight="auto" direction="row" height="100%" justifyContent="space-between">
        <DiscreteSliderPicker<MatchAlgorithm>
          orientation="vertical"
          defaultValue={parameters.matchAlgorithm}
          labeledValues={matchAlgorithmSliderMarks.map((lv) => ({
            ...lv,
            disabled: !helpers.isMatchAlgorithmPossible(parameters, lv.value)
          }))}
          onChange={parameterActions.setMatchAlgorithm}
        />
        <DiscreteSliderPicker<LayoutAlgorithm>
          orientation="vertical"
          defaultValue={parameters.layoutAlgorithm}
          labeledValues={layoutAlgorithmSliderMarks.map((lv) => ({
            ...lv,
            disabled: !helpers.isLayoutAlgorithmPossible(parameters, lv.value)
          }))}
          onChange={parameterActions.setLayoutAlgorithm}
        />
        <DiscreteSliderPicker<EdgeType>
          orientation="vertical"
          defaultValue={parameters.edgeType}
          labeledValues={edgeTypeSliderMarks}
          onChange={parameterActions.setEdgeType}
        />
        <DiscreteSliderPicker<boolean>
          orientation="vertical"
          defaultValue={parameters.collapsible}
          labeledValues={collapsibleSliderMarks}
          onChange={parameterActions.setCollapsible}
        />
        <DiscreteSliderPicker<boolean>
          orientation="vertical"
          defaultValue={parameters.renderDagEdges}
          labeledValues={renderDagEdgesSliderMarks.map((lv) => ({
            ...lv,
            disabled: !helpers.isRenderDagEdgesPossible(parameters, lv.value)
          }))}
          onChange={parameterActions.setRenderDagEdges}
        />
      </Stack>
    </Stack>
  );
}
