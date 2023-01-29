import {Edge, Node} from "reactflow";
import {PlanData} from "../../../model/PlanData";
import {TreeLayoutOptions} from "./ITreeLayoutOptions";

export default interface ITreeLayouter {
    treeLayout(nodes: Node<PlanData>[], edges: Edge[], options: TreeLayoutOptions): Node[];
}