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
import PlanNormalizer from "./PlanNormalizer";
import Layouter, {LayoutDirection} from "./Layouter";

// @ts-ignore
import s from './GraphComponent.module.scss'
import {useGlobalState} from "../../data/Store";
import {
    defaultDiffOptions,
    PlanNodeBrowserSerDes
} from "../../../semantic-diff";
import {qpGrammar} from "../../data/plans";
import UnifiedTreeGeneratory
    from "../../../semantic-diff/delta/UnifiedTreeGenerator";
import {PlanData} from "../../model/PlanData";
import CustomUnifiedEdge from "../edges/CustomUnifiedEdge";
import UnifiedDiffPlanNode from "../nodes/UnifiedDiffPlanNode";

export default function UnifiedTreeViewer (props: {}) {
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
        customNode: UnifiedDiffPlanNode
    }), []);

    const edgeTypes = useMemo(() => ({
        customEdge: CustomUnifiedEdge
    }), []);

    // empty initial state
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    useEffect(() => {
        const plans = {
            first: new PlanNodeBrowserSerDes(
                qpGrammar,
                defaultDiffOptions).parseFromString(
                state.queryPlanResults[state.firstSelection].queryPlanXml),
            second: new PlanNodeBrowserSerDes(
                qpGrammar,
                defaultDiffOptions).parseFromString(
                state.queryPlanResults[state.secondSelection].queryPlanXml),
        };

        const unifiedTree = new UnifiedTreeGeneratory<PlanData>().generate(
            plans.first,
            plans.second,
            defaultDiffOptions);

        console.log("Unifiedtree", unifiedTree)

        function getHider (flowNode: Node) {
            return function hide (hidden: boolean) {
                setNodes((nds) => nds.filter(nd => nd.id !== flowNode.id));
                setEdges(eds => eds.filter(e => e.source !== flowNode.id && e.target !== flowNode.id));
            }
        }

        function getExpander (flowNode: Node,
                              uniNodes: Node[],
                              uniEdges: Edge[]) {
            return function expand () {
                console.log(uniNodes, uniEdges);
                const addEdges = uniEdges.filter(e => e.source === flowNode.id);
                const addNodes = uniNodes.filter(nd => !nodes.some(n => n.id === nd.id) && addEdges.some(
                    e => e.target === nd.id));
                console.log(addEdges, addNodes);
                setNodes((nds) => nds.concat(addNodes));
                setEdges((eds) => eds.concat(addEdges));
            }
        }


        // nodes are guaranteed to be in preorder
        const [allNodes, allEdges] = PlanNormalizer.normalize(
            plans.first, 0, {
                computeData: (planNode,
                              flowNode,
                              flowNodes: Node[],
                              flowEdges: Edge[]) => {
                    return {
                        expand: getExpander(flowNode, flowNodes, flowEdges),
                        hide: getHider(flowNode),
                        thisPlanData: planNode.data
                    }
                }
            });

        setPlans(plans);

        setNodes([allNodes[0]]);
        setEdges([]);
        console.log(`Rendered ${allNodes.length} nodes and ${allEdges.length} edges`);
    }, [
                  state.firstSelection,
                  state.secondSelection,
                  state.queryPlanResults,
                  state.showUnified
              ])


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
                // @ts-ignore
                nodeTypes={nodeTypes}
                // @ts-ignore
                edgeTypes={edgeTypes}
            >
            </ReactFlow>
        </ReactFlowProvider>
    );
}
