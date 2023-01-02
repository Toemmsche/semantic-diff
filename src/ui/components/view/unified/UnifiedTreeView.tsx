import React, {useEffect, useMemo} from 'react';
import ReactFlow, {
    Edge,
    Node,
    ReactFlowProvider,
    useEdgesState,
    useNodesState
} from 'reactflow';
import 'reactflow/dist/style.css';
import PlanNormalizer from "../PlanNormalizer";
import {PlanNode} from "../../../model/PlanData";
import CustomUnifiedEdge from "./CustomUnifiedEdge";
import UnifiedDiffPlanNode from "./UnifiedDiffPlanNode";
import NodeLayouter from "../NodeLayouter";
import {useGlobalState} from "../../../data/Store";


export interface IUnifiedTreeViewProps {
    unifiedTree: PlanNode
}

export default function UnifiedTreeView (props: IUnifiedTreeViewProps) {
    const [state, actions] = useGlobalState();
    const {unifiedTree} = props;

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
                const addNodes = uniNodes.filter(nd => nodes.every(n => n.id !== nd.id) && addEdges.some(
                    e => e.target === nd.id));
                console.log(addEdges, addNodes);
                setNodes((nds) => nds.concat(addNodes));
                setEdges((eds) => eds.concat(addEdges));

                setTimeout(() => {
                    document.getElementById("changeLayoutBtn")!!.click()
                }, 100);
            }
        }

        const [allNodes, allEdges] = PlanNormalizer.normalize(
            unifiedTree, 0, {
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

        if (state.hideNodes) {
            setNodes([allNodes[0]]);
            setEdges([]);
        } else {
            setNodes(allNodes);
            setEdges(allEdges);
        }

        console.log(`Rendered ${allNodes.length} nodes and ${allEdges.length} edges`);

        setTimeout(() => {
            document.getElementById("changeLayoutBtn")!!.click();
        }, 300)
    }, [props.unifiedTree, state.hideNodes])


    return (
        <ReactFlowProvider>
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
        </ReactFlowProvider>
    );
}
