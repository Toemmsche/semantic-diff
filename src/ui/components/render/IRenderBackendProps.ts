import {PlanNode} from "../model/PlanNode";

export default interface IRenderBackendProps {
    /** Result node with children */
    rootElement: PlanNode;
}