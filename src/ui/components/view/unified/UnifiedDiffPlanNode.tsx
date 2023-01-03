import React, {useState} from "react";
import {PlanData} from "../../../model/PlanData";
import {Handle, Position} from "reactflow";
import {useParameterState} from "../../../data/Store";
import {Box, Button} from "@mui/material";
import {ExpandMore} from "@mui/icons-material";
import {Origin} from "../../../../semantic-diff/delta/UnifiedTreeGenerator";
import {Nullable} from "../../../../semantic-diff/Types";
import {NODE_HEIGHT, NODE_WIDTH} from "../diff/TwoWayDiffPlanNode";

export interface IUnifiedDiffProps {
    data: {
        expand: () => void,
        hide: (hidden: boolean, data: PlanData) => void,
        firstPlanData: Nullable<PlanData>,
        secondPlanData: Nullable<PlanData>,
    }
}

export enum UnifiedColors {
    EXCLUSIVE_OLD = "lightpink",
    EXCLUSIVE_NEW = "lightgreen",
    SHARED = "lightblue"
}

export default function UnifiedDiffPlanNode (props: IUnifiedDiffProps) {
    const [parameters, parameterActions] = useParameterState();

    const {hide, firstPlanData, secondPlanData, expand} = props.data;

    const metaPlanData = firstPlanData ?? secondPlanData!!;

    const [hasExpanded, setHasExpanded] = useState(false);

    // child component
    let Component = metaPlanData.component();

    function onHide (event: any) {
        const hidden = event.target.checked;
        hide(hidden, metaPlanData);
    }

    let bgColor: string;
    switch (metaPlanData.origin()) {
        case Origin.NEW:
            bgColor = UnifiedColors.EXCLUSIVE_NEW;
            break;
        case Origin.OLD:
            bgColor = UnifiedColors.EXCLUSIVE_OLD;
            break;
        case Origin.SHARED:
            bgColor = UnifiedColors.SHARED;
            break;
        default:
            bgColor = "lightgrey";
            break;
    }

    return (
        <Box bgcolor={bgColor}
             borderRadius={1}
             width={NODE_WIDTH}
             height={NODE_HEIGHT}
             display="flex"
             flexDirection="column"
             alignItems="center"
             justifyContent="center">
            <Handle type="target" position={Position.Top}/>
            {parameters.hideNodes && !hasExpanded ?
                <Button
                    variant="contained"
                    style={{
                        minWidth: "100%"
                    }}
                    onClick={() => {
                        setHasExpanded(true);
                        expand();
                    }}
                    endIcon={<ExpandMore/>}>
                    <Component data={metaPlanData}/>
                </Button>
                : <Component data={metaPlanData}/>}
            <Handle type="source" position={Position.Bottom}/>
        </Box>
    );

}