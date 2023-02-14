/** @jsxImportSource @emotion/react */

import React from 'react';
import {
  EdgeLabelRenderer,
  EdgeProps,
  getBezierPath,
  getSmoothStepPath,
  getStraightPath
} from 'reactflow';
import { PlanNode } from '../../../model/operator/PlanData';
import { EdgeType, useParameterState } from '../../../state/ParameterStore';
import { EarlyProbe } from '../../../model/operator/inner/EarlyProbe';
import { getColorForIndex } from './color';
import { css, keyframes } from '@emotion/react/macro';
import { PipelineBreakerScan } from '../../../model/operator/inner/PipelineBreakerScan';
import { Nullable } from '../../../../semantic-diff/Types';
import Join from '../../../model/operator/inner/Join';
import { Box, Stack } from '@mui/material';

export interface ICustomUnifiedEdgeData {
  parentPlanNode: PlanNode;

  childPlanNode: PlanNode;
}

function roughlyEqual(first: number, second: number) {
  if (first < second) {
    [first, second] = [second, first];
  }

  // tolerate a 20% error in cardinality
  return first === 0 ? true : 1 - second / first <= 0.2;
}

function shortCardinality(cardinality: number): string {
  if (cardinality === 0) {
    return '0';
  }
  // just hack this, does not have to be efficient
  const [exp, suffix] = [
    [0, ''],
    [3, 'k'],
    [6, 'M'],
    [9, 'B']
  ][Math.floor(Math.log10(cardinality) / 3)] as [number, string];

  let short;
  if (cardinality < Math.pow(10, exp + 1) && suffix !== '') {
    // turns 1240 into 1.2k
    short = (cardinality / Math.pow(10, exp)).toFixed(1);
  } else {
    // turns 6101234 into 610M
    short = Math.floor(cardinality / Math.pow(10, exp));
  }
  return short + suffix;
}

export default function CustomUnifiedEdge(props: EdgeProps) {
  const {
    id,
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    style,
    data,
    markerEnd
  } = props;

  const childPlanNode: PlanNode = data.childPlanNode;
  const parentPlanNode: PlanNode = data.parentPlanNode;

  const [parameters] = useParameterState();

  const [childPlanData, parentPlanData] = [childPlanNode.data, parentPlanNode.data];

  let edgePath: string | undefined, labelX, labelY;
  switch (parameters.edgeType) {
    case EdgeType.BEZIER:
      [edgePath, labelX, labelY] = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition
      });
      break;
    case EdgeType.STRAIGHT:
      [edgePath, labelX, labelY] = getStraightPath({
        sourceX,
        sourceY,
        targetX,
        targetY
      });
      break;
    case EdgeType.SMOOTH_STEP:
      [edgePath, labelX, labelY] = getSmoothStepPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition
      });
      break;
  }

  const edgeGroupSourceIndices: number[] = [];
  let cardinalities = [];
  for (const participant of childPlanNode.getMatchGroup()) {
    // The edge exists in the tree this participant originally belonged to if the participant is in the child group and its parent is in the parent group
    const edgeExists =
      parentPlanNode.getMatchGroup().includes(participant.getParent()) ||
      PipelineBreakerScan.isPipelineBreakerScanEdge(parentPlanNode, childPlanNode) ||
      EarlyProbe.isEarlyProbeEdge(parentPlanNode, childPlanNode);
    if (edgeExists) {
      edgeGroupSourceIndices.push(participant.sourceIndex);
      cardinalities.push(participant.data.exactCardinality);
    }
  }

  const showEdgeLabel =
    !(
      EarlyProbe.isEarlyProbe(childPlanData) && parentPlanData.operatorId === childPlanData.source
    ) && !PipelineBreakerScan.isPipelineBreakerScan(parentPlanData);

  let [avgCardinality, allCardinalitiesEqual] = cardinalities.reduce(
    ([curr, allEqual], cardinality) => {
      if (curr == null || !roughlyEqual(curr, cardinality)) {
        return [null, false];
      }
      // just average
      return [(curr + cardinality) / 2, curr === cardinality && allEqual];
    },
    [cardinalities[0], true] as [Nullable<number>, boolean]
  );

  // just use a constant, this is only used for the edge width on screen
  if (!showEdgeLabel) {
    avgCardinality = 10;
  }

  const gap = 6;
  const totalBlock = 20;

  const groupSize = edgeGroupSourceIndices.length;
  const blockSize = totalBlock / groupSize;
  const paths = edgeGroupSourceIndices.map((sourceIndex, j) => {
    const color = getColorForIndex(sourceIndex);

    const myAnim = keyframes`
      0% {
        stroke-dashoffset: ${blockSize * j + totalBlock + gap};
      }
      100% {
        stroke-dashoffset: ${blockSize * j};
      }
    `;

    return (
      <path
        key={sourceIndex}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
        style={{
          ...style, // log(0) === inf
          strokeWidth:
            Math.log2(avgCardinality != null ? (avgCardinality === 0 ? 1 : avgCardinality) : 10) +
            1,
          stroke: color,
          strokeDasharray: `${blockSize}, ${gap + (groupSize - 1) * blockSize}` // the remaining gap
        }}
        css={css`
          animation: ${myAnim} 1s linear reverse infinite;
        `}
      />
    );
  });

  let edgeLabel = '';
  if (parameters.labelBuildAndProbe) {
    const labels = [];
    if (Join.isBuildEdge(parentPlanNode, childPlanNode)) {
      labels.push('BUILD');
    }
    if (Join.isProbeEdge(parentPlanNode, childPlanNode)) {
      labels.push('PROBE');
    }
    if (Join.isIndexLookupEdge(parentPlanNode, childPlanNode)) {
      labels.push('INDEX');
    }
    edgeLabel = labels.join('/');
  }

  return (
    <>
      {paths}
      {showEdgeLabel && (
        <EdgeLabelRenderer>
          <Stack
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              background: '#ffffffd0',
              fontSize: 12,
              fontWeight: 500,
              borderRadius: 5,
              borderWidth: 1,
              borderStyle: 'solid',
              borderColor: 'black',
              padding: 4
            }}>
            <Box color="grey" fontSize={10}>
              {edgeLabel}
            </Box>
            <Box>
              {avgCardinality != null
                ? (allCardinalitiesEqual ? '' : '~') + shortCardinality(avgCardinality)
                : '???'}
            </Box>
          </Stack>
        </EdgeLabelRenderer>
      )}
    </>
  );
}
