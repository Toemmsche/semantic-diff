// @ts-ignore
import ps from "./RenderPlanNode.module.scss";
// @ts-ignore
import js from "./RenderJoin.module.scss";
import React from "react";
import Join from "../../model/Join";
import {Box, Stack} from "@mui/material";
import {UTF8_INNER_JOIN} from "../../Chars";

export default function RenderJoin (props: { data: Join }) {
    const {data: joinData} = props;

    return (
        <Box
            borderRadius={1}
            padding={1}>
            <Stack direction="row"
                   justifyContent="center"
                   alignItems="center"
                   spacing={1}>
                <Box>{UTF8_INNER_JOIN}</Box>
                <Box>Join</Box>
            </Stack>
        </Box>
    )
}