import { Stack } from '@mui/material';
import React from 'react';
import {
  EdgeType,
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
    value: LayoutAlgorithm.D3_HIERARCHY,
    label: 'd3-hierarchy'
  },
  {
    value: LayoutAlgorithm.ELK_JS,
    label: 'elk.js'
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
  },
  {
    value: EdgeType.SIMPLE_BEZIER,
    label: 'simple bezier'
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
    <Stack direction="row" width="15vw">
      <Stack marginRight="auto" direction="row" height="100%" justifyContent="space-between">
        <DiscreteSliderPicker<MatchAlgorithm>
          orientation="vertical"
          defaultValue={parameters.matchAlgorithm}
          labeledValues={matchAlgorithmSliderMarks}
          onChange={parameterActions.setMatchAlgorithm}
        />
        <DiscreteSliderPicker<LayoutAlgorithm>
          orientation="vertical"
          defaultValue={parameters.layoutAlgorithm}
          labeledValues={layoutAlgorithmSliderMarks}
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
          labeledValues={renderDagEdgesSliderMarks}
          onChange={parameterActions.setRenderDagEdges}
        />
      </Stack>
    </Stack>
  );
}
