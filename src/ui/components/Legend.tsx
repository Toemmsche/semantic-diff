import {Box, Stack} from "@mui/material";
import React from "react";
import {useQueryPlanState} from "../data/QueryPlanResultStore";
import {useParameterState} from "../data/Store";
import {UnifiedColors} from "./view/unified/UnifiedDiffPlanNode";
import {
    NODE_BORDER_RADIUS, NODE_HEIGHT, NODE_PADDING, NODE_WIDTH
} from "./view/diff/TwoWayDiffPlanNode";

export default function Legend (props: {}) {
    const [qprState] = useQueryPlanState();
    const [parameters] = useParameterState();

    // No legend necessary if no tree or no unified view
    if (!qprState.resultSelection) {
        return (<></>);
    } else {
        const [firstDbms, secondDbms] = qprState.resultSelection.map(
            qpr => qpr.dbms);
        return (<Stack direction="row"
                       sx={{
                           position: "absolute",
                           bottom: 15,
                           right: 200
                       }}
        spacing={2}>
            <Box width={NODE_WIDTH}
                 height={NODE_HEIGHT}
                 bgcolor={UnifiedColors.EXCLUSIVE_OLD}
                 borderRadius={NODE_BORDER_RADIUS}
                 padding={NODE_PADDING}
                 textAlign="center">
                {firstDbms}
            </Box>
            <Box width={NODE_WIDTH}
                 height={NODE_HEIGHT}
                 bgcolor={UnifiedColors.SHARED}
                 borderRadius={NODE_BORDER_RADIUS}
                 padding={NODE_PADDING}
                 textAlign="center"
                 fontStyle="italic">
                - Both -
            </Box>
            <Box width={NODE_WIDTH}
                 height={NODE_HEIGHT}
                 bgcolor={UnifiedColors.EXCLUSIVE_NEW}
                 borderRadius={NODE_BORDER_RADIUS}
                 padding={NODE_PADDING}
                 textAlign="center">
                {secondDbms}
            </Box>
        </Stack>)
    }

}