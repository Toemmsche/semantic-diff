import {TableScan} from "../../model/TableScan";
// @ts-ignore
import s from "./RenderPlanNode.module.scss";
import React from "react";

export default function RenderTableScan(props: { data: TableScan}) {
    const {data : tableScanData } = props

    return (
        <>
            <div className={s.planNode}>
                <span className={s.operatorName}>{tableScanData.operatorName}</span>
                <span className={s.operatorAttribute}>{tableScanData.tableName}</span>
            </div>
        </>
    )
}