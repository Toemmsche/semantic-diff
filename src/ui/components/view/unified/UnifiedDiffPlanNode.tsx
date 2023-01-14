import React, {useState} from "react";
import {PlanData} from "../../../model/PlanData";
import {Handle, Position} from "reactflow";
import {useParameterState} from "../../../data/Store";
import {Box, Button, IconButton, Popover, Stack} from "@mui/material";
import {ExpandMore, Menu} from "@mui/icons-material";
import {Origin} from "../../../../semantic-diff/delta/UnifiedTreeGenerator";
import {Nullable} from "../../../../semantic-diff/Types";
import {
    NODE_BORDER_RADIUS, NODE_HEIGHT, NODE_PADDING, NODE_WIDTH
} from "../diff/TwoWayDiffPlanNode";
import UnifiedDiffPlanNodeDetails
    from "../../details/UnifiedDiffPlanNodeDetails";

export interface IUnifiedDiffProps {
    data: {
        expand: () => void, hide: (hidden: boolean,
            data: PlanData) => void, firstPlanData: Nullable<PlanData>, secondPlanData: Nullable<PlanData>,
    }
}

export enum UnifiedColors {
    EXCLUSIVE_OLD = "lightpink",
    EXCLUSIVE_NEW = "lightgreen",
    SHARED = "lightblue"
}

export default function UnifiedDiffPlanNode (props: IUnifiedDiffProps) {
    const [parameters, parameterActions] = useParameterState();

    const {
        hide,
        firstPlanData,
        secondPlanData,
        expand
    } = props.data;

    const metaPlanData = firstPlanData ?? secondPlanData!!;

    const [hasExpanded, setHasExpanded] = useState(false);

    const [detailsAnchorEl, setDetailsAnchorEl] = useState(
        null as Nullable<HTMLElement>);

    // child component
    let Component = metaPlanData.component();

    let Details;
    if (firstPlanData && secondPlanData) {
        Details = <UnifiedDiffPlanNodeDetails firstPlanData={firstPlanData}
                                              secondPlanData={secondPlanData}></UnifiedDiffPlanNodeDetails>
    } else {
        // retrieve detail component from node
        let DetailComponent = metaPlanData.detailComponent();
        Details = <DetailComponent data={metaPlanData}></DetailComponent>
    }


    function onHide (event: any) {
        const hidden = event.target.checked;
        hide(hidden, metaPlanData);
    }

    let bgColor: string;
    switch (metaPlanData.origin) {
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

    return (<Box bgcolor={bgColor}
                 width={NODE_WIDTH}
                 height={NODE_HEIGHT}
                 borderRadius={NODE_BORDER_RADIUS}
                 padding={NODE_PADDING}
                 display="flex"
                 flexDirection="column"
                 alignItems="center"
                 justifyContent="center">
        <Handle type="target" position={Position.Top}/>
        <Stack
            width="100%" direction="row" alignItems="center"
            justifyContent="space-between">
            <Component data={metaPlanData}/>
            {parameters.hideNodes && !hasExpanded && <IconButton
                onClick={() => {
                    setHasExpanded(true);
                    expand();
                }}>
                <ExpandMore/>
            </IconButton>}
            <IconButton
                onClick={(event) => setDetailsAnchorEl(event.currentTarget)}>
                <Menu/>
            </IconButton>
            <Popover anchorEl={detailsAnchorEl} open={detailsAnchorEl != null}
                     onClose={() => setDetailsAnchorEl(null)}>
                {Details}
            </Popover>
        </Stack>
        <Handle type="source" position={Position.Bottom}/>
    </Box>);

}