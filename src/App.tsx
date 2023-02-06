import React from 'react';
// @ts-ignore
import logo from './logo.svg';
import './App.css';
import QueryPlanDiff from './ui/components/QueryPlanDiff';
import { Box } from '@mui/material';
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

// @ts-ignore
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, Colors);

function App() {
  return (
    <Box width="100vw" height="100vh">
      <QueryPlanDiff></QueryPlanDiff>
    </Box>
  );
}

export default App;
