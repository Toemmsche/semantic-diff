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
import { getColorForSubset } from './color';

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

  let edgePath, labelX, labelY;
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

  let pathStroke: string;
  let cardinality = childPlanData.exactCardinality;

  const edgeGroupSourceIndices: number[] = [];
  for (const participant of childPlanNode.getMatchGroup()) {
    // The edge exists in the tree this participant originally belonged to if the participant is in the child group and its parent is in the parent group
    const edgeExists = parentPlanNode.getMatchGroup().includes(participant.getParent());
    if (edgeExists) {
      edgeGroupSourceIndices.push(participant.sourceIndex);
    }
  }

  if (edgeGroupSourceIndices.length === 0) {
    pathStroke = 'black';
    console.log(childPlanNode.getMatchGroup(), parentPlanNode.getMatchGroup());
  } else {
    pathStroke = getColorForSubset(edgeGroupSourceIndices);
  }

  if (edgeGroupSourceIndices.length === 1) {
    cardinality = childPlanNode
      .getMatchGroup()
      .filter((m) => m.sourceIndex === edgeGroupSourceIndices[0])[0].data.exactCardinality;
  }

  const isEarlyProbeEdge =
    EarlyProbe.isEarlyProbe(childPlanData) && parentPlanData.operatorId === childPlanData.source;

  return (
    <>
      <path
        id={id}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
        style={{
          ...style,
          strokeWidth: Math.log(cardinality) + 1,
          stroke: pathStroke,
          strokeDasharray: 5,
          animation: 'dashdraw 0.5s linear infinite'
        }}
      />
      {!isEarlyProbeEdge && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              background: '#ffffff',
              fontSize: 12,
              fontWeight: 700
            }}
            className="nodrag nopan">
            <div
              //className="border-dance"
              style={{
                borderRadius: 5,
                borderWidth: 2,
                borderColor: pathStroke,
                borderStyle: 'dashed',
                padding: 10
              }}>
              {cardinality}
            </div>
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
}
