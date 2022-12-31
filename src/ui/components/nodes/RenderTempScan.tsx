// @ts-ignore
import s from "./RenderPlanNode.module.scss";
import React from "react";
import {TempScan} from "../../model/TempScan";

export default function RenderTempScan(props: { data: TempScan}) {
    const {data : tableScanData } = props

    return (
        <>
            <div className={s.planNode}>
                <span className={s.operatorName}>{tableScanData.operatorName}</span>
                <span className={s.operatorAttribute}>{"<" + tableScanData.scannedId + ">"}</span>
            </div>
        </>
    )
}