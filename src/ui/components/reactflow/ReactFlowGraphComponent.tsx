import React, {useEffect, useMemo} from 'react';
import {useCallback} from 'react';
import ReactFlow, {
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
    Connection,
    Edge,
} from 'reactflow';
import 'reactflow/dist/style.css';

import IRenderBackendProps from "./IRenderBackendProps";
import ReactFlowNormalizer from "./PlanNormalizer";
import PlanNormalizer from "./PlanNormalizer";
import Layouter, {LayoutDirection} from "./Layouter";
import RenderPlanNode from "./RenderPlanNode";
import RenderTableScan from "./RenderTableScan";

// @ts-ignore
import s from './GraphComponent.module.scss'
import CustomEdge from "./CustomEdge";
import {useGlobalState} from "../../state/Store";
import {queryPlanFromXml} from "../../util";

export default function ReactFlowGraphComponent(props: { }) {
    const [state, actions] = useGlobalState();

    const firstPlan = queryPlanFromXml(state.firstPlanText)
    const secondPlan = queryPlanFromXml(state.secondPlanText)

    const nodeTypes = useMemo(() => ({
        renderPlanNode: RenderPlanNode,
        renderTableScan: RenderTableScan
    }), []);

    const edgeTypes = useMemo(() => ({
        customEdge: CustomEdge
    }), []);

    // empty initial state
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    useEffect(() => {
        // first plan
        const [normalizedFirstNodes, normalizedFirstEdges] = PlanNormalizer.normalize(firstPlan);
        Layouter.treeLayout(normalizedFirstNodes, normalizedFirstEdges, {
            rankSep: 100,
            nodeSep: 100,
            direction: LayoutDirection.VERTICAL,
            globalXOffset: 200
        });

        // second plan
        const [normalizedSecondNodes, normalizedSecondEdges] = PlanNormalizer.normalize(secondPlan);
        Layouter.treeLayout(normalizedSecondNodes, normalizedSecondEdges, {
            rankSep: 100,
            nodeSep: 100,
            direction: LayoutDirection.VERTICAL,
            globalXOffset: 1200
        });
        setNodes(normalizedFirstNodes.concat(normalizedSecondNodes));
        setEdges(normalizedFirstEdges.concat(normalizedSecondEdges));
        console.log("Rendered! " + state.firstPlanText.substring(0,100))
    },[state.firstPlanText, state.secondPlanText])

    return (
        <div className={s.diffContainer}>
            <div className={s.firstPlanMetadata}>
                <h1>{firstPlan.dbms}</h1>
            </div>
            <div className={s.secondPlanMetadata}>
                <h1>{secondPlan.dbms}</h1>
            </div>
            <ReactFlow
                panOnDrag={false}
                zoomOnScroll={false}
                className={s.twoPlanView}
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                // @ts-ignore
                edgeTypes={edgeTypes}
            >
            </ReactFlow>
        </div>
    );
}
