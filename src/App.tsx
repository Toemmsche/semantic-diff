import React from 'react';
// @ts-ignore
import logo from './logo.svg';
import './App.css';
import QueryPlanDiff from "./ui/components/QueryPlanDiff";
import SideBar from "./ui/components/SideBar";
import {Box} from "@mui/material";

function App () {
    return (
        <Box
            width="100vw"
            height="100vh">
            <SideBar></SideBar>
            <QueryPlanDiff></QueryPlanDiff>
        </Box>
    );
}

export default App;
