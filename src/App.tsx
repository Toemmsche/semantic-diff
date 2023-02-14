import React from 'react';
// @ts-ignore
import logo from './logo.svg';
import './App.css';
import QueryPlanDiff from './ui/components/QueryPlanDiff';
import { Box, Stack } from '@mui/material';
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
import FloatingMenu from './ui/components/menu/FloatingMenu';
import LayoutWithDimensions from './ui/components/view/LayoutWithDimensions';
import { ReactFlowProvider } from 'reactflow';

// @ts-ignore
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, Colors);

function App() {
  return (
    <Stack direction="column" height="100vh" width="100vw">
      <FloatingMenu></FloatingMenu>
      <QueryPlanDiff />
    </Stack>
  );
}

export default App;
