/** @jsxImportSource @emotion/react */

import {Box, Button, Chip, Popover, Stack} from "@mui/material";
import React, {useState} from "react";
import {useQueryPlanState} from "../data/QueryPlanResultStore";
import QueryPlanResult from "../data/QueryPlanResult";
import {Nullable} from "../../semantic-diff/Types";


export interface ICollectionPickerProps {
    currentSelection: QueryPlanResult,
    onSelect: (qpr: QueryPlanResult) => void;

    label: string
}


export default function CollectionPicker (props: ICollectionPickerProps) {
    const [state, actions] = useQueryPlanState();

    const {currentSelection, onSelect, label} = props;

    const [anchorEl, setAnchorEl] = useState(null as Nullable<HTMLElement>);

    const groups = new Set(state.queryPlanResults.map(qpr => qpr.dbms + " - " + qpr.dataset));
    const groupsRender = [];
    for (const group of groups) {
        const chipList = state.queryPlanResults
                              .filter(qpr => qpr.dbms + " - " + qpr.dataset === group)
                              .map((qpr, i) => {
                                  if (qpr === currentSelection) {
                                      return <Chip
                                          key={i}
                                          label={qpr.queryName}
                                          color="primary"
                                          onClick={() => onSelect(qpr)}></Chip>;
                                  } else {
                                      return <Chip key={i}
                                                   label={qpr.queryName}
                                                   onClick={() => onSelect(qpr)}></Chip>;
                                  }
                              });
        groupsRender.push(
            <Box key={group}>
                <h3>
                    {group}
                </h3>
                <Stack
                    width="20vw"
                    direction={"row"}
                    // enable wrapping behavior
                    flexWrap="wrap"
                    gap={1}
                    spacing={0}>
                    {chipList}
                </Stack>
            </Box>
        )
    }
    return (
        <>
            <Button onClick={(event) => setAnchorEl(event.currentTarget)}>
                {label}
            </Button>
            <Popover
                anchorEl={anchorEl}
                open={anchorEl != null}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}>
                <Stack
                    spacing={2}
                    marginLeft={2}
                    marginRight={10}>
                    {groupsRender}
                </Stack>
            </Popover>
        </>
    )
}