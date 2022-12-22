import {PlanNode} from "./PlanData";
import {DBMS} from "./DBMS";


/**
 * Wrapper for query plan trees with additional metadata
 */
export default class QueryPlan {
    id: string = window.crypto.randomUUID()
    constructor(public root: PlanNode,
                public dbms: DBMS) {

    }
}