/** @jsxImportSource @emotion/react */

import React from 'react';
import {
    BaseEdge, EdgeLabelRenderer,
    EdgeProps,
    getBezierPath,
    Position
} from 'reactflow';
import {Origin} from "../../../../semantic-diff/delta/UnifiedTreeGenerator";
import {UnifiedColors} from "./UnifiedDiffPlanNode";
import {PlanData} from "../../../model/PlanData";

export interface ICustomUnifiedEdgeData {

    parentPlanData: PlanData,
    childPlanData: PlanData,

    edgeOrigin: Origin
}

export default function CustomUnifiedEdge (props: EdgeProps) {
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
    const [edgePath, labelX, labelY] = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });

    const {
        parentPlanData,
        childPlanData,
        edgeOrigin
    } = data;

    let pathStroke: string;
    if (edgeOrigin === Origin.OLD) {
        pathStroke = UnifiedColors.EXCLUSIVE_OLD;
    } else if (edgeOrigin === Origin.SHARED) {
        pathStroke = UnifiedColors.SHARED;
    } else {
        pathStroke = UnifiedColors.EXCLUSIVE_NEW;
    }

    const card = childPlanData.exactCardinality;

    return (<>
        <path
            id={id}
            style={style}
            className="react-flow__edge-path"
            d={edgePath}
            markerEnd={markerEnd}
            css={{
                strokeWidth: Math.log(card) +
                             1, // for some reason, we have to set this in here
                stroke: pathStroke
            }}
        />
        <EdgeLabelRenderer>
            <div
                style={{
                    position: 'absolute',
                    transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                    background: '#ffffffcc',
                    padding: 10,
                    borderRadius: 5,
                    fontSize: 12,
                    fontWeight: 700,
                }}
                className="nodrag nopan"
            >
                {childPlanData.exactCardinality}
            </div>
        </EdgeLabelRenderer>
    </>);
}