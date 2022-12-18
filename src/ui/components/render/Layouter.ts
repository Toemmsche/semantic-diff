import {Node, Edge} from "reactflow";
import dagre from "dagre";

export const LayoutDirection = {
    HORIZONTAL: "HORIZONTAL",
    VERTICAL: "VERTICAL",
} as const;

export type LayoutDirection = keyof typeof LayoutDirection

export interface LayoutOptions {
    // distance between nodes
    nodeSep: number
    direction: LayoutDirection
}

export interface TreeLayoutOptions extends LayoutOptions {
    rankSep: number
}

export default class Layouter {

    /**
     * Creates a tree layout from the given nodes and edges, which should represent a single rooted tree graph
     * @param nodes
     * @param edges
     * @param options
     */
    public static treeLayout(nodes: Node[], edges: Edge[], options?: TreeLayoutOptions) {
        const dagreGraphOptions: any = {}
        if (options) {
            dagreGraphOptions.nodesep = options.nodeSep;
            dagreGraphOptions.ranksep = options.rankSep;
            switch(options.direction) {
                case LayoutDirection.HORIZONTAL: dagreGraphOptions.rankdir = "LR"; break;
                case LayoutDirection.VERTICAL: dagreGraphOptions.rankdir = "TB"; break;
            }
        }
        const dagreGraph = new dagre.graphlib.Graph().setGraph(dagreGraphOptions)

        nodes.forEach(node => {
            // passing an empty object as label is ESSENTIAL
            dagreGraph.setNode(node.id, {});
        });

        edges.forEach(edge => {
            // passing an empty object as label is ESSENTIAL
            dagreGraph.setEdge(edge.source, edge.target, {});
        });

        dagre.layout(dagreGraph);

        nodes.forEach((node) => {
            const dagreNode = dagreGraph.node(node.id);

            const x = dagreNode.x;
            const y = dagreNode.y;

            node.position = {x, y};
        });
    }
}