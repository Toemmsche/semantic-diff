import {Edge, Node} from 'reactflow';
import {PlanData, PlanNode} from '../../../model/PlanData';
import dagre from "dagre";
import {NODE_HEIGHT, NODE_WIDTH} from "../diff/TwoWayDiffPlanNode";
import INormalizeOptions, {defaultNormalizeOptions} from "./INormalizeOptions";
import INormalizer from "./INormalizer";


export default class DefaultNormalizer implements INormalizer {
    public static getMatchEdges(firstPlan: PlanNode, secondPlan: PlanNode): Edge[] {
        const matchEdges: Edge[] = [];

        function recAddMatchEdges(tNode: PlanNode) {
            if (tNode.isMatched()) {
                const match = tNode.getMatch();
                matchEdges.push({
                    id: 'e' + 1 + tNode.data.operatorId + '-' + 2 + match.data.operatorId,
                    source: 1 + tNode.data.operatorId,
                    target: 2 + match.data.operatorId
                });
            }
            tNode.children.forEach((child) => recAddMatchEdges(child));
        }

        recAddMatchEdges(firstPlan);

        return matchEdges;
    }

    public normalize(plan: PlanNode, planIndex: number, options: INormalizeOptions = defaultNormalizeOptions): [Node<PlanData>[], Edge[]] {
        const nodes: Node[] = [];
        const edges: Edge[] = [];

        const nodeSet = new Set();

        function recNormalize(planNode: PlanNode) {
            console.log(planNode, options.filter(planNode))
            if (nodeSet.has(planNode) || !options.filter(planNode)) return;

            nodeSet.add(planNode);



            const nodeId = `${planIndex}-${planNode.data.operatorId}`;

            // transform node
            const normalizedNode = {
                id: nodeId,
                type: "customNode",
                data: options.computeData(planNode),
            } as any;

            nodes.push(normalizedNode);

            planNode.children.filter(options.filter).forEach(child => {
                const source = nodeId;
                const target = `${planIndex}-${child.data.operatorId}`
                const normalizedEdge = {
                    source,
                    target,
                    id: `${planIndex}-${source}-${target}`,
                    type: "customEdge",
                    data: options.computeEdgeData(planNode, child)
                }
                edges.push(normalizedEdge);

                // recurse
                recNormalize(child);
            });
        }

        recNormalize(plan);

        return [nodes, edges]
    }


}
