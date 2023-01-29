import {Edge, Node} from "reactflow";
import {PlanData} from "../../../model/PlanData";
import {TreeLayoutOptions} from "./ITreeLayoutOptions";

export default interface IAsyncLayouter {
    treeLayout(nodes: Node<PlanData>[], edges: Edge[], options: TreeLayoutOptions): Promise<Node[]>;
}
