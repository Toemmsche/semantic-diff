import React from "react";
import {PlanData} from "../../model/PlanData";
import {
    styled, Table, TableBody, TableCell, tableCellClasses, TableRow
} from "@mui/material";

export default function RenderPlanNodeDetails (props: { data: PlanData }) {
    const {data: planData} = props;

    // Generate table for all properties
    const allKeys = planData.attributes.keys();

    const DetailTableRows = [];
    for (const [key, val] of planData.attributes.entries()) {
        DetailTableRows.push(<TableRow key={key}>
            <TableCell key="header" sx={{fontWeight: "bold"}}>
                {key}
            </TableCell>
            <TableCell key="val">
                {val}
            </TableCell>
        </TableRow>)
    }

    return (<Table><TableBody>{DetailTableRows}</TableBody></Table>)
}