import React from 'react';
import {getBezierPath, Position} from 'reactflow';
import {Nullable} from "../../../semantic-diff/Types";
import {PlanNode} from "../../model/PlanData";

export interface ICustomEdgeData {
    parent: PlanNode,
    child: PlanNode,
}

export default function CustomEdge(props: {
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

    return (
        <>
            <path
                id={id}
                style={style}
                className="react-flow__edge-path"
                d={edgePath}
                markerEnd={markerEnd}
            />
            <text>
                <textPath href={`#${id}`} style={{fontSize: 12}} startOffset="50%" textAnchor="middle">
                    {data.child.data.exactCardinality}
                </textPath>
            </text>
        </>
    );
}