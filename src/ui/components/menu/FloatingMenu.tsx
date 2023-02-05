import PlanPicker from "./PlanPicker";
import React from "react";
import QueryPlanDiffChart from "./QueryPlanDiffChart";
import {Box, Stack} from "@mui/material";
import ParamConfig from "./ParamConfig";
import UploadCollection from "./UploadCollection";

export default function FloatingMenu(props: {}) {

    return (<Stack direction="row"
                   justifyContent="center"
                   width="100vw">
            <Box
                width="70%"
                padding={2}
                sx={{
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
                <Stack direction="row"
                       justifyContent="space-between"
                       alignItems="center"
                       width="100%"
                       height="100%">
                    <UploadCollection></UploadCollection>
                    <PlanPicker></PlanPicker>
                    <QueryPlanDiffChart></QueryPlanDiffChart>
                    <ParamConfig></ParamConfig>
                </Stack>
            </Box>
        </Stack>)
}