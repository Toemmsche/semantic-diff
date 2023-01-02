/** @jsxImportSource @emotion/react */

import React, {useState} from "react";
import {PlanData} from "../../../model/PlanData";
import {Handle, Position} from "reactflow";
import {Box} from "@mui/material";
import {useRenderState} from "../../../data/RenderStore";
import {Nullable} from "../../../../semantic-diff/Types";


export interface ITwoWayDiffPlanNodeProps {
    data: {
        firstPlanData: Nullable<PlanData>,
        secondPlanData: Nullable<PlanData>,
    }
}

export default function TwoWayDiffPlanNode (props: ITwoWayDiffPlanNodeProps) {

    const [state, actions] = useRenderState();

    const {firstPlanData, secondPlanData} = props.data;

    // if the first one is null, the second one definitely isn't
    const metaPlanData = firstPlanData ?? secondPlanData!!;

    const [isHoverActive, setHoverActive] = useState(metaPlanData.hoverActive ?? false);

    // child component
    let Component = metaPlanData.component();

    function handleStartHover () {
        const arr = [];
        if (firstPlanData) arr.push(firstPlanData);
        if (secondPlanData) arr.push(secondPlanData);
        actions.setHoveredData(arr)
    }

    function handleEndHover () {
        actions.setHoveredData([]);
    }

    return (
        <Box bgcolor={state.hoveredData.some(pd => pd === metaPlanData)
            ? "lightyellow"
            : "lightgrey"}
             borderRadius={1}
             padding={1}
             onMouseOver={handleStartHover}
             onMouseOut={handleEndHover}>
            <Handle type="target" position={Position.Top}/>
            <Component data={metaPlanData}/>
            <Handle type="source" position={Position.Bottom}/>
        </Box>
    )

}