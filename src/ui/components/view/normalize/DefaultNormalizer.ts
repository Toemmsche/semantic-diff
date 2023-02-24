import { Edge, Node } from 'reactflow';
import { Operator, PlanNode } from '../../../model/operator/Operator';
import INormalizeOptions, { defaultNormalizeOptions } from './INormalizeOptions';
import INormalizer from './INormalizer';

export default class DefaultNormalizer implements INormalizer {
  public normalize(
    plan: PlanNode,
    planIndex: number,
    dimensions: Map<PlanNode, [number, number]>,
    options: INormalizeOptions = defaultNormalizeOptions
  ): [Node<Operator>[], Edge[]] {
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
      } as Partial<Node>;

      [normalizedNode.width, normalizedNode.height] = dimensions.get(planNode)!;

      nodes.push(normalizedNode as Node);

      planNode.children.filter(options.filter).forEach((child, i) => {
        const source = nodeId;
        const target = `${planIndex}-${child.data.id}`;
        const normalizedEdge = {
          source,
          target,
          id: `${planIndex}-${source}-${target}`,
          type: 'customEdge',
          data: options.computeEdgeData(planNode, child),
          targetHandle: 'topHandle',
          sourceHandle: 'bottomHandle'
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
