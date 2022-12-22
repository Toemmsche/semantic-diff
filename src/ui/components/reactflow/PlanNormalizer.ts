import {Edge, Node} from "reactflow";
import {PlanNode} from "../../model/PlanData";
import QueryPlan from "../../model/QueryPlan";

export default class PlanNormalizer {
    public static normalize(plan: QueryPlan): [Node<{ label: string }>[], Edge[]] {

        const nodes: Node<{ label: string }>[] = [];
        const edges: Edge[] = [];

        function recNormalize(tNode: PlanNode) {
            // transform node
            nodes.push({
                id: plan.id + tNode.data.operatorId,
                type: tNode.data.componentName(),
                data: tNode.data,
                // placeholder position, should be overwritten by layouter
                position: {x: 0, y: 0}
            });
            tNode.children.forEach(child => {
                recNormalize(child);
                edges.push({
                    id: "e" + plan.id + tNode.data.operatorId + "-" + child.data.operatorId,
                    label:  child.data.exactCardinality,
                    source: plan.id + tNode.data.operatorId,
                    target: plan.id + child.data.operatorId
                })
            });
        }

        recNormalize(plan.root);
        return [nodes, edges]
    }

}