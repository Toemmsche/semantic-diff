/** @jsxImportSource @emotion/react */

import React from 'react';
import {getBezierPath, Position} from 'reactflow';
import {Origin} from "../../../../semantic-diff/delta/UnifiedTreeGenerator";
import {UnifiedColors} from "./UnifiedDiffPlanNode";
import {PlanData} from "../../../model/PlanData";

export interface ICustomUnifiedEdgeData {

    parentPlanData: PlanData,
    childPlanData: PlanData,

    edgeOrigin: Origin
}

export default function CustomUnifiedEdge (props: {
    id: string, sourceX: number, sourceY: number, targetX: number, targetY: number, sourcePosition: Position | undefined, targetPosition: Position | undefined, style: {}, data: ICustomUnifiedEdgeData, markerEnd: any,
}) {
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
    const [edgePath] = getBezierPath({
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

    return (<>
        <path
            id={id}
            style={style}
            className="react-flow__edge-path"
            d={edgePath}
            markerEnd={markerEnd}
            css={{
                stroke: pathStroke
            }}
        />
        <text>
            <textPath href={`#${id}`} style={{fontSize: 12}}
                      startOffset="50%" textAnchor="middle">
                {childPlanData.exactCardinality}
            </textPath>
        </text>
    </>);
}