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
import TwoWayDiffPlanNode from "./TwoWayDiffPlanNode";
import NodeLayouter from "../NodeLayouter";
import {PlanNode} from "../../../model/PlanData";
import {MatchPipeline} from "../../../../semantic-diff/match/MatchPipeline";
import {Comparator} from "../../../../semantic-diff/compare/Comparator";
import {defaultDiffOptions} from "../../../../semantic-diff";


export interface ITwoWayDiffViewProps {
    firstPlan: PlanNode,
    secondPlan: PlanNode,

    showMatches: boolean
}

export default function TwoWayDiffView (props: ITwoWayDiffViewProps) {
    const {firstPlan, secondPlan, showMatches} = props;

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
                  // Compute matches first?
                  if (showMatches) {
                      const matchPipeline = MatchPipeline.fromMode(defaultDiffOptions)
                      matchPipeline.execute(firstPlan,
                                            secondPlan,
                                            new Comparator(defaultDiffOptions));
                  }

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

                  setNodes(allNodes);
                  setEdges(allEdges);
                  console.log(`Rendered ${allNodes.length} nodes and ${allEdges.length} edges`)

                  setTimeout(() => {
                      document.getElementById("changeLayoutBtn")!!.click();
                  }, 300)
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

        <ReactFlowProvider>
            <NodeLayouter nodeSetter={setNodes}></NodeLayouter>
            <ReactFlow
                style={{flexGrow: 1}}
                zoomOnScroll={false}
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
