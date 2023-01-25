import React, {useEffect, useMemo} from 'react';
import ReactFlow, {ReactFlowProvider, useEdgesState, useNodesState} from 'reactflow';
import 'reactflow/dist/style.css';
import DefaultNormalizer from "../normalize_layout/DefaultNormalizer";
import CustomEdge from "../../edges/CustomEdge";
import TwoWayDiffPlanNode from "./TwoWayDiffPlanNode";
import RefreshLayout from "../normalize_layout/RefreshLayout";
import {PlanNode} from "../../../model/PlanData";
import DagreLayouter from "../normalize_layout/DagreLayouter";
import {defaultNormalizeOptions} from "../normalize_layout/INormalizeOptions";
import {defaultTreeLayoutOptions} from "../normalize_layout/ITreeLayoutOptions";


export interface ITwoWayDiffViewProps {
    firstPlan: PlanNode,
    secondPlan: PlanNode
}

export default function TwoWayDiffView(props: ITwoWayDiffViewProps) {
    return <ReactFlowProvider><TwoWayDiffFlow{...props}></TwoWayDiffFlow></ReactFlowProvider>
}

export function TwoWayDiffFlow(props: ITwoWayDiffViewProps) {
    const {
        firstPlan,
        secondPlan
    } = props;

    const nodeTypes = useMemo(() => ({
        customNode: TwoWayDiffPlanNode
    }), []);

    const edgeTypes = useMemo(() => ({
        customEdge: CustomEdge
    }), []);

    // empty initial state
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    useEffect(() => {
        // first plan
        let [normalizedFirstNodes, normalizedFirstEdges] = new DefaultNormalizer().normalize(firstPlan, 1, {
            ...defaultNormalizeOptions,
            computeData: (planNode: PlanNode) => {
                return {
                    firstPlanData: planNode.data,
                    secondPlanData: planNode.isMatched() ? planNode.getMatch().data : null,

                }
            },
        });
        // second plan
        let [normalizedSecondNodes, normalizedSecondEdges] = new DefaultNormalizer().normalize(secondPlan, 2, {
            ...defaultNormalizeOptions,
            computeData: (planNode: PlanNode) => {
                return {
                    firstPlanData: planNode.isMatched() ? planNode.getMatch().data : null,
                    secondPlanData: planNode.data
                }
            },
        });

        const allNodes = normalizedFirstNodes.concat(normalizedSecondNodes);
        const allEdges = normalizedFirstEdges.concat(normalizedSecondEdges);

        const layoutedNodes = new DagreLayouter().treeLayout(allNodes, edges, defaultTreeLayoutOptions);

        setNodes(layoutedNodes);
        setEdges(allEdges);

        console.log(`Rendered ${layoutedNodes.length} nodes and ${allEdges.length} edges`, layoutedNodes, allEdges)
    }, [props]);


    /*
    useEffect(() => {

        console.log("render effect");

        const matchEdgeId = "hoverMatchEdge";

        if (renderState.hoveredData.length === 0) {
            // remote edge
            setEdges((eds) => eds.filter(e => e.id !== matchEdgeId))
        }

        if (!state.showMatches || renderState.hoveredData.length !== 2 || edges.some(
            e => e.id === matchEdgeId)) {
            return;
        }

        // Add edge between matches
        const firstId = nodes.filter(n => n.data === renderState.hoveredData[0])[0].id;
        const secondId = nodes.filter(n => n.data === renderState.hoveredData[1])[0].id;

        setEdges((eds) => eds.concat([
                                         {
                                             id: matchEdgeId,
                                             source: firstId,
                                             target: secondId
                                         }
                                     ]));

    }, [renderState.hoveredData])
    */


    console.log("refresh");

    return (<>
        <RefreshLayout nodeSetter={setNodes}></RefreshLayout>
        <ReactFlow
            style={{flexGrow: 1}}
            zoomOnScroll={false}
            nodes={nodes}
            edges={edges}
            fitView
            // @ts-ignore
            nodeTypes={nodeTypes}
            // @ts-ignore
            edgeTypes={edgeTypes}
        >
        </ReactFlow>
    </>);
}
