import {Box, List, ListItem, ListItemText} from "@mui/material";
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
    if (!qprState.resultSelection || !parameters.showUnified) {
        return (<></>);
    } else {
        const [firstDbms, secondDbms] = qprState.resultSelection.map(
            qpr => qpr.dbms);
        return (<Box
            sx={{
                position: "absolute",
                bottom: 100,
                right: 10
            }}>
            <List>
                <ListItem>
                    <Box width={NODE_WIDTH}
                         height={NODE_HEIGHT}
                         bgcolor={UnifiedColors.EXCLUSIVE_OLD}
                         borderRadius={NODE_BORDER_RADIUS}
                         padding={NODE_PADDING}
                         textAlign="center">
                        <ListItemText>
                            {firstDbms}
                        </ListItemText>
                    </Box>
                </ListItem>
                <ListItem>
                    <Box width={NODE_WIDTH}
                         height={NODE_HEIGHT}
                         bgcolor={UnifiedColors.SHARED}
                         borderRadius={NODE_BORDER_RADIUS}
                         padding={NODE_PADDING}
                         textAlign="center"
                         fontStyle="italic">
                        <ListItemText>
                            - Both -
                        </ListItemText>
                    </Box>
                </ListItem>
                <ListItem>
                    <Box width={NODE_WIDTH}
                         height={NODE_HEIGHT}
                         bgcolor={UnifiedColors.EXCLUSIVE_NEW}
                         borderRadius={NODE_BORDER_RADIUS}
                         padding={NODE_PADDING}
                         textAlign="center">
                        <ListItemText>
                            {secondDbms}
                        </ListItemText>
                    </Box>
                </ListItem>
            </List>
        </Box>)
    }

}