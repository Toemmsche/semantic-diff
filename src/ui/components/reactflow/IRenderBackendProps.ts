import {PlanData, PlanNode} from "../../model/PlanData";
import {TNode} from "../../../semantic-diff";
import QueryPlan from "../../model/QueryPlan";

export default interface IRenderBackendProps {
    /** Result node with children */
    firstPlan: QueryPlan;

    secondPlan: QueryPlan
}