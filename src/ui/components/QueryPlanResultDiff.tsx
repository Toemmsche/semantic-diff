import React from "react";
import QueryPlanResult, {getKey} from "../data/QueryPlanResult";
import {
    Box,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from "@mui/material";

export interface IQueryPlanResultDiffProps {
    firstPlanResult: QueryPlanResult,
    secondPlanResult: QueryPlanResult
}

export default function QueryPlanResultDiff (props: IQueryPlanResultDiffProps) {

    const {firstPlanResult, secondPlanResult} = props;

    function generateRow (mapper: (qpr: QueryPlanResult) => JSX.Element) {
        return [
            mapper(firstPlanResult),
            mapper(secondPlanResult)
        ]
    }

    return <Box display="flex" justifyContent="center" alignItems="center">
        <Stack direction="column">
            <Stack direction="row"
                   spacing={50}>
                <Box key="first">
                    <h1>{firstPlanResult.dbms}</h1>
                </Box>
                <Box key="second">
                    <h1>{secondPlanResult.dbms}</h1>
                </Box>
            </Stack>
            <Table>
                <TableHead></TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell key="title">Run⌛ (ms):</TableCell>
                        {generateRow(qpr =>
                                         <TableCell
                                             key={getKey(qpr)}>{qpr.benchmarkResult.execution[0] ?? "--"}</TableCell>)}
                    </TableRow>
                    <TableRow>
                        <TableCell key="title">Compile⌛ (ms):</TableCell>
                        {generateRow(qpr =>
                                         <TableCell
                                             key={getKey(qpr)}>{qpr.benchmarkResult.compilation[0] ?? "--"}</TableCell>)}
                    </TableRow>
                </TableBody>
            </Table>
        </Stack>
    </Box>
}