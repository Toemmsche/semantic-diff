import React, {useEffect, useMemo, useState} from 'react';
import {createPortal} from 'react-dom';
import {PlanNode} from '../../../model/operator/Operator';
import {Edge, Node, ReactFlowInstance} from 'reactflow';
import DeltaNode from '../elements/DeltaNode';
import {useCollapsible, useLayouter, useNodeDimensions} from '../../../state/ParameterStore';
import DocumentingRenderer from './DocumentingRenderer';
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
  const [nodeDimensionsParam] = useNodeDimensions();
  const [layouter] = useLayouter();
  const [dimensions, setDimensions] = useState(new Map<PlanNode, Dimensions>());
  const dimensionsComplete = dimensions.size === expandedNodes.length;

  useEffect(() => {
    setExpandedNodes(unifiedTree.toPreOrderUnique());
  }, [collapsible, unifiedTree]);

  const tellDimensions = useMemo(
    () => (item: PlanNode, dim: Dimensions) => {
      if (dimensionsComplete) {
        return;
      }
      dimensions.set(item, dim);
      if (dimensions.size === expandedNodes.length) {
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
      }
    },
    [dimensions, dimensionsComplete]
  );

  useEffect(() => {
      setDimensions(new Map());

      if (nodeDimensionsParam.kind == NodeDimensionsType.STATIC) {
          expandedNodes.forEach(n => tellDimensions(n, nodeDimensionsParam.staticDimensions))
      }
  }, [nodeDimensionsParam, unifiedTree, expandedNodes, collapsible, layouter]);


  if (nodeDimensionsParam.kind == NodeDimensionsType.DYNAMIC) {
      const comps = expandedNodes.map((item, i) => (
          <DocumentingRenderer
              key={i}
              item={item}
              dimensions={dimensions}
              callback={tellDimensions}
              renderFunc={renderDummyPlanNode}
          />
      ));

      // test component for rendering
      return createPortal(comps, document.body);
  } else {
      return <></>;
  }
}
