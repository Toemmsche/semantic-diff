import React, { useEffect } from 'react';
// @ts-ignore
import logo from './logo.svg';
import './App.css';
import QueryPlanDiff from './components/QueryPlanDiff';
import { CircularProgress, Stack } from '@mui/material';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Colors,
  Legend,
  LinearScale,
  Title,
  Tooltip
} from 'chart.js';
import FloatingMenu from './components/menu/FloatingMenu';
import { useQueryPlanState } from './state/QueryPlanResultStore';

// @ts-ignore
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, Colors);

function App() {
  const [qprState, qprActions] = useQueryPlanState();

  const isLoading = qprState.queryPlanResults.length === 0;

  // fetch inital QPRs from backend
  useEffect(() => {
    Promise.all([
      fetch('/semantic-diff/qpr/tpchSf10.json').then((res) => res.json()),
      fetch('/semantic-diff/qpr/tpcdsSf10.json').then((res) => res.json())
      // TODO include JOB as soon as HyPer table names are resolved
    ]).then(([tpchQprs, tpcdsQprs]) => {
      // combine and stringify
      const bundledText = JSON.stringify([...tpchQprs, ...tpcdsQprs]);
      qprActions.setQueryPlanResults(bundledText);
    });
  }, []);

  if (isLoading) {
    return (
      <Stack
        direction="column"
        height="100vh"
        width="100vw"
        justifyContent="center"
        alignItems="center">
        <CircularProgress size={200} />
      </Stack>
    );
  }
  return (
    <Stack direction="column" height="100vh" width="100vw">
      <FloatingMenu></FloatingMenu>
      <QueryPlanDiff />
    </Stack>
  );
}

export default App;
