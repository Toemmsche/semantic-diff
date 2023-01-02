import React from "react";
import {DiffPlanData, PlanData} from "../../../model/PlanData";
import {Handle, Position} from "reactflow";
import {useGlobalState} from "../../../data/Store";
import IDiffNodeData from "./IDiffNodeData";
import {Box} from "@mui/material";

export default function DiffPlanNode (props: { data: DiffPlanData }) {
    const [state, actions] = useGlobalState();
    const planData = props.data as PlanData;
    const diffData: IDiffNodeData = {
        diffState: props.data.diffState
    };

    // child component
    let Component = planData.component();

    return (
        <Box bgcolor="lightgrey"
             borderRadius={1}
             padding={1}>
            <Handle type="target" position={Position.Top}/>
            <Component data={planData}/>
            <Handle type="source" position={Position.Bottom}/>
        </Box>
    )

}