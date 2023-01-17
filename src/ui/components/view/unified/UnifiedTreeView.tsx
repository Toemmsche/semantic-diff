import React, {useEffect, useMemo, useState} from 'react';
import ReactFlow, {Edge, ReactFlowProvider, useEdgesState} from 'reactflow';
import 'reactflow/dist/style.css';
import {PlanNode} from "../../../model/PlanData";
import NodeLayouter from "../NodeLayouter";
import StaticNormalizerAndLayouter from "../StaticNormalizerAndLayouter";
import useAnimatedNodes from "../../useAnimatedNodes";
import UnifiedDiffPlanNode from "./UnifiedDiffPlanNode";
import {defaultTreeLayoutOptions} from "../DynamicLayouter";
import Legend from "../../Legend";
import CustomUnifiedEdge, {ICustomUnifiedEdgeData} from './CustomUnifiedEdge';


export interface IUnifiedTreeViewProps {
    unifiedTree: PlanNode,

    hideNodes: boolean
}

export default function UnifiedTreeView(props: IUnifiedTreeViewProps) {
    return <ReactFlowProvider><UnifiedTreeFlow {...props}></UnifiedTreeFlow></ReactFlowProvider>
}

export function UnifiedTreeFlow(props: IUnifiedTreeViewProps) {
    const {
        unifiedTree,
        hideNodes
    } = props;

    const nodeTypes = useMemo(() => ({
        customNode: UnifiedDiffPlanNode
    }), []);

    // @ts-ignore
    const edgeTypes = useMemo(() => ({
        customEdge: CustomUnifiedEdge
    }), []);

    const [expandedNodes, setExpandedNodes] = useState([] as PlanNode[]);

    // empty initial state
    const [nodes, setNodes] = useAnimatedNodes([])
    const [edges, setEdges] = useEdgesState([]);


    useEffect(() => {
        if (hideNodes) {
            setExpandedNodes([unifiedTree]);
        } else {
            setExpandedNodes(unifiedTree.toPreOrderUnique());
        }
    }, [props])

    useEffect(() => {
        console.log("Unifiedtree", unifiedTree)

        const [allNodes, allEdges] = StaticNormalizerAndLayouter.dagreTreeLayout(unifiedTree, 0, (planNode) => expandedNodes.some(pn => pn === planNode), {
            computeData: (planNode: PlanNode) => {
                return {
                    hide: () => {
                        // all descendants
                        const descendants = new Set(planNode.toPreOrderUnique());
                        descendants.delete(planNode);
                        setExpandedNodes(expandedNodes.filter(n => !descendants.has(n)));
                    },
                    expand: () => {
                        setExpandedNodes([...expandedNodes, // TODO what about duplicates
                            ...planNode.children])
                    },
                    planNode: planNode
                }
            },
            computeEdgeData: (parentPlanNode: PlanNode, childPlanNode: PlanNode) => {
                return {
                    childPlanNode: childPlanNode,
                    parentPlanNode: parentPlanNode
                } as ICustomUnifiedEdgeData
            }, ...defaultTreeLayoutOptions
        });

        setNodes(allNodes);
        setEdges(allEdges);

        console.log(`Rendered ${allNodes.length} nodes and ${allEdges.length} edges`);
    }, [props, expandedNodes])

    return (<>
        <NodeLayouter nodeSetter={setNodes}></NodeLayouter>
        <ReactFlow
            zoomOnScroll={false}
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            // @ts-ignore
            edgeTypes={edgeTypes}
        >
        </ReactFlow>
        <Legend></Legend>
    </>);
}
