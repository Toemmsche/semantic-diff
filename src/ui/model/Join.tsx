import {PlanData} from "./PlanData";
import {Box, Stack} from "@mui/material";
import {getJoinSymbolForType} from "../Chars";
import React from "react";


export enum JoinType {
    HASH_JOIN = "hash",
    NESTED_LOOP_JOIN = "nl",
    BLOCKWISE_NESTED_LOOP_JOIN = "bnl",
    SORT_MERGE_JOIN = "merge",
    INDEX_JOIN = "indexnl"
}

export function RenderJoin(props: { data: Join }) {
    const {data: joinData} = props;

    let joinName = "JOIN";
    switch (joinData.method) {
        case JoinType.INDEX_JOIN:
            joinName = "INDEX NL JOIN";
            break;
        case JoinType.HASH_JOIN:
            joinName = "HASH JOIN";
            break;
        case JoinType.NESTED_LOOP_JOIN:
            joinName = "NL JOIN";
            break;
        case JoinType.BLOCKWISE_NESTED_LOOP_JOIN:
            joinName = "BLOCK NL JOIN";
            break;
    }
    return (<Box>
        <Stack direction="row"
               justifyContent="center"
               alignItems="center"
               spacing={1}>
            <Box>{getJoinSymbolForType(joinData.joinType)}</Box>
            <Box>{joinName}</Box>
        </Stack>
    </Box>)
}

export default class Join extends PlanData {

    public static LABEL = "Join";

    get joinType(): string {
        return this.attributes.get("type")!!;
    }

    component(): Function {
        return RenderJoin;
    }

    get method(): JoinType {
        return this.attributes.get("method")!! as JoinType;
    }
}