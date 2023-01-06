import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Chip,
    Stack
} from "@mui/material";
import QueryPlanResult from "../data/QueryPlanResult";
import React, {useState} from "react";
import {Bar} from "react-chartjs-2";
import {useAllLabels} from "../data/QueryPlanResultStore";

export interface IQueryPlanDiffChartProps {
    firstPlanResult: QueryPlanResult,
    secondPlanResult: QueryPlanResult
}

export default function QueryPlanDiffChart (props: IQueryPlanDiffChartProps) {
    const [allLabels, _] = useAllLabels();
    const initialLabels = ["compilation", "execution", "total"]
    const [activeLabels, setActiveLabels] = useState(initialLabels);

    const {firstPlanResult, secondPlanResult} = props;

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

    return <Accordion>
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
}