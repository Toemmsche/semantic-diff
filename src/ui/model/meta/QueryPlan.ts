import {PlanNode} from "../PlanData";
import {DBMS} from "./DBMS";
import {Dataset} from "./Dataset";
import {Nullable} from "../../../semantic-diff/Types";


/**
 * Wrapper for query plan trees with additional metadata
 */
export default class QueryPlan {
    id: string = window.crypto.randomUUID()

    constructor (public root: PlanNode,
                 public dbms: DBMS,
                 public dataset: Dataset,
                 public query_name: string,
                 public query_text: string,
                 public runtime: Nullable<number>,
                 public compilationTime: Nullable<number>) {

    }
}