/** @jsxImportSource @emotion/react */

import {Box, Chip, Stack} from "@mui/material";
import React from "react";
import ViewConfig from "./ViewConfig";
import {useQueryPlanState} from "../data/QueryPlanResultStore";

export default function CollectionPicker (props: {}) {
    const [state, actions] = useQueryPlanState();

    const firstQpr = state.queryPlanResults[state.firstSelection];
    const secondQpr = state.queryPlanResults[state.secondSelection];
    const groups = new Set(state.queryPlanResults.map(qpr => qpr.dbms + " - " + qpr.dataset));
    const groupsRender = [];
    for (const group of groups) {
        const chipList = state.queryPlanResults
            // TODO
                              .filter(qpr => qpr.dbms + " - " + qpr.dataset === group)
                              .map((qpr, i) => {
                                  function selectQueryChip () {
                                      actions.setSelection(state.queryPlanResults.indexOf(
                                                               qpr),
                                                           state.secondSelection);
                                  }


                                  if (qpr === firstQpr || qpr === secondQpr) {
                                      return <Chip
                                          key={i}
                                          label={qpr.queryName}
                                          color="primary"
                                          onClick={selectQueryChip}></Chip>;
                                  } else {
                                      return <Chip key={i}
                                                   label={qpr.queryName}
                                                   onClick={selectQueryChip}></Chip>;
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
        <Stack
            spacing={2}
            marginLeft={2}
            marginRight={10}>
            <ViewConfig></ViewConfig>
            {groupsRender}
        </Stack>
    )
}