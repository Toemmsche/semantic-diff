import {TableScan} from "../../model/TableScan";
import {Handle, Position} from "reactflow";
// @ts-ignore
import s from "./RenderPlanNode.module.scss";
import React from "react";
import {TempScan} from "../../model/TempScan";
import {tab} from "@testing-library/user-event/dist/tab";

export default function RenderTempScan(props: { data: TempScan}) {
    const {data : tableScanData } = props

    return (
        <>
            <Handle type="target" position={Position.Top} />
            <div className={s.planNode}>
                <span className={s.operatorName}>{tableScanData.operatorName}</span>
                <span className={s.operatorAttribute}>{"<" + tableScanData.scannedId + ">"}</span>
            </div>
            <Handle type="source" position={Position.Bottom}/>
        </>
    )
}