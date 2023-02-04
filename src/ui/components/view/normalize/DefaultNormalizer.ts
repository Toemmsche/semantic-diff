import { Edge, Node } from 'reactflow';
import { PlanData, PlanNode } from '../../../model/operator/PlanData';
import INormalizeOptions, { defaultNormalizeOptions } from './INormalizeOptions';
import INormalizer from './INormalizer';

export default class DefaultNormalizer implements INormalizer {
  public normalize(
    plan: PlanNode,
    planIndex: number,
    options: INormalizeOptions = defaultNormalizeOptions
  ): [Node<PlanData>[], Edge[]] {
    const nodes: Node[] = [];
    const edges: Edge[] = [];

    const nodeSet = new Set();

    function recNormalize(planNode: PlanNode) {
      if (nodeSet.has(planNode) || !options.filter(planNode)) return;
      nodeSet.add(planNode);
      const nodeId = `${planIndex}-${planNode.data.id}`;

      // transform node
      const normalizedNode = {
        id: nodeId,
        type: 'customNode',
        data: options.computeData(planNode)
      } as any;

      nodes.push(normalizedNode);

      planNode.children.filter(options.filter).forEach((child) => {
        const source = nodeId;
        const target = `${planIndex}-${child.data.id}`;
        const normalizedEdge = {
          source,
          target,
          id: `${planIndex}-${source}-${target}`,
          type: 'customEdge',
          data: options.computeEdgeData(planNode, child)
        };
        edges.push(normalizedEdge);

        // recurse
        recNormalize(child);
      });
    }

    recNormalize(plan);

    return [nodes, edges];
  }
}
