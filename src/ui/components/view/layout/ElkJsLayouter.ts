import { TreeLayoutOptions } from './ITreeLayoutOptions';
import { Operator } from '../../../model/operator/Operator';
import { Edge, Node } from 'reactflow';
import { default as ELK, ElkExtendedEdge, ElkNode } from 'elkjs';
import IAsyncLayouter from './IAsyncLayouter';

export default class ElkJsLayouter implements IAsyncLayouter {
  constructor(private elkAlgorithm: string) {}
  async treeLayout(
    nodes: Node<Operator>[],
    edges: Edge[],
    options: TreeLayoutOptions
  ): Promise<Node[]> {
    // transform nodes and edges into elk format
    const elkNodes: ElkNode[] = nodes.map((n) => ({
      id: n.id,
      width: n.width!!,
      height: n.height!!
    }));
    const elkEdges: ElkExtendedEdge[] = edges.map((e) => ({
      id: e.id,
      sources: [e.source],
      targets: [e.target]
    }));
    const graph = {
      id: 'root',
      layoutOptions: {
        'elk.algorithm': this.elkAlgorithm,
        'elk.spacing.nodeNode': options.nodeSep.toString(),
        'spacing.nodeNodeBetweenLayers': options.rankSep.toString(),
        'elk.direction': 'DOWN'
      },
      children: elkNodes,
      edges: elkEdges
    };

    const elk = new ELK();
    return elk.layout(graph).then((root) => {
      root.children!!.forEach(
        (elkNode, i) =>
          (nodes[i].position = {
            x: elkNode.x!!,
            y: elkNode.y!!
          })
      );
      return nodes;
    });
  }
}
