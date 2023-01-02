import React, {useEffect, useMemo, useState} from 'react';
import ReactFlow, {
    Edge,
    Node,
    ReactFlowProvider,
    useEdgesState,
    useNodesState,
    useStore
} from 'reactflow';
import 'reactflow/dist/style.css';
import PlanNormalizer from "../PlanNormalizer";
import Layouter, {LayoutDirection} from "../Layouter";

// @ts-ignore
import s from '../GraphComponent.module.scss'
import CustomEdge from "../../edges/CustomEdge";
import {useGlobalState} from "../../../data/Store";
import {
    defaultDiffOptions,
    PlanNodeBrowserSerDes
} from "../../../../semantic-diff";
import {qpGrammar} from "../../../data/plans";
import {MatchPipeline} from "../../../../semantic-diff/match/MatchPipeline";
import {Comparator} from "../../../../semantic-diff/compare/Comparator";
import DiffPlanNode from "./DiffPlanNode";

export default function ReactFlowGraphComponent (props: {}) {
    const [state, actions] = useGlobalState();

    const [plans, setPlans] = useState({
                                           first: new PlanNodeBrowserSerDes(
                                               qpGrammar,
                                               defaultDiffOptions).parseFromString(
                                               state.queryPlanResults[state.firstSelection].queryPlanXml),
                                           second: new PlanNodeBrowserSerDes(
                                               qpGrammar,
                                               defaultDiffOptions).parseFromString(
                                               state.queryPlanResults[state.secondSelection].queryPlanXml),

                                       });

    const nodeTypes = useMemo(() => ({
        customNode: DiffPlanNode
    }), []);

    const edgeTypes = useMemo(() => ({
        customEdge: CustomEdge
    }), []);

    useEffect(() => {
        console.log("called effect")
        setPlans({
                     first: new PlanNodeBrowserSerDes(
                         qpGrammar,
                         defaultDiffOptions).parseFromString(
                         state.queryPlanResults[state.firstSelection].queryPlanXml),
                     second: new PlanNodeBrowserSerDes(
                         qpGrammar,
                         defaultDiffOptions).parseFromString(
                         state.queryPlanResults[state.secondSelection].queryPlanXml),
                 })
    }, [state.firstSelection, state.secondSelection, state.queryPlanResults]);


    // empty initial state
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    useEffect(() => {
        let allNodes: Node[] = [];
        let allEdges: Edge[] = [];
        if (state.showMatches) {
            // Actually diff
            const matchPipeline = MatchPipeline.fromMode(defaultDiffOptions);
            matchPipeline.execute(plans.first,
                                  plans.second,
                                  new Comparator(defaultDiffOptions));
        }
        // first plan
        let [normalizedFirstNodes, normalizedFirstEdges] = PlanNormalizer.normalize(
            plans.first, 1);
        // second plan
        let [normalizedSecondNodes, normalizedSecondEdges] = PlanNormalizer.normalize(
            plans.second, 2);

        allNodes = normalizedFirstNodes.concat(normalizedSecondNodes);
        allEdges = normalizedFirstEdges.concat(normalizedSecondEdges);

        if (state.showMatches) {
            const matchEdges = PlanNormalizer.getMatchEdges(plans.first,
                                                            plans.second);
            allEdges = allEdges.concat(matchEdges)
        }


        setNodes(allNodes);
        setEdges(allEdges);
        console.log(`Rendered ${allNodes.length} nodes and ${allEdges.length} edges`)
    }, [state.showMatches, plans]);

    // internal helper component that manages layouting/
    const NodeLayouter = ({}) => {
        const internalNodeState = useStore(store => store.nodeInternals);

        const nodeHasDimension = (node: Node) => (node.width != null && node.height != null)

        const changeLayout = () => {
            const internalNodes = new Array(...internalNodeState.entries()).map(
                entry => {
                    const [id, node] = entry;
                    return node;
                })
            if (internalNodes.length > 0 && internalNodes.every(nodeHasDimension)) {
                const layoutedNodes = Layouter.treeLayout(internalNodes,
                                                          edges,
                                                          {
                                                              rankSep: 100,
                                                              nodeSep: 100,
                                                              direction: LayoutDirection.VERTICAL,
                                                              globalXOffset: 0,
                                                              withDimensions: true
                                                          });
                setNodes(layoutedNodes);
            }
        }

        return (<button className={s.layoutBtn} onClick={() => {
            changeLayout()
        }}>change layout</button>)
    }
    return (
        <ReactFlowProvider>
            <NodeLayouter></NodeLayouter>
            <ReactFlow
                zoomOnScroll={false}
                className={s.twoPlanView}
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
