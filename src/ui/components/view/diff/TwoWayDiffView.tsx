import React, {useEffect, useMemo} from 'react';
import ReactFlow, {
    ReactFlowProvider,
    useEdgesState,
    useNodesState
} from 'reactflow';
import 'reactflow/dist/style.css';
import PlanNormalizer from "../PlanNormalizer";

// @ts-ignore
import s from '../GraphComponent.module.scss'
import CustomEdge from "../../edges/CustomEdge";
import DiffPlanNode from "./DiffPlanNode";
import NodeLayouter from "../NodeLayouter";
import {PlanNode} from "../../../model/PlanData";


export interface ITwoWayDiffViewProps {
    firstPlan: PlanNode,
    secondPlan: PlanNode
}

export default function TwoWayDiffView (props: ITwoWayDiffViewProps) {

    const {firstPlan, secondPlan} = props;

    const nodeTypes = useMemo(() => ({
        customNode: DiffPlanNode
    }), []);

    const edgeTypes = useMemo(() => ({
        customEdge: CustomEdge
    }), []);

    // empty initial state
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    useEffect(() => {
        // first plan
        let [normalizedFirstNodes, normalizedFirstEdges] = PlanNormalizer.normalize(
            firstPlan, 1);
        // second plan
        let [normalizedSecondNodes, normalizedSecondEdges] = PlanNormalizer.normalize(
            secondPlan, 2);

        const allNodes = normalizedFirstNodes.concat(normalizedSecondNodes);
        const allEdges = normalizedFirstEdges.concat(normalizedSecondEdges);


        setNodes(allNodes);
        setEdges(allEdges);
        console.log(`Rendered ${allNodes.length} nodes and ${allEdges.length} edges`)

        setTimeout(() => {
            document.getElementById("changeLayoutBtn")!!.click();
        }, 300)
    }, [props]);


    return (

        <ReactFlowProvider>
            <NodeLayouter nodeSetter={setNodes}></NodeLayouter>
            <ReactFlow
                style={{flexGrow: 1}}
                zoomOnScroll={false}
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                // @ts-ignore
                edgeTypes={edgeTypes}
            >
            </ReactFlow>
        </ReactFlowProvider>

    );
}
