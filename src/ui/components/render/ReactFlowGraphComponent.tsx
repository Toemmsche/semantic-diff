import React, {useMemo} from 'react';
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

export default function ReactFlowGraphComponent(props: IRenderBackendProps) {
    const [normalizedNodes, normalizedEdges] = PlanNormalizer.normalize(props.firstPlan);

    Layouter.treeLayout(normalizedNodes, normalizedEdges, {
        rankSep: 100,
        nodeSep: 100,
        direction: LayoutDirection.VERTICAL
    });

    const nodeTypes = useMemo(() => ({ renderPlanNode: RenderPlanNode }), []);
    const [nodes, setNodes, onNodesChange] = useNodesState(normalizedNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(normalizedEdges);

    const onConnect = useCallback((params: Edge<any> | Connection) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
        >
        </ReactFlow>
    );
}
