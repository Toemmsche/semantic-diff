import React from 'react';
import {getBezierPath, Position} from 'reactflow';
// @ts-ignore
import s from './CustomUnifiedEdge.module.scss';
import {ICustomEdgeData} from "../../edges/CustomEdge";
import {Origin} from "../../../../semantic-diff/delta/UnifiedTreeGenerator";

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

    return (
        <>
            <path
                id={id}
                style={style}
                className={"react-flow__edge-path " + (childPlanData.origin() === Origin.NEW || parentPlanData.origin() === Origin.NEW
                    ? s.secondPlanEdge
                    : s.firstPlanEdge)}
                d={edgePath}
                markerEnd={markerEnd}
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