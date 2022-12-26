import {TableScan} from "../../model/TableScan";
import {Handle, Position} from "reactflow";
// @ts-ignore
import s from "./RenderPlanNode.module.scss";
import React from "react";

export default function RenderTableScan(props: { data: TableScan}) {
    const {data : tableScanData } = props

    return (
        <>
            <Handle type="target" position={Position.Top} />
            <div className={s.planNode}>
                <span className={s.operatorName}>{tableScanData.operatorName}</span>
                <span className={s.operatorAttribute}>{tableScanData.tableName}</span>
            </div>
            <Handle type="source" position={Position.Bottom}/>
        </>
    )
}