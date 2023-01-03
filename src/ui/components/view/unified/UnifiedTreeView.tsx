import React, {useEffect, useMemo, useState} from 'react';
import ReactFlow, {useEdgesState} from 'reactflow';
import 'reactflow/dist/style.css';
import {PlanNode} from "../../../model/PlanData";
import NodeLayouter from "../NodeLayouter";
import CustomEdge from '../../edges/CustomEdge';
import StaticNormalizerAndLayouter from "../StaticNormalizerAndLayouter";
import useAnimatedNodes from "../../useAnimatedNodes";
import UnifiedDiffPlanNode from "./UnifiedDiffPlanNode";
import {defaultTreeLayoutOptions} from "../DynamicLayouter";


export interface IUnifiedTreeViewProps {
    unifiedTree: PlanNode,

    hideNodes: boolean
}

export default function UnifiedTreeView (props: IUnifiedTreeViewProps) {
    const {unifiedTree, hideNodes} = props;

    const nodeTypes = useMemo(() => ({
        customNode: UnifiedDiffPlanNode
    }), []);

    // @ts-ignore
    const edgeTypes = useMemo(() => ({
        customEdge: CustomEdge
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
            unifiedTree,
            0,
            (planNode) => expandedNodes.some(pn => pn === planNode),
            {
                computeData: (planNode: PlanNode) => {
                    return {
                        hide: () => {
                        },
                        expand: () => {
                            setExpandedNodes([
                                                 ...expandedNodes,
                                                 ...planNode.children
                                             ])
                        },
                        firstPlanData: planNode.data,
                        secondPlanData: planNode.isMatched()
                            ? planNode.getMatch().data
                            : null,

                    }
                },
                ...defaultTreeLayoutOptions
            } as any);

        setNodes(allNodes);
        setEdges(allEdges);

        console.log(`Rendered ${allNodes.length} nodes and ${allEdges.length} edges`);
    }, [props, expandedNodes])

    return (
        <>
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
        </>
    );
}
