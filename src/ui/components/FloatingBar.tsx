import PlanPicker from "./PlanPicker";
import React from "react";
import QueryPlanDiffChart from "./QueryPlanDiffChart";
import {Box, Stack} from "@mui/material";
import ViewConfig from "./ViewConfig";
import UploadCollection from "./UploadCollection";

export default function FloatingBar (props: {}) {

    return (<Stack direction="row"
                   justifyContent="center"
                   width="100%">
        <Box
            width="70%"
            padding={2}
            sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                // position: "absolute",
                // top: 50,
                // left: 200,
                // right: 200,
                borderRadius: 5,
                margin: 1,
                borderStyle: "solid",
                borderWidth: 5,
                borderColor: "black"
            }}>
            <UploadCollection></UploadCollection>
            <PlanPicker ></PlanPicker>
            <QueryPlanDiffChart></QueryPlanDiffChart>
            <ViewConfig></ViewConfig>
        </Box>
    </Stack>)
}