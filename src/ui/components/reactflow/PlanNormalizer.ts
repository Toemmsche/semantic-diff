import {Edge, Node} from "reactflow";
import {PlanNode} from "../../model/PlanData";
import QueryPlan from "../../model/meta/QueryPlan";


export interface INormalizeOptions {
    computeDiffData: boolean
}

export default class PlanNormalizer {

    public static getMatchEdges (firstPlan: QueryPlan,
                                 secondPlan: QueryPlan): Edge[] {
        const matchEdges: Edge[] = [];

        function recAddMatchEdges (tNode: PlanNode) {
            if (tNode.isMatched()) {
                const match = tNode.getMatch();
                matchEdges.push({
                                    id: "e" + firstPlan.id + tNode.data.operatorId + "-" + secondPlan.id + match.data.operatorId,
                                    source: firstPlan.id + tNode.data.operatorId,
                                    target: secondPlan.id + match.data.operatorId
                                });
            }
            tNode.children.forEach((child) => recAddMatchEdges(child));
        }

        recAddMatchEdges(firstPlan.root);

        return matchEdges;
    }

    public static normalize (plan: QueryPlan,
                             options: INormalizeOptions): [Node[], Edge[]] {

        const nodes: Node[] = [];
        const edges: Edge[] = [];

        const nodeSet = new Set();

        function recNormalize (tNode: PlanNode) {
            if (nodeSet.has(tNode)) return

            nodeSet.add(tNode);

            // transform node
            const normalizedNode = {
                id: plan.id + tNode.data.operatorId,
                type: "diffPlanNode",
                data: tNode.data as any,
                // placeholder position, should be overwritten by layouter
                position: {x: 0, y: 0}
            };
            if (options.computeDiffData) {
                normalizedNode.data.diffState = tNode.getDiffState();
            }
            nodes.push(normalizedNode);
            tNode.children.forEach(child => {
                recNormalize(child);
                edges.push({
                               id: "e" + plan.id + tNode.data.operatorId + "-" + child.data.operatorId,
                               label: child.data.exactCardinality,
                               source: plan.id + tNode.data.operatorId,
                               target: plan.id + child.data.operatorId
                           })
            });
        }

        recNormalize(plan.root);
        return [nodes, edges]
    }

}