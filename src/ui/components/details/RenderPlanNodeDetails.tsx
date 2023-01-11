import React from "react";
import {PlanData, PlanNode} from "../../model/PlanData";

export default function RenderPlanNodeDetails(props: { data: PlanData}) {
    const {data: planData} = props;
    return (
        <span>Details for {planData.operatorName} are here!</span>
    )
}