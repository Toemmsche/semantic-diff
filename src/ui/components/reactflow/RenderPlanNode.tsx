import React from "react";
import {PlanData} from "../../model/PlanData";
import IRenderBackendProps from "./IRenderBackendProps";
// @ts-ignore
import s from './RenderPlanNode.module.scss'
import {Handle, Position} from "reactflow";

export default function RenderPlanNode(props: { data: PlanData }) {
    const {data : planData } = props

    return (
        <>
            <Handle type="target" position={Position.Top} />
            <div className={s.planNode}>
                <span className={s.operatorName}>{planData.operatorName}</span>
            </div>
            <Handle type="source" position={Position.Bottom}/>
        </>
    )

}