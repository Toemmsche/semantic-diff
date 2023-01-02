/** @jsxImportSource @emotion/react */

import React from 'react';
import {getBezierPath, Position} from 'reactflow';
import {ICustomEdgeData} from "../../edges/CustomEdge";
import {Origin} from "../../../../semantic-diff/delta/UnifiedTreeGenerator";
import {UnifiedColors} from "./UnifiedDiffPlanNode";

export default function CustomUnifiedEdge (props: {
    id: string,
    sourceX: number,
    sourceY: number,
    targetX: number,
    targetY: number,
    sourcePosition: Position | undefined,
    targetPosition: Position | undefined,
    style: {},
    data: ICustomEdgeData,
    markerEnd: any,
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

    const {parentPlanData, childPlanData} = data;


    let pathStroke: string;
    if (childPlanData.origin() === Origin.NEW || parentPlanData.origin() === Origin.NEW) {
        pathStroke = UnifiedColors.EXCLUSIVE_NEW;
    } else {
        pathStroke = UnifiedColors.EXCLUSIVE_OLD;
    }

    return (
        <>
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
        </>
    );
}