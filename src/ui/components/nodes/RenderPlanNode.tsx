import React from "react";
import {PlanData} from "../../model/PlanData";
// @ts-ignore
import s from './RenderPlanNode.module.scss'

export default function RenderPlanNode(props: { data: PlanData }) {
    const {data : planData } = props

    return (
        <>
            <div className={s.planNode}>
                <span className={s.operatorName}>{planData.operatorName}</span>
            </div>
        </>
    )

}