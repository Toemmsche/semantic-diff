import {PlanData} from "./PlanData";
import {Box, Stack} from "@mui/material";
import {UTF8_INNER_JOIN} from "../Chars";
import React from "react";


export enum JoinType {
    HASH_JOIN = "hash", NESTED_LOOP_JOIN = "nl",

    SORT_MERGE_JOIN = "merge",

    INDEX_JOIN = "indexnl"
}

export function RenderJoin (props: { data: Join }) {
    const {data: joinData} = props;

    let joinName = "JOIN";
    if (joinData.method === JoinType.INDEX_JOIN) {
        joinName = "INDEX NL JOIN"
    } else if (joinData.method === JoinType.HASH_JOIN) {
        joinName = "HASH JOIN"
    } else if (joinData.method === JoinType.NESTED_LOOP_JOIN) {
        joinName = "NL JOIN"
    }
    return (<Box>
        <Stack direction="row"
               justifyContent="center"
               alignItems="center"
               spacing={1}>
            <Box>{UTF8_INNER_JOIN}</Box>
            <Box>{joinName}</Box>
        </Stack>
    </Box>)
}

export default class Join extends PlanData {

    public static LABEL = "Join";

    get joinType (): string {
        const type = this.attributes.get("type")!!;
        /*
         if (! (<any> Object).values(JoinType).includes(type)) {
         throw new Error("Unknown join type " + type);
         }

         */
        return type;
    }

    component (): Function {
        return RenderJoin;
    }

    get method (): JoinType {
        return this.attributes.get("method")!! as JoinType;
    }
}