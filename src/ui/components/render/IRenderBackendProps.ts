import {PlanData, PlanNode} from "../model/PlanData";
import {TNode} from "../../../semantic-diff";

export default interface IRenderBackendProps {
    /** Result node with children */
    firstPlan: PlanNode;

    secondPlan: PlanNode
}