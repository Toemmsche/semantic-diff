import React, {useEffect, useState} from "react";
import {
    Chip,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Paper,
    Stack
} from "@mui/material";
import {
    useAllLabels, useQueryPlanState, useUniqueDbms
} from "../data/QueryPlanResultStore";
import {Nullable} from "../../semantic-diff/Types";
import {DBMS} from "../model/meta/DBMS";
import {Navigation} from "@mui/icons-material";
import {max} from "d3";

export interface IQueryPlanResultDiffProps {
}

export default function PlanPicker (props: IQueryPlanResultDiffProps) {

    const [baselineDbms, setBaseLineDbms] = useState(
        DBMS.Umbra as Nullable<DBMS>);
    const [selectedQuery, setSelectedQuery] = useState(
        null as Nullable<string>);
    const [compDbms, setCompDbms] = useState(null as Nullable<DBMS>);
    const [state, actions] = useQueryPlanState();
    const [anchorEl, setAnchorEl] = useState(null as Nullable<HTMLElement>);


    // Labels
    const [allLabels] = useAllLabels();

    // dbms
    const [availableDbms] = useUniqueDbms();

    // queries
    const QueriesSet = new Set(state.queryPlanResults.map(qpr => qpr.queryName))
    const uniqueQueries = Array.from(QueriesSet.entries())
        .map(val => val[1]);
    const qprForSelectedQuery = state.queryPlanResults.filter(
        qpr => qpr.queryName === selectedQuery);

    const worstResultsPerQuery = uniqueQueries.map(query => ({
        query,
        baseLineResult: state.queryPlanResults.find(
            qpr => qpr.dbms === baselineDbms && qpr.queryName === query)!!
    }))
        .map(obj => ({
            ...obj,
            worstOtherDbmsResult: max(state.queryPlanResults
                .filter(qpr => {
                    return qpr.dbms !==
                           baselineDbms &&
                           qpr.queryName ===
                           obj.query
                })
                .map(qpr => {
                    if (!qpr.benchmarkResult.execution ||
                        !obj.baseLineResult.benchmarkResult.execution) {
                        return 0;
                    } else {

                        return qpr.benchmarkResult.execution /
                               obj.baseLineResult.benchmarkResult.execution
                    }

                }))!!

        }));

    const baseLineQprForSelectedQuery = state.queryPlanResults.find(
        qpr => qpr.queryName === selectedQuery && qpr.dbms === baselineDbms);

    const QueryListItems = worstResultsPerQuery
        .sort((a, b) => a.worstOtherDbmsResult - b.worstOtherDbmsResult)
        .map(obj => {
            const {
                query,
                worstOtherDbmsResult
            } = obj;
            return (<ListItem key={query}>
                <ListItemButton
                    onClick={() => setSelectedQuery(query)}>
                    <ListItemIcon><Navigation></Navigation></ListItemIcon>
                </ListItemButton>
                <ListItemText
                    primary={query}
                    secondary={worstOtherDbmsResult}
                ></ListItemText>
            </ListItem>)
        })


    useEffect(() => {
        if (baselineDbms && selectedQuery && compDbms) {
            const firstPlanResult = state.queryPlanResults.find(
                qpr => qpr.dbms ===
                       baselineDbms &&
                       qpr.queryName ===
                       selectedQuery)!!;
            const secondPlanResult = state.queryPlanResults.find(
                qpr => qpr.dbms ===
                       compDbms &&
                       qpr.queryName ===
                       selectedQuery)!!;
            actions.setResultSelection(firstPlanResult, secondPlanResult);
        }
    }, [baselineDbms, selectedQuery, compDbms])


    const CompCandidateItems = availableDbms
        .filter(dbms => dbms !== baselineDbms)
        .map(dbms => {
            let executionTime = qprForSelectedQuery.find(
                qpr => qpr.dbms === dbms)?.benchmarkResult?.execution;

            return (<Chip
                key={dbms}
                color={dbms === compDbms ? "primary" : "default"}
                sx={{
                    borderRadius: '16px'
                }}
                label={dbms + (executionTime ?? "")}
                onClick={() => setCompDbms(dbms)}></Chip>)
        })

    return <Stack display="flex" justifyContent="center"
                  alignItems="center">
        <Stack direction="column">
            <Stack direction="row"
                   spacing={50}>
                <Stack key="first"
                       direction="row"
                       alignItems="center"
                       spacing={2}>
                    <h1>{baselineDbms ?? "Please select a baseline"}</h1>
                    <span>{baseLineQprForSelectedQuery?.benchmarkResult?.execution ?? ""}</span>
                    <Paper style={{
                        maxHeight: 200,
                        overflow: 'auto'
                    }}>
                        <List>
                            {QueryListItems}
                        </List>
                    </Paper>
                    <Stack key="second"
                           direction="column"
                           alignItems="center"
                           spacing={2}>
                        {CompCandidateItems}
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    </Stack>
}