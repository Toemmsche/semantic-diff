import { Box, Chip, IconButton, Modal, Stack } from '@mui/material';
import QueryPlanResult from '../../model/meta/QueryPlanResult';
import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  useAllLabels,
  useQueryPlanState,
  useUniqueSystems
} from '../../state/QueryPlanResultStore';
import { QueryStats } from '@mui/icons-material';
import { getColorForIndex } from '../view/elements/color';

export default function QueryPlanDiffChart(props: {}) {
  const [allLabels, _] = useAllLabels();
  const initialLabels = ['compilation', 'execution', 'total'];
  const [availableSystems] = useUniqueSystems();
  const [activeLabels, setActiveLabels] = useState(initialLabels);
  const [qprState, qprActions] = useQueryPlanState();

  const [open, setOpen] = useState(false);

  // TODO get the selected query some other way

  let selectedQprs = [] as QueryPlanResult[];
  if (qprState.resultSelection.length > 0) {
    const selectedQuery = qprState.resultSelection.filter((qpr) => qpr != null)[0]!.query;

    selectedQprs = availableSystems.map(
      (system) =>
        qprState.queryPlanResults.find(
          (qpr) => qpr.query === selectedQuery && qpr.system === system
        )!
    );
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

  const getDataset = (qpr: QueryPlanResult, index: number) => {
    return {
      label: qpr.system,
      data: activeLabels.map((cat) => {
        // @ts-ignore
        const val = qpr.benchmarkResult[cat];
        if (val instanceof Array) {
          return val[0];
        }
        return val;
      }),
      backgroundColor: getColorForIndex(index)
    };
  };

  const chartData = {
    labels: activeLabels,
    datasets: selectedQprs.map((qpr, i) => getDataset(qpr, i))
  };

  return (
    <>
      <IconButton onClick={() => setOpen(true)}>
        <QueryStats
          sx={{
            fontSize: 60
          }}></QueryStats>
      </IconButton>
      <Modal
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
        open={open}
        onClose={() => setOpen(false)}>
        <Box padding={4} bgcolor="white" width="70vw">
          <Stack direction="row" flexWrap="wrap" spacing={1}>
            {chips}
          </Stack>
          <Bar options={chartOptions} data={chartData}></Bar>
        </Box>
      </Modal>
    </>
  );
}
