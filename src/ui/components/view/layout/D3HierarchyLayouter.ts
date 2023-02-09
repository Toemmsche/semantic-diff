import IBlockingLayouter from './IBlockingLayouter';
import { PlanData } from '../../../model/operator/PlanData';
import { Edge, Node } from 'reactflow';
import { hierarchy as d3Hierarchy, tree as d3Tree } from 'd3-hierarchy';
import { TreeLayoutOptions } from './ITreeLayoutOptions';

export default class D3HierarchyLayouter implements IBlockingLayouter {
  treeLayout(nodes: Node<PlanData>[], edges: Edge<any>[], options: TreeLayoutOptions): Node<any>[] {
    // early return if there are no nodes to be layouted
    if (nodes.length === 0) {
      return nodes;
    }

    // D3-hierarchy would like a recursive tree structure, so we emulate it
    const childrenMap: Map<Node, Node[]> = new Map();
    const nodeMap: Map<string, Node> = new Map();
    for (const node of nodes) {
      childrenMap.set(node, []);
      nodeMap.set(node.id, node);
    }
    for (const edge of edges) {
      childrenMap.get(nodeMap.get(edge.source)!!)!!.push(nodeMap.get(edge.target)!!);
    }

    // We have to make the strong assumption that node 0 is the root node
    // This could be verified, but just trust it for now

    const root = nodes[0];
    const hierarchy = d3Hierarchy<Node>(root, (n) => childrenMap.get(n));

    const globalWidth = root.width!!;
    const globalHeight = root.height!!;

    const layout = d3Tree<Node>().nodeSize([2 * globalWidth, 3 * globalHeight]);

    const layoutedRoot = layout(hierarchy);

    layoutedRoot.descendants().map((d) => d.data);

    nodes = layoutedRoot.descendants().map((d) => {
      // since d3 uses constant widths and heights, we must shift by half the difference
      const nodeWidth = d.data.width!;
      const nodeHeight = d.data.height!;
      const x = d.x + (globalWidth - nodeWidth) / 2;
      const y = d.y + (globalHeight - nodeHeight) / 2;
      return {
        ...d.data,
        position: {
          x,
          y
        }
      };
    });
    return nodes;
  }
}
