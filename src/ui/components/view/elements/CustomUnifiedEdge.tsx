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
import { EarlyProbe } from '../../../model/operator/EarlyProbe';
import { getColorForIndex } from './color';
import { css, keyframes } from '@emotion/react/macro';
import { DASHARRAY_GAP } from './dimensions';

export interface ICustomUnifiedEdgeData {
  parentPlanNode: PlanNode;

  childPlanNode: PlanNode;
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
  for (const participant of childPlanNode.getMatchGroup()) {
    // The edge exists in the tree this participant originally belonged to if the participant is in the child group and its parent is in the parent group
    const edgeExists = parentPlanNode.getMatchGroup().includes(participant.getParent());
    if (edgeExists) {
      edgeGroupSourceIndices.push(participant.sourceIndex);
    }
  }
  const cardinalitySet = new Set(childPlanNode.getMatchGroup().map((n) => n.data.exactCardinality));
  const cardinality = cardinalitySet.size > 1 ? null : [...cardinalitySet][0];

  const isEarlyProbeEdge =
    EarlyProbe.isEarlyProbe(childPlanData) && parentPlanData.operatorId === childPlanData.source;

  const groupSize = edgeGroupSourceIndices.length + 1;
  const actualGap = DASHARRAY_GAP / groupSize;
  const paths = edgeGroupSourceIndices.map((sourceIndex, j) => {
    const color = getColorForIndex(sourceIndex);

    const myAnim = keyframes`
      0% {
        stroke-dashoffset: ${actualGap * j + groupSize * actualGap};
      }
      100% {
        stroke-dashoffset: ${actualGap * j};
      }
    `;

    return (
      <path
        id={id}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
        style={{
          ...style,
          strokeWidth: Math.log(cardinality ?? 10) + 1,
          stroke: color,
          strokeDasharray: `${actualGap}, ${(groupSize - 1) * actualGap}`
        }}
        css={css`
          animation: ${myAnim} 0.5s linear infinite;
        `}
      />
    );
  });

  return (
    <>
      {paths}
      {!isEarlyProbeEdge && (
        <EdgeLabelRenderer>
          <div
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
            }}
            className="nodrag nopan">
            {cardinality ?? '???'}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
}
