import {PlanData} from "../model/PlanNode";
import {TNode} from "../../../semantic-diff";

export default interface IRenderBackendProps {
    /** Result node with children */
    rootElement: TNode<PlanData>;
}