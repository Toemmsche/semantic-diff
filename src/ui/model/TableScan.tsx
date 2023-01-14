import {PlanData} from "./PlanData";
import {Box, Stack} from "@mui/material";
import {ManageSearch} from "@mui/icons-material";
import React from "react";

export function RenderTableScan (props: { data: TableScan }) {
    const {data: tableScanData} = props

    return (<Box>
            <Stack direction="row"
                   justifyContent="center"
                   alignItems="center"
                   spacing={1}>
                <ManageSearch></ManageSearch>
                <Box>{tableScanData.tableName.toUpperCase()}</Box>
            </Stack>
        </Box>)
}

export class TableScan extends PlanData {

    public static LABEL = "TableScan";

    get tableName (): string {
        return this.attributes.get("table_name")!!;
    }

    component (): Function {
        return RenderTableScan;
    }
}
