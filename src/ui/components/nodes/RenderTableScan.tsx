import {TableScan} from "../../model/TableScan";
// @ts-ignore
import s from "./RenderPlanNode.module.scss";
import React from "react";
import {Box, Stack} from "@mui/material";
import {ManageSearch} from "@mui/icons-material";

export default function RenderTableScan (props: { data: TableScan }) {
    const {data: tableScanData} = props

    return (
        <Box>
            <Stack direction="row"
                   justifyContent="center"
                   alignItems="center"
                   spacing={1}>
                <ManageSearch></ManageSearch>
                <Box>{tableScanData.tableName}</Box>
            </Stack>
        </Box>
    )
}