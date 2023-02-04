import {Box, Stack} from "@mui/material";
import React from "react";
import {useQueryPlanState} from "../../state/QueryPlanResultStore";
import {useParameterState} from "../../state/ParameterStore";
import {UnifiedColors} from "./elements/UnifiedDiffPlanNode";
import {
    NODE_BORDER_RADIUS, NODE_HEIGHT, NODE_PADDING, NODE_WIDTH
} from "./elements/dimensions";

export default function Legend (props: {}) {
    const [qprState] = useQueryPlanState();
    const [parameters] = useParameterState();

    // No legend necessary if no tree or no elements view
    if (!qprState.resultSelection) {
        return (<></>);
    } else {
        const [firstDbms, secondDbms] = qprState.resultSelection.map(
            qpr => qpr.dbms);
        return (<Stack direction="column"
                       sx={{
                           position: "absolute",
                           bottom: 2 * NODE_HEIGHT,
                           right: NODE_WIDTH / 4
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