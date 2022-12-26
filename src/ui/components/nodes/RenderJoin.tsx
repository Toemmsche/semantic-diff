import {TableScan} from "../../model/TableScan";
import {Handle, Position} from "reactflow";
// @ts-ignore
import ps from "./RenderPlanNode.module.scss";
// @ts-ignore
import js from "./RenderJoin.module.scss";
import React from "react";
import Join from "../../model/Join";

export default function RenderJoin(props: { data: Join}) {
    const {data: joinData} = props;

    return (
        <>
            <Handle type="target" position={Position.Top} />
            <div className={ps.planNode}>
                <span className={js.joinName}>{joinData.operatorName}</span>
                <span className={ps.operatorAttribute}>{joinData.joinType}</span>
            </div>
            <Handle type="source" position={Position.Bottom}/>
        </>
    )
}