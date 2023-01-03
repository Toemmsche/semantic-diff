import {Edge, Node} from "reactflow";
import dagre from "dagre";
import React from "react";
import {PlanData} from "../../model/PlanData";
import {NODE_HEIGHT, NODE_WIDTH} from "./diff/TwoWayDiffPlanNode";

export const LayoutDirection = {
    HORIZONTAL: "HORIZONTAL",
    VERTICAL: "VERTICAL",
} as const;

export type LayoutDirection = keyof typeof LayoutDirection

export interface LayoutOptions {
    // distance between nodes
    nodeSep: number
    direction: LayoutDirection,
    globalXOffset: number,
    withActualDimensions: boolean
}

export interface TreeLayoutOptions extends LayoutOptions {
    rankSep: number
}

export const defaultTreeLayoutOptions = {
    rankSep: 100,
    nodeSep: 100,
    direction: LayoutDirection.VERTICAL,
    globalXOffset: 0,
    withActualDimensions: false,
}

export default class DynamicLayouter {

    /**
     * Creates a tree layout from the given nodes and edges, which should represent a single rooted tree graph
     * @param nodes
     * @param edges
     * @param options
     */
    public static treeLayout (nodes: Node<PlanData>[],
                              edges: Edge[],
                              options: TreeLayoutOptions): Node[] {
        const dagreGraphOptions: any = {
            nodesep: options.nodeSep,
            ranksep: options.rankSep,
        }
        switch (options.direction) {
            case LayoutDirection.HORIZONTAL:
                dagreGraphOptions.rankdir = "LR";
                break;
            case LayoutDirection.VERTICAL:
                dagreGraphOptions.rankdir = "TB";
                break;
        }
        const dagreGraph = new dagre.graphlib.Graph().setGraph(dagreGraphOptions)

        nodes.forEach(node => {
            // passing an empty object as label is ESSENTIAL
            const label: any = {};
            if (options.withActualDimensions) {
                label.width = node.width;
                label.height = node.height;
            } else {
                label.width = NODE_WIDTH;
                label.height = NODE_HEIGHT;
            }
            dagreGraph.setNode(node.id, label);
        });

        edges.forEach(edge => {
            // passing an empty object as label is ESSENTIAL
            dagreGraph.setEdge(edge.source, edge.target, {});
        });

        dagre.layout(dagreGraph);

        return nodes.map((node) => {
            const dagreNode = dagreGraph.node(node.id);

            const nodeWidth = options.withActualDimensions
                ? node.width!!
                : NODE_WIDTH;
            const nodeHeight = options.withActualDimensions
                ? node.height!!
                : NODE_HEIGHT;

            const x = dagreNode.x + options.globalXOffset - nodeWidth / 2;
            const y = dagreNode.y - nodeHeight / 2;

            return {
                ...node,
                position: {x, y}
            }
        })
    }
}