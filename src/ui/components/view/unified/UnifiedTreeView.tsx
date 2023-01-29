import React, {useEffect, useMemo, useState} from 'react';
import ReactFlow, {ReactFlowProvider, useEdgesState} from 'reactflow';
import 'reactflow/dist/style.css';
import {PlanNode} from "../../../model/PlanData";
import RefreshLayout from "../layout/RefreshLayout";
import useAnimatedNodes from "../../useAnimatedNodes";
import UnifiedDiffPlanNode from "./UnifiedDiffPlanNode";
import Legend from "../../Legend";
import CustomUnifiedEdge, {ICustomUnifiedEdgeData} from './CustomUnifiedEdge';
import {LayoutAlgorithm, useParameterState} from "../../../data/Store";
import DefaultNormalizer from "../normalize/DefaultNormalizer";
import {defaultTreeLayoutOptions} from "../layout/ITreeLayoutOptions";
import {NODE_HEIGHT, NODE_WIDTH} from "../diff/TwoWayDiffPlanNode";
import D3HierarchyLayouter from "../layout/D3HierarchyLayouter";
import DagreLayouter from "../layout/DagreLayouter";
import ElkJsLayouter from "../layout/ElkJsLayouter";


export interface IUnifiedTreeViewProps {
    unifiedTree: PlanNode
}

export default function UnifiedTreeView(props: IUnifiedTreeViewProps) {
    return <ReactFlowProvider><UnifiedTreeFlow {...props}></UnifiedTreeFlow></ReactFlowProvider>
}

export function UnifiedTreeFlow(props: IUnifiedTreeViewProps) {
    const {
        unifiedTree,
    } = props;

    const [parameters] = useParameterState();

    const {
        hideNodes,
        layoutAlgorithm
    } = parameters;

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

        const [normalizedNodes, normalizedEdges] = new DefaultNormalizer().normalize(unifiedTree, 0, {
            filter: (planNode: PlanNode) => expandedNodes.some(pn => pn === planNode),
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
            },
        });

        // Adjust length and width
        normalizedNodes.forEach(n => {
            n.width = NODE_WIDTH;
            n.height = NODE_HEIGHT;
        });

        let layouter;
        switch (parameters.layoutAlgorithm) {
            case LayoutAlgorithm.DAGRE:
                layouter = new DagreLayouter();
                break;
            case LayoutAlgorithm.D3_HIERARCHY:
                layouter = new D3HierarchyLayouter();
                break;
            case LayoutAlgorithm.ELK_JS:
                layouter = new ElkJsLayouter();
                break;
        }

        const layoutedNodes = layouter.treeLayout(normalizedNodes, normalizedEdges, defaultTreeLayoutOptions);
        if (layoutedNodes instanceof Promise) {
            // async layouter
            layoutedNodes.then(ln => {
                setNodes(ln);
                setEdges(normalizedEdges);
                console.log(`Rendered ${ln.length} nodes and ${normalizedEdges.length} edges`);
            });
        } else {
            // blocking layouter
            setNodes(layoutedNodes);
            setEdges(normalizedEdges);
            console.log(`Rendered ${layoutedNodes.length} nodes and ${normalizedEdges.length} edges`);
        }
    }, [props, expandedNodes, parameters.layoutAlgorithm])

    return (<>
        <RefreshLayout nodeSetter={setNodes}></RefreshLayout>
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
