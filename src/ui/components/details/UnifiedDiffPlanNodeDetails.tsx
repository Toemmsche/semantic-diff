import React from "react";
import {PlanData} from "../../model/PlanData";
import {Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {useQueryPlanState} from "../../data/QueryPlanResultStore";

// choose non-nullable props since we would use a regular details viewer
// otherwise
export default function RenderPlanNodeDetails (props: { firstPlanData: PlanData, secondPlanData: PlanData }) {
    const {
        firstPlanData,
        secondPlanData
    } = props;

    const [qprState] = useQueryPlanState();

    const [firstDbms, secondDbms] = qprState.resultSelection!!.map(
        qpr => qpr.dbms);

    // Generate table for all properties
    const allKeys = new Set([
        ...firstPlanData.attributes.keys(), ...secondPlanData.attributes.keys()
    ]);

    const DetailTableRows = [];
    for (const key of allKeys) {
        const firstVal = firstPlanData.attributes.get(key);
        const secondVal = secondPlanData.attributes.get(key);
        DetailTableRows.push(<TableRow key={key}>
            <TableCell key="header" sx={{fontWeight: "bold"}}>
                {key}
            </TableCell>
            <TableCell key="firstVal">
                {firstVal}
            </TableCell>
            <TableCell key="secondVal">
                {secondVal}
            </TableCell>
        </TableRow>)
    }

    return (<Table>
        <TableHead>
            <TableRow>
                <TableCell></TableCell>
                <TableCell>{firstDbms}</TableCell>
                <TableCell>{secondDbms}</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {DetailTableRows}
        </TableBody></Table>)
}