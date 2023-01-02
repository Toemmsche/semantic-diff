import React from "react";
import {PlanData} from "../../model/PlanData";
// @ts-ignore
import s from './RenderPlanNode.module.scss'
import {Box} from "@mui/material";

export default function RenderPlanNode (props: { data: PlanData }) {
    const {data: planData} = props

    return (
        <Box
            borderRadius={1}
            padding={1}>
            <Box>{planData.operatorName}</Box>
        </Box>
    )

}