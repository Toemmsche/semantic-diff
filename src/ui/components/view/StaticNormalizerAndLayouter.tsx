import {Edge, Node} from "reactflow";
import dagre from "dagre";
import React from "react";
import {PlanNode} from "../../model/PlanData";
import {hierarchy as d3Hierarchy, tree as d3Tree} from 'd3-hierarchy';
import {defaultNormalizeOptions} from "./PlanNormalizer";
import {LayoutDirection, TreeLayoutOptions} from "./DynamicLayouter";
import {NODE_HEIGHT, NODE_WIDTH} from "./diff/TwoWayDiffPlanNode";

export interface IStaticNormalizeOptions {
    computeData: (planNode: PlanNode) => any;
}

export default class StaticNormalizerAndLayouter {

    public static dagreTreeLayout (plan: PlanNode,
                                   planIndex: number,
                                   filter: (planNode: PlanNode) => boolean,
                                   options: IStaticNormalizeOptions & TreeLayoutOptions = defaultNormalizeOptions as any):
        [Node[], Edge[]] {


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


        const nodes: Node[] = [];
        const edges: Edge[] = [];

        const nodeSet = new Set();

        function recNormalize (planNode: PlanNode) {
            if (nodeSet.has(planNode) || !filter(planNode)) return;

            nodeSet.add(planNode);

            const nodeId = `${planIndex}-${planNode.data.operatorId}`;

            // transform node
            const normalizedNode = {
                id: nodeId,
                type: "customNode",
            } as any;

            normalizedNode.data = options.computeData(planNode);
            nodes.push(normalizedNode);

            // DAGRE equivalent
            // passing an empty object as label is ESSENTIAL
            const label: any = {
                width: NODE_WIDTH,
                height: NODE_HEIGHT
            }
            dagreGraph.setNode(nodeId, label);

            planNode.children.filter(filter).forEach(child => {
                const source = nodeId;
                const target = `${planIndex}-${child.data.operatorId}`
                const normalizedEdge = {
                    source,
                    target,
                    id: `${planIndex}-${source}-${target}`,
                    type: "customEdge",
                    data: {
                        parentPlanData: planNode.data,
                        childPlanData: child.data
                    }
                }
                edges.push(normalizedEdge);

                // DAGRE equivalent
                dagreGraph.setEdge(source, target, {});

                // recurse
                recNormalize(child);
            });
        }

        recNormalize(plan);

        dagre.layout(dagreGraph);

        const layoutedNodes = nodes.map((node) => {
            const dagreNode = dagreGraph.node(node.id);

            const x = dagreNode.x + options.globalXOffset - NODE_WIDTH / 2;
            const y = dagreNode.y - NODE_HEIGHT / 2;

            return {
                ...node,
                position: {x, y}
            }
        });

        return [layoutedNodes, edges]
    }


    public static d3TreeLayout (plan: PlanNode, planIndex: number,
                                filter: (planNode: PlanNode) => boolean,
                                options: IStaticNormalizeOptions & TreeLayoutOptions = defaultNormalizeOptions as any):
        [Node[], Edge[]] {

        const hierarchy = d3Hierarchy<PlanNode>(plan,
                                                (planNode) => planNode.children.filter(
                                                    filter));
        const layout = d3Tree<PlanNode>().nodeSize([100, 100]);

        const root = layout(hierarchy);

        const nodes: Node[] = root.descendants().map(d => {
            const planNode = d.data;

            // transform node
            const normalizedNode = {
                id: `${planIndex}-${planNode.data.operatorId}`,
                type: "customNode",
                position: {x: d.x, y: d.y}
            } as any;

            normalizedNode.data = options.computeData(planNode);
            return normalizedNode;
        });
        const edges: Edge[] = root.links().map((d, i) => {
            const sourcePlanData = d.source.data.data;
            const targetPlanData = d.target.data.data;
            return {
                id: `${planIndex}-${i}`,
                type: "customEdge",
                source: `${planIndex}-${sourcePlanData.operatorId}`,
                target: `${planIndex}-${targetPlanData.operatorId}`,
                data: {
                    parentPlanData: sourcePlanData,
                    childPlanData: targetPlanData
                }
            }
        });

        return [nodes, edges];
    }
}