import { Edge, Node } from 'reactflow';
import { PlanNode } from '../../model/PlanData';

export interface INormalizeOptions {
  computeData: (planNode: PlanNode, flowNode: Node, flowNodes: Node[], flowEdges: Edge[]) => any;
}

export const defaultNormalizeOptions = {
  computeData: (planNode: PlanNode, flowNode: Node, nodes: Node[], flowEdges: Edge[]) => {
    return planNode.data;
  }
};

export default class PlanNormalizer {
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

  public static normalize(
    plan: PlanNode,
    planIndex: number,
    options: INormalizeOptions = defaultNormalizeOptions
  ): [Node[], Edge[]] {
    const nodes: Node[] = [];
    const edges: Edge[] = [];

    const nodeSet = new Set();

    function recNormalize(tNode: PlanNode) {
      if (nodeSet.has(tNode)) return;

      nodeSet.add(tNode);

      // transform node
      const normalizedNode = {
        id: planIndex + tNode.data.operatorId,
        type: 'customNode',

        // placeholder position, should be overwritten by layouter
        position: { x: 0, y: 0 }
      } as any;
      normalizedNode.data = options.computeData(tNode, normalizedNode, nodes, edges);
      nodes.push(normalizedNode);
      tNode.children.forEach((child) => {
        recNormalize(child);
        edges.push({
          id: 'e' + planIndex + tNode.data.operatorId + '-' + child.data.operatorId,
          type: 'customEdge',
          label: child.data.exactCardinality,
          source: planIndex + tNode.data.operatorId,
          target: planIndex + child.data.operatorId,
          data: {
            parentPlanData: tNode.data,
            childPlanData: child.data
          }
        });
      });
    }

    recNormalize(plan);
    return [nodes, edges];
  }
}
