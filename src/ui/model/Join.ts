import {PlanData} from "./PlanData";
import RenderJoin from "../components/nodes/RenderJoin";


export enum JoinType {
    HASH_JOIN = "hash",
    NESTED_LOOP_JOIN = "nl",

    SORT_MERGE_JOIN = "merge",

    INDEX_JOIN = "indexnl"
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
}