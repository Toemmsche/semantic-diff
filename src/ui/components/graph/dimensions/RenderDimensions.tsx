import React, {useEffect, useMemo, useState} from 'react';
import {PlanNode} from '../../../model/operator/Operator';
import {Edge, Node, ReactFlowInstance} from 'reactflow';
import DeltaNode from '../elements/DeltaNode';
import {useCollapsible, useLayouter, useNodeDimensions} from '../../../state/ParameterStore';
import renderGraph from '../RenderGraph';
import {NodeDimensionsType} from "../../../state/Parameters";

export type Dimensions = [number, number];

function renderDummyPlanNode(planNode: PlanNode) {
  return (
    <DeltaNode
      data={{
        // dummy input for collapse / expand
        expandedNodes: [planNode],
        setExpandedNodes: (nodes) => {},
        planNode: planNode
      }}></DeltaNode>
  );
}

export interface IRenderDimensionsProps {
    unifiedTree: PlanNode;
    setNodes: (nodes: Node[]) => any;
    setEdges: (edges: Edge[]) => any;
    reactFlowInstance: ReactFlowInstance;
}

export default function RenderDimensions(props: IRenderDimensionsProps) {
  const { unifiedTree, setNodes, setEdges, reactFlowInstance } = props;
  const [expandedNodes, setExpandedNodes] = useState([] as PlanNode[]);
  const [collapsible] = useCollapsible();
  const [nodeDimensions] = useNodeDimensions();
  const [layouter] = useLayouter();

  useEffect(() => {
    setExpandedNodes(unifiedTree.toPreOrderUnique());
  }, [collapsible, unifiedTree]);

  useMemo(() => {
        if (nodeDimensions.kind !== NodeDimensionsType.STATIC) {
            throw new Error("Currently only supporting static dimensions");
        }
        const dimensions : Map<PlanNode, Dimensions> = new Map(expandedNodes.map(n => [n , nodeDimensions.staticDimensions]));
        renderGraph(
            unifiedTree,
            expandedNodes,
            setExpandedNodes,
            dimensions,
            collapsible,
            layouter,
            setNodes,
            setEdges,
            reactFlowInstance
        );
    }, [expandedNodes, nodeDimensions, layouter, collapsible]);

  return <></>;
}
