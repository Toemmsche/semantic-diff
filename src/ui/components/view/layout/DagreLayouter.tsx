import { Edge, Node } from 'reactflow';
import dagre from 'dagre';
import React from 'react';
import { PlanData } from '../../../model/operator/PlanData';
import IBlockingLayouter from './IBlockingLayouter';
import { LayoutDirection, TreeLayoutOptions } from './ITreeLayoutOptions';

export default class DagreLayouter implements IBlockingLayouter {
  /**
   * Creates a tree layout from the given nodes and edges, which should represent a single rooted tree graph
   * @param nodes
   * @param edges
   * @param options
   */
  public treeLayout(nodes: Node<PlanData>[], edges: Edge[], options: TreeLayoutOptions): Node[] {
    const dagreGraphOptions: any = {
      nodesep: options.nodeSep,
      ranksep: options.rankSep
    };
    switch (options.direction) {
      case LayoutDirection.HORIZONTAL:
        dagreGraphOptions.rankdir = 'LR';
        break;
      case LayoutDirection.VERTICAL:
        dagreGraphOptions.rankdir = 'TB';
        break;
    }
    const dagreGraph = new dagre.graphlib.Graph().setGraph(dagreGraphOptions);

    nodes.forEach((node) => {
      // passing an empty object as label is ESSENTIAL
      const label: any = {};

      // copy node width and height
      // TODO determine where to set these in case of default
      label.width = node.width;
      label.height = node.height;

      dagreGraph.setNode(node.id, label);
    });

    edges.forEach((edge) => {
      // passing an empty object as label is ESSENTIAL
      dagreGraph.setEdge(edge.source, edge.target, {});
    });

    dagre.layout(dagreGraph);

    return nodes.map((node) => {
      const dagreNode = dagreGraph.node(node.id);

      const nodeWidth = node.width!!;
      const nodeHeight = node.height!!;

      const x = dagreNode.x - nodeWidth / 2;
      const y = dagreNode.y - nodeHeight / 2;

      return {
        ...node,
        position: {
          x,
          y
        }
      };
    });
  }
}
