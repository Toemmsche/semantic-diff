import { Box, Chip, IconButton, Popover, Stack } from '@mui/material';
import QueryPlanResult from '../../state/QueryPlanResult';
import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { useAllLabels, useQueryPlanState } from '../../state/QueryPlanResultStore';
import { UnifiedColors } from '../view/elements/UnifiedDiffPlanNode';
import { Nullable } from '../../../semantic-diff/Types';
import { QueryStats } from '@mui/icons-material';

export default function QueryPlanDiffChart(props: {}) {
  const [allLabels, _] = useAllLabels();
  const initialLabels = ['compilation', 'execution', 'total'];
  const [activeLabels, setActiveLabels] = useState(initialLabels);
  const [qprState, qprActions] = useQueryPlanState();

  const [anchorEl, setAnchorEl] = useState(null as Nullable<HTMLElement>);

  // TODO get the selected query some other way

  let selectedQprs = [] as QueryPlanResult[];
  if (qprState.resultSelection) {
    const selectedQuery = qprState.resultSelection!![0].queryName;
    selectedQprs = qprState.queryPlanResults.filter((qpr) => qpr.queryName === selectedQuery);
  }

  const chips = [];
  for (const label of allLabels) {
    if (activeLabels.some((l) => l === label)) {
      chips.push(
        <Chip
          key={label}
          label={label}
          color="primary"
          onClick={() => setActiveLabels(activeLabels.filter((l) => l !== label))}></Chip>
      );
    } else {
      chips.push(
        <Chip
          key={label}
          label={label}
          onClick={() => setActiveLabels([...activeLabels, label])}></Chip>
      );
    }
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart'
      }
    }
  };

  const getDataset = (qpr: QueryPlanResult) => {
    let bgColor;
    if (qpr.dbms === qprState.resultSelection!![0].dbms) {
      bgColor = UnifiedColors.EXCLUSIVE_OLD;
    } else if (qpr.dbms === qprState.resultSelection!![1].dbms) {
      bgColor = UnifiedColors.EXCLUSIVE_NEW;
    } else {
      bgColor = 'rgba(0, 0, 0, 0.5)';
    }
    return {
      label: qpr.dbms,
      data: activeLabels.map((cat) => {
        // @ts-ignore
        const val = qpr.benchmarkResult[cat];
        if (val instanceof Array) {
          return val[0];
        }
        return val;
      }),
      backgroundColor: bgColor
    };
  };

  const chartData = {
    labels: activeLabels,
    datasets: selectedQprs.map((qpr) => getDataset(qpr))
  };

  return (
    <>
      <IconButton onClick={(event) => setAnchorEl(event.currentTarget)}>
        <QueryStats
          sx={{
            fontSize: 60
          }}></QueryStats>
      </IconButton>
      <Popover anchorEl={anchorEl} open={anchorEl != null} onClose={() => setAnchorEl(null)}>
        <Box margin={4}>
          <Stack direction="row" flexWrap="wrap" spacing={1}>
            {chips}
          </Stack>
          <Bar options={chartOptions} data={chartData}></Bar>
        </Box>
      </Popover>
    </>
  );
}
