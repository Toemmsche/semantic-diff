import React, {useState} from "react";
import QueryPlanResult from "../data/QueryPlanResult";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    Chip,
    Stack
} from "@mui/material";
import CollectionPicker from "./CollectionPicker";
import {useQueryPlanState} from "../data/QueryPlanResultStore";
import {Nullable} from "../../semantic-diff/Types";
import {Bar} from "react-chartjs-2";

export interface IQueryPlanResultDiffProps {
    firstPlanResult: QueryPlanResult,
    secondPlanResult: QueryPlanResult
}

export default function QueryPlanResultDiff (props: IQueryPlanResultDiffProps) {

    const {firstPlanResult, secondPlanResult} = props;

    const [state, actions] = useQueryPlanState();

    function generateRow (mapper: (qpr: QueryPlanResult) => JSX.Element) {
        return [
            mapper(firstPlanResult),
            mapper(secondPlanResult)
        ]
    }

    const [anchorEl, setAnchorEl] = useState(null as Nullable<HTMLElement>);

    const allLabels = Object.keys(firstPlanResult.benchmarkResult)
                            .filter(l => l !== "error" && l !== "result")
    const initialLabels = ["compilation", "execution", "total"]
    const [activeLabels, setActiveLabels] = useState(initialLabels);

    const chips = [];
    for (const label of allLabels) {
        if (activeLabels.some(l => l === label)) {
            chips.push(
                <Chip key={label} label={label}
                      color="primary"
                      onClick={() => setActiveLabels(activeLabels.filter(l => l !== label))}
                ></Chip>)
        } else {
            chips.push(
                <Chip key={label} label={label}
                      onClick={() => setActiveLabels([...activeLabels, label])}
                ></Chip>)
        }
    }

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Chart.js Bar Chart',
            },
        }
    }


    const getDataset = (qpr: QueryPlanResult, first: boolean) => {
        return {
            label: qpr.dbms,
            data: activeLabels.map(cat => {
                // @ts-ignore
                const val = qpr.benchmarkResult[cat];
                if (val instanceof Array) {
                    return val[0];
                }
                return val;
            }),
            backgroundColor: first
                ? 'rgba(255, 99, 132, 0.5)'
                : 'rgba(53, 162, 235, 0.5)'
        }
    }

    const chartData = {
        labels: activeLabels,
        datasets: [
            getDataset(firstPlanResult, true),
            getDataset(secondPlanResult, false)
        ]
    }

    console.log(chartData);

    return <Stack display="flex" justifyContent="center"
                  alignItems="center">
        <Stack direction="column">
            <Stack direction="row"
                   spacing={50}>
                <Stack key="first"
                       direction="row"
                       alignItems="center"
                       spacing={2}>
                    <h1>{firstPlanResult.dbms}</h1>
                    <CollectionPicker
                        currentSelection={state.queryPlanResults[state.firstSelection]}
                        label="Pick Query Result"
                        onSelect={(qpr) => actions.setSelection(
                            state.queryPlanResults.indexOf(qpr),
                            state.secondSelection)}></CollectionPicker>
                </Stack>
                <Stack key="second"
                       direction="row"
                       alignItems="center"
                       spacing={2}>
                    <h1>{secondPlanResult.dbms}</h1>
                    <CollectionPicker
                        currentSelection={state.queryPlanResults[state.secondSelection]}
                        label="Pick Query Result"
                        onSelect={(qpr) => actions.setSelection(
                            state.firstSelection,
                            state.queryPlanResults.indexOf(qpr))}></CollectionPicker>
                </Stack>
            </Stack>
            <Accordion>
                <AccordionSummary>
                    Detailed benchmark results
                </AccordionSummary>
                <AccordionDetails>
                    <Stack direction="row" spacing={1}>
                        {chips}
                    </Stack>
                    <Bar
                        options={chartOptions}
                        data={chartData}
                    ></Bar>
                </AccordionDetails>
            </Accordion>
        </Stack>
    </Stack>
}

/*
   <Popover open={anchorEl != null}
                     onClose={() => setAnchorEl(null)}>
 */