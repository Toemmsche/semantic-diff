/** @jsxImportSource @emotion/react */

import {useGlobalState} from "../data/Store";
import {Chip} from "@mui/material";
import React from "react";

export default function CollectionPicker (props: {}) {
    const [state, actions] = useGlobalState();

    const dbmsGroups = new Set(state.queryPlanResults.map(qpr => qpr.dbms));
    const dbmsGroupsRender = [];
    for (const dbms of dbmsGroups) {
        const chipList = state.queryPlanResults
                              .filter(qpr => qpr.dbms === dbms)
                              .map((qpr) => {
                                  return <Chip label={qpr.queryName}></Chip>
                              });
        dbmsGroupsRender.push(
            <div
                css={{
                    display: 'flex',
                    "flex-direction": 'row'
                }}>
                {dbms}
                {chipList}
            </div>
        )
    }
    return (
        <div
            css={{
                display: 'flex',
                "flex-direction": 'column'
            }}>
            {dbmsGroupsRender}
        </div>
    )
}