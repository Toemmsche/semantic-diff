import PlanPicker from "./PlanPicker";
import React from "react";
import QueryPlanDiffChart from "./QueryPlanDiffChart";
import {Box} from "@mui/material";
import SideBar from "./SideBar";

export default function FloatingBar (props: {}) {

    return (<Box
        sx={{
            // position: "absolute",
            // top: 50,
            // left: 200,
            // right: 200,
            // borderRadius: 5,
            // margin: 1,
            // borderStyle: "solid",
            // borderWidth: 5,
            // borderColor: "black"
        }}>
        <SideBar></SideBar>
        <PlanPicker></PlanPicker>
        <QueryPlanDiffChart></QueryPlanDiffChart>
    </Box>)
}