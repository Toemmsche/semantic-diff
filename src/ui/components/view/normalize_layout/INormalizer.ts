import {PlanData, PlanNode} from "../../../model/PlanData";
import INormalizeOptions from "./INormalizeOptions";
import {Node, Edge} from "reactflow";

export default interface INormalizer {
    normalize(plan: PlanNode, planIndex: number, options: INormalizeOptions): [Node<PlanData>[], Edge[]];
}

