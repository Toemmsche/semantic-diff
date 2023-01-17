import React, {useEffect, useMemo, useState} from 'react';
import ReactFlow, {useEdgesState} from 'reactflow';
import 'reactflow/dist/style.css';
import {PlanNode} from "../../../model/PlanData";
import NodeLayouter from "../NodeLayouter";
import StaticNormalizerAndLayouter from "../StaticNormalizerAndLayouter";
import useAnimatedNodes from "../../useAnimatedNodes";
import UnifiedDiffPlanNode from "./UnifiedDiffPlanNode";
import {defaultTreeLayoutOptions} from "../DynamicLayouter";
import Legend from "../../Legend";
import CustomUnifiedEdge, {ICustomUnifiedEdgeData} from './CustomUnifiedEdge';
import {Origin} from "../../../../semantic-diff/delta/UnifiedTreeGenerator";


export interface IUnifiedTreeViewProps {
    unifiedTree: PlanNode,

    hideNodes: boolean
}

export default function UnifiedTreeView (props: IUnifiedTreeViewProps) {
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
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);


    useEffect(() => {
        if (hideNodes) {
            setExpandedNodes([unifiedTree]);
        } else {
            setExpandedNodes(unifiedTree.toPreOrderUnique());
        }
    }, [props])

    useEffect(() => {
        console.log("Unifiedtree", unifiedTree)

        const [allNodes, allEdges] = StaticNormalizerAndLayouter.dagreTreeLayout(
            unifiedTree, 0,
            (planNode) => expandedNodes.some(pn => pn === planNode), {
                computeData: (planNode: PlanNode) => {
                    return {
                        hide: () => {
                            // all descendants
                            const descendants = new Set(planNode.toPreOrderUnique());
                            descendants.delete(planNode);
                            setExpandedNodes(expandedNodes.filter(n => !descendants.has(n)));
                        },
                        expand: () => {
                            setExpandedNodes([
                                ...expandedNodes, // TODO what about duplicates
                                ...planNode.children
                            ])
                        },
                        planNode: planNode
                    }
                },
                computeEdgeData: (parentPlanNode: PlanNode,
                    childPlanNode: PlanNode) => {
                    return {
                        childPlanNode: childPlanNode,
                    } as ICustomUnifiedEdgeData
                }, ...defaultTreeLayoutOptions
            });

        setNodes(allNodes);
        setEdges(allEdges);

        console.log(
            `Rendered ${allNodes.length} nodes and ${allEdges.length} edges`);
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
