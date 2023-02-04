import {PlanData} from "./PlanData";
import {Box} from "@mui/material";
import React from "react";


export function RenderResult (props: { data: Result }) {
    const {data: resultData} = props;

    return <Box sx={{
        borderStyle: "solid",
        borderRadius: 1,
        borderWidth: 1
    }}>RESULT</Box>
}

export class Result extends PlanData {
    component (): Function {
        return RenderResult;
    }
}