import React, {useEffect, useState} from "react";
import {
    Box, Chip, Divider, FormControl, FormControlLabel, IconButton, Paper, Popover, Radio, RadioGroup, Stack
} from "@mui/material";
import {useAllLabels, useQueryPlanState, useUniqueDbms} from "../../state/QueryPlanResultStore";
import {Nullable} from "../../../semantic-diff/Types";
import {DBMS} from "../../model/meta/DBMS";
import {max, scaleLinear as d3ScaleLinear} from "d3";
import {Edit, Subject} from "@mui/icons-material";
import Editor from "@monaco-editor/react";

export interface IQueryPlanResultDiffProps {
}

// Color scales for results that are better / worse
const betterColorScale = d3ScaleLinear<string>()
    .domain([1, 0])
    .range(['#00bb00', '#808080']); // green
const worseColorScale = d3ScaleLinear<string>()
    .domain([0, 1])
    .range(['#808080', '#ff0000']); //red

export default function PlanPicker(props: IQueryPlanResultDiffProps) {

    const [baselineDbms, setBaseLineDbms] = useState(DBMS.Umbra as Nullable<DBMS>);
    const [selectedQuery, setSelectedQuery] = useState("8.sql" as Nullable<string>);
    const [compDbms, setCompDbms] = useState(DBMS.Hyper as Nullable<DBMS>);
    const [state, actions] = useQueryPlanState();

    useEffect(() => {
        if (baselineDbms && selectedQuery && compDbms) {
            const firstPlanResult = state.queryPlanResults.find(qpr => qpr.dbms === baselineDbms && qpr.queryName === selectedQuery)!!;
            const secondPlanResult = state.queryPlanResults.find(qpr => qpr.dbms === compDbms && qpr.queryName === selectedQuery)!!;
            actions.setResultSelection([firstPlanResult, secondPlanResult]);
        } else {
            actions.setResultSelection(null);
        }
    }, [baselineDbms, selectedQuery, compDbms])

    function resetBaseline(newBaseline: DBMS) {
        setSelectedQuery(null);
        setCompDbms(null);
        setBaseLineDbms(newBaseline);
    }

    // Labels
    const [allLabels] = useAllLabels();

    // dbms
    const [availableDbms] = useUniqueDbms();

    const qprForSelectedQuery = state.queryPlanResults.filter(qpr => qpr.queryName === selectedQuery);

    const baseLineQprForSelectedQuery = state.queryPlanResults.find(qpr => qpr.queryName === selectedQuery && qpr.dbms === baselineDbms);

    const QueriesSet = new Set(state.queryPlanResults.map(qpr => qpr.queryName))
    const uniqueQueries = Array.from(QueriesSet.entries())
        .map(val => val[1]);

    const worstResultsPerQuery = uniqueQueries.map(query => ({
        query,
        baseLineResult: state.queryPlanResults.find(qpr => qpr.dbms === baselineDbms && qpr.queryName === query)!!,
        otherResults: state.queryPlanResults
            .filter(qpr => {
                return qpr.dbms !== baselineDbms && qpr.queryName === query
            })
    }))
        .map(obj => ({
            ...obj,
            worstDiff: max(obj.otherResults
                .map(qpr => {
                    if (!qpr.benchmarkResult.total || !obj.baseLineResult.benchmarkResult.total) {
                        return null;
                    } else {
                        const baseLineMetric = obj.baseLineResult.benchmarkResult.total;
                        const otherMetric = qpr.benchmarkResult.total;

                        let diff = (baseLineMetric / otherMetric) - 1;

                        return diff;
                    }
                })
                .filter(r => r != null) as number[])!!
        }))
        // sort descending by diff
        .sort((a, b) => b.worstDiff - a.worstDiff);

    const worstOverallDiff = worstResultsPerQuery[0].worstDiff;
    const bestOverallDiff = worstResultsPerQuery[worstResultsPerQuery.length - 1].worstDiff;

    function QueryComponent(props: {}) {
        const [listAnchorEl, setListAnchorEl] = useState(null as Nullable<HTMLElement>);
        const [textAnchorEl, setTextAnchorEl] = useState(null as Nullable<HTMLElement>);

        const QueryRadios = worstResultsPerQuery
            .map(obj => {
                const {
                    query,
                    worstDiff
                } = obj;

                // if worstOtherDbmsResult is negative, then our time is
                // increased in comparison
                const label = query + " (" + (worstDiff < 0 ? "" : "+") + (worstDiff * 100).toFixed(0) + "%)";
                const color = (worstDiff < 0) ? betterColorScale(worstDiff / bestOverallDiff) : worseColorScale(worstDiff / worstOverallDiff);
                return (<Stack key={query}
                               direction="row"
                               justifyContent="start"
                               alignItems="center">
                    <Radio key={query}
                           checked={selectedQuery === query}
                           onChange={() => setSelectedQuery(query)}/>
                    <Box color={color}>{label}</Box>
                </Stack>)
            })

        return (<Stack direction="column"
                       height="100%"
                       justifyContent="space-between">
            <Box textAlign="center">
                <h3>Query</h3>
            </Box>
            <Stack direction="row" alignItems="center">
                <IconButton
                    onClick={(event) => setListAnchorEl(event.currentTarget)}>
                    <Edit/>
                </IconButton>
                <span>{selectedQuery}</span>
                <Popover
                    anchorEl={listAnchorEl}
                    open={listAnchorEl != null}
                    onClose={() => setListAnchorEl(null)}>
                    <Paper style={{
                        maxHeight: 300,
                        overflow: 'auto'
                    }}
                           elevation={6}>
                        <Stack direction="column"
                               padding={2}>{QueryRadios}</Stack>
                    </Paper>
                </Popover>
                {selectedQuery != null && <>
                    <IconButton
                        onClick={(event) => setTextAnchorEl(event.currentTarget)}>
                        <Subject/>
                    </IconButton>
                    <Popover
                        anchorEl={textAnchorEl}
                        open={textAnchorEl != null}
                        onClose={() => setTextAnchorEl(null)}>
                        <Editor
                            height="80vh"
                            width="100vh"
                            defaultLanguage="sql"
                            defaultValue={baseLineQprForSelectedQuery?.queryText}
                            options={{
                                readOnly: true
                            }}
                        />
                    </Popover>
                </>}
            </Stack>
        </Stack>)
    }


    function BaselineComponent(props: {}) {
        const [anchorEl, setAnchorEl] = useState(null as Nullable<HTMLElement>);

        const BaselineRadios = availableDbms.map(dbms => {
            return <FormControlLabel key={dbms} value={dbms} control={<Radio/>}
                                     label={dbms}/>
        })

        return (<Stack direction="column"
                       height="100%"
                       justifyContent="space-between">
            <Box textAlign="center">
                <h3>Baseline</h3>
            </Box>
            <Stack direction="row">
                <IconButton onClick={(event) => setAnchorEl(event.currentTarget)}><Edit/></IconButton>
                <Popover anchorEl={anchorEl} open={anchorEl != null}
                         onClose={() => setAnchorEl(null)}>
                    <FormControl>
                        <RadioGroup onChange={(event) => resetBaseline(event.target.value as DBMS)}>
                            {BaselineRadios}
                        </RadioGroup>
                    </FormControl>
                </Popover>
                <Stack textAlign="center"
                       alignItems="center"
                       justifyContent="center">
                    <Chip color="primary"
                          label={baselineDbms ?? "Please select a baseline"}></Chip>
                </Stack>
            </Stack>
        </Stack>)
    }

    function CompComponent(props: {}) {
        const CompCandidateItems = qprForSelectedQuery
            .filter(qpr => qpr != baseLineQprForSelectedQuery)
            .map(qpr => {
                const dbms = qpr.dbms;

                let addLabel = "";
                if (baseLineQprForSelectedQuery) {
                    const diff = baseLineQprForSelectedQuery.benchmarkResult.total!! / qpr.benchmarkResult.total!! - 1;
                    addLabel = " (" + (diff < 0 ? "" : "+") + (diff * 100).toFixed(0) + "%)";
                    const color = (diff < 0) ? betterColorScale(diff / bestOverallDiff) : worseColorScale(diff / worstOverallDiff);
                }

                return (<Chip
                    key={dbms}
                    color={dbms === compDbms ? "primary" : "default"}
                    sx={{
                        borderRadius: '16px'
                    }}
                    label={dbms + addLabel}
                    onClick={() => setCompDbms(dbms)}></Chip>)
            });

        return <Stack direction="column"
                      height="100%"
                      justifyContent="space-between">
            <Box textAlign="center">
                <h3>Comparison</h3>
            </Box>
            <Stack key="second"
                   direction="row"
                   alignItems="center"
                   spacing={2}>
                {CompCandidateItems}
            </Stack>
        </Stack>
    }


    return <Stack display="flex" justifyContent="center"
                  alignItems="center">
        <Stack direction="column">
            <Stack direction="row"
                   spacing={50}>
                <Stack key="first"
                       direction="row"
                       alignItems="center"
                       spacing={2}>
                    <BaselineComponent></BaselineComponent>
                    <Divider orientation="vertical"></Divider>
                    <QueryComponent></QueryComponent>
                    <Divider orientation="vertical"></Divider>
                    <CompComponent></CompComponent>
                </Stack>
            </Stack>
        </Stack>
    </Stack>
}