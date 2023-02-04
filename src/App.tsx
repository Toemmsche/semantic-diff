import React from 'react';
// @ts-ignore
import logo from './logo.svg';
import './App.css';
import QueryPlanDiff from "./ui/components/QueryPlanDiff";
import {Box} from "@mui/material";
import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip
} from "chart.js";
import FloatingBar from "./ui/components/menu/FloatingBar";


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip,
    Legend);

function App () {
    return (<Box
            width="100vw"
            height="100vh">
            <QueryPlanDiff></QueryPlanDiff>
        </Box>);
}

export default App;
