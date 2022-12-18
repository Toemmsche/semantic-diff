import {Edge, Node} from "reactflow";
import {TNode} from "../../../semantic-diff";
import {PlanNode} from "../model/PlanData";

export default class PlanNormalizer {
    public static normalize(root: PlanNode): [Node<{ label: string }>[], Edge[]] {

        const nodes: Node<{ label: string }>[] = [];
        const edges: Edge[] = [];

        function recNormalize(tNode: PlanNode) {
            // transform node
            nodes.push({
                id: tNode.data.operatorId,
                type: "renderPlanNode",
                data: tNode.data,
                // placeholder position, should be overwritten by layouter
                position: {x: 0, y: 0}
            });
            tNode.children.forEach(child => {
                recNormalize(child);
                edges.push({
                    id: "e" + tNode.data.operatorId + "-" + child.data.operatorId,
                    source: tNode.data.operatorId,
                    target: child.data.operatorId
                })
            });
        }

        recNormalize(root);
        return [nodes, edges]
    }

}