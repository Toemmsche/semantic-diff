import {
    Accordion, AccordionDetails, AccordionSummary, Box, Chip, Stack
} from "@mui/material";
import QueryPlanResult from "../data/QueryPlanResult";
import React, {useState} from "react";
import {Bar} from "react-chartjs-2";
import {useAllLabels, useQueryPlanState} from "../data/QueryPlanResultStore";
import {UnifiedColors} from "./view/unified/UnifiedDiffPlanNode";


export default function QueryPlanDiffChart (props: {}) {
    const [allLabels, _] = useAllLabels();
    const initialLabels = ["compilation", "execution", "total"]
    const [activeLabels, setActiveLabels] = useState(initialLabels);

    const [qprState, qprActions] = useQueryPlanState();

    // TODO get the selected query some other way

    let selectedQprs = [] as QueryPlanResult[];
    if (qprState.resultSelection) {
        const selectedQuery = qprState.resultSelection!![0].queryName;
        selectedQprs =
            qprState.queryPlanResults.filter(
                qpr => qpr.queryName === selectedQuery);
    }


    const chips = [];
    for (const label of allLabels) {
        if (activeLabels.some(l => l === label)) {
            chips.push(<Chip key={label} label={label}
                             color="primary"
                             onClick={() => setActiveLabels(
                                 activeLabels.filter(l => l !== label))}
            ></Chip>)
        } else {
            chips.push(<Chip key={label} label={label}
                             onClick={() => setActiveLabels(
                                 [...activeLabels, label])}
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


    const getDataset = (qpr: QueryPlanResult) => {
        let bgColor;
        if (qpr.dbms === qprState.resultSelection!![0].dbms) {
            bgColor = UnifiedColors.EXCLUSIVE_OLD;
        } else if (qpr.dbms === qprState.resultSelection!![1].dbms) {
            bgColor = UnifiedColors.EXCLUSIVE_NEW;
        } else {
            bgColor = 'rgba(0, 0, 0, 0.5)'
        }
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
            backgroundColor: bgColor
        }
    }

    const chartData = {
        labels: activeLabels,
        datasets: selectedQprs.map(qpr => getDataset(qpr))
    }

    return <Box>
        <Accordion sx={{
            marginLeft: "10%",
            marginRight: "10%"
        }}>
            <AccordionSummary>
                Detailed benchmark results
            </AccordionSummary>
            <AccordionDetails>
                <Stack direction="row" flexWrap="wrap" spacing={1}>
                    {chips}
                </Stack>
                <Bar
                    options={chartOptions}
                    data={chartData}
                ></Bar>
            </AccordionDetails>
        </Accordion>
    </Box>
}