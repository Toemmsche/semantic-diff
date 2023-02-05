/** @jsxImportSource @emotion/react */

import React from 'react';
import {
  EdgeLabelRenderer, EdgeProps, getBezierPath, getSmoothStepPath, getStraightPath
} from 'reactflow';
import {Origin} from '../../../../semantic-diff/delta/UnifiedTreeGenerator';
import {UnifiedColors} from './UnifiedDiffPlanNode';
import {PlanNode} from '../../../model/operator/PlanData';
import {EdgeType, useParameterState} from '../../../state/ParameterStore';
import {EarlyProbe} from '../../../model/operator/EarlyProbe';
import {PipelineBreakerScan} from '../../../model/operator/PipelineBreakerScan';

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
  if (parameters.nwayDiff) {
    pathStroke = "lightgrey"
  } else {
    let edgeOrigin;
    if (parentPlanNode.unifiedOrigin === Origin.NEW || childPlanNode.unifiedOrigin === Origin.NEW) {
      edgeOrigin = Origin.NEW;
    } else if (parentPlanNode.unifiedOrigin === Origin.OLD || childPlanNode.unifiedOrigin === Origin.OLD) {
      edgeOrigin = Origin.OLD;
    } else {
      const existsInNew = childPlanNode.getMatch().getParent() === parentPlanNode.getMatch() || (PipelineBreakerScan.isPipelineBreakerScan(parentPlanData) && (parentPlanNode.getMatch().data as PipelineBreakerScan).scannedId === childPlanNode.getMatch().data.operatorId);
      const existsInOld = childPlanNode.getParent() == parentPlanNode || (PipelineBreakerScan.isPipelineBreakerScan(parentPlanData) && (parentPlanNode.data as PipelineBreakerScan).scannedId === childPlanNode.data.operatorId);
      if (existsInNew && existsInOld) {
        edgeOrigin = Origin.SHARED;
      } else if (existsInOld) {
        edgeOrigin = Origin.OLD;
      } else {
        edgeOrigin = Origin.NEW;
      }
    }

    if (edgeOrigin === Origin.OLD) {
      pathStroke = UnifiedColors.EXCLUSIVE_OLD;
    } else if (edgeOrigin === Origin.SHARED) {
      pathStroke = UnifiedColors.SHARED;
    } else {
      pathStroke = UnifiedColors.EXCLUSIVE_NEW;
    }

    if (edgeOrigin === Origin.NEW) {
      if (childPlanNode.isMatched()) {
        cardinality = childPlanNode.getMatch().data.exactCardinality;
      } else {
        // in case of shared, stay with the old one
        cardinality = childPlanData.exactCardinality;
      }
    }
  }


  const isEarlyProbeEdge = EarlyProbe.isEarlyProbe(childPlanData) && parentPlanData.operatorId === childPlanData.source;


  return (<>
        <path
            id={id}
            style={style}
            className="react-flow__edge-path"
            d={edgePath}
            markerEnd={markerEnd}
            css={{
              strokeWidth: Math.log(cardinality) + 1,
              stroke: pathStroke,
              'stroke-dasharray': 5,
              animation: "dashdraw 0.5s linear infinite"
            }}
        />
        {!isEarlyProbeEdge && (<EdgeLabelRenderer>
              <div
                  style={{
                    position: 'absolute',
                    transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                    background: '#ffffffcc',
                    padding: 10,
                    borderRadius: 5,
                    fontSize: 12,
                    fontWeight: 700
                  }}
                  className="nodrag nopan">
                {cardinality}
              </div>
            </EdgeLabelRenderer>
      )}
    </>
  );
}
