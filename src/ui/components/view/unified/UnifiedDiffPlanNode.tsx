import React, {useState} from "react";
import {PlanData} from "../../../model/PlanData";
import {Handle, Position} from "reactflow";
import {useGlobalState} from "../../../data/Store";
import {Box, Button} from "@mui/material";
import {ExpandMore} from "@mui/icons-material";
import {Origin} from "../../../../semantic-diff/delta/UnifiedTreeGenerator";

export interface IUnifiedDiffProps {
    data: {
        expand: () => void,
        hide: (hidden: boolean, data: PlanData) => void,
        thisPlanData: PlanData
    }
}

export enum UnifiedColors {
    EXCLUSIVE_OLD = "lightpink",
    EXCLUSIVE_NEW = "lightgreen",
    SHARED = "lightblue"
}

export default function UnifiedDiffPlanNode (props: IUnifiedDiffProps) {
    const [state, actions] = useGlobalState();

    const {hide, thisPlanData, expand} = props.data;

    const [hasExpanded, setHasExpanded] = useState(false);

    // child component
    let Component = thisPlanData.component();

    function onHide (event: any) {
        const hidden = event.target.checked;
        hide(hidden, thisPlanData);
    }

    let bgColor: string;
    switch (thisPlanData.origin()) {
        case Origin.NEW:
            bgColor = UnifiedColors.EXCLUSIVE_NEW;
            break;
        case Origin.OLD:
            bgColor = UnifiedColors.EXCLUSIVE_OLD;
            break;
        case Origin.SHARED:
            bgColor = UnifiedColors.SHARED;
            break;
    }

    return (
        <Box bgcolor={bgColor}
             borderRadius={1}
             padding={1}>
            <Handle type="target" position={Position.Top}/>
            <Component data={thisPlanData}/>
            {state.hideNodes && !hasExpanded &&
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
                    Expand
                </Button>}
            <Handle type="source" position={Position.Bottom}/>
        </Box>
    );

}