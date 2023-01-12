import React, {useEffect, useMemo} from 'react';
import ReactFlow, {useEdgesState, useNodesState} from 'reactflow';
import 'reactflow/dist/style.css';
import PlanNormalizer from "../PlanNormalizer";
import CustomEdge from "../../edges/CustomEdge";
import TwoWayDiffPlanNode from "./TwoWayDiffPlanNode";
import NodeLayouter from "../NodeLayouter";
import {PlanNode} from "../../../model/PlanData";
import {MatchPipeline} from "../../../../semantic-diff/match/MatchPipeline";
import {Comparator} from "../../../../semantic-diff/compare/Comparator";
import {defaultDiffOptions} from "../../../../semantic-diff";
import DynamicLayouter, {defaultTreeLayoutOptions} from "../DynamicLayouter";


export interface ITwoWayDiffViewProps {
    firstPlan: PlanNode,
    secondPlan: PlanNode
}

export default function TwoWayDiffView (props: ITwoWayDiffViewProps) {
    const {firstPlan, secondPlan} = props;

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
                  let [normalizedFirstNodes, normalizedFirstEdges] = PlanNormalizer.normalize(
                      firstPlan, 1, {
                          computeData: (planNode: PlanNode) => {
                              return {
                                  firstPlanData: planNode.data,
                                  secondPlanData: planNode.isMatched()
                                      ? planNode.getMatch().data
                                      : null,

                              }
                          }
                      });
                  // second plan
                  let [normalizedSecondNodes, normalizedSecondEdges] = PlanNormalizer.normalize(
                      secondPlan, 2, {
                          computeData: (planNode: PlanNode) => {
                              return {
                                  firstPlanData: planNode.isMatched()
                                      ? planNode.getMatch().data
                                      : null,
                                  secondPlanData: planNode.data

                              }
                          }
                      });

                  const allNodes = normalizedFirstNodes.concat(normalizedSecondNodes);
                  const allEdges = normalizedFirstEdges.concat(normalizedSecondEdges);

                  const layoutedNodes = DynamicLayouter.treeLayout(allNodes,
                                                                   edges,
                                                                   defaultTreeLayoutOptions);

                  console.log(layoutedNodes);
                  setNodes(layoutedNodes);
                  setEdges(allEdges);

                  console.log(`Rendered ${layoutedNodes.length} nodes and ${allEdges.length} edges`,
                              layoutedNodes,
                              allEdges)
              },
              [props]
    );


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

    return (
        <>
            <NodeLayouter nodeSetter={setNodes}></NodeLayouter>
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
        </>
    );
}
