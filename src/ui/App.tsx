import React, { useEffect } from 'react';
// @ts-ignore
import logo from './logo.svg';
import './App.css';
import QueryPlanDiff from './components/QueryPlanDiff';
import { Stack } from '@mui/material';
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
import { batchPlans } from './state/defaultPlans';

// @ts-ignore
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, Colors);

function App() {
  const [qprState, qprActions] = useQueryPlanState();

  // simulate upload once
  useEffect(() => {
    qprActions.setQueryPlanResults(batchPlans);
  }, []);

  return (
    <Stack direction="column" height="100vh" width="100vw">
      <FloatingMenu></FloatingMenu>
      <QueryPlanDiff />
    </Stack>
  );
}

export default App;
