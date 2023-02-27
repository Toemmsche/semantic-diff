import React, { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { PlanNode } from '../../../model/operator/Operator';
import { Edge, Node, ReactFlowInstance } from 'reactflow';
import UnifiedDiffPlanNode from '../elements/UnifiedDiffPlanNode';
import { useCollapsible, useLayouter } from '../../../state/ParameterStore';
import DocumentingRenderer from './DocumentingRenderer';
import renderGraph from './RenderGraph';

export type Dimensions = [number, number];

function renderDummyPlanNode(planNode: PlanNode) {
  return (
    <UnifiedDiffPlanNode
      data={{
        // dummy input for collapse / expand
        expandedNodes: [planNode],
        setExpandedNodes: (nodes) => {},
        planNode: planNode
      }}></UnifiedDiffPlanNode>
  );
}

export interface IPreRenderDimensionsProps {
  unifiedTree: PlanNode;
  setNodes: (nodes: Node[]) => any;
  setEdges: (edges: Edge[]) => any;
  reactFlowInstance: ReactFlowInstance;
}

export default function PreRenderDimensions(props: IPreRenderDimensionsProps) {
  const { unifiedTree, setNodes, setEdges, reactFlowInstance } = props;
  const [expandedNodes, setExpandedNodes] = useState([] as PlanNode[]);
  const [collapsible] = useCollapsible();
  const [layouter] = useLayouter();
  const [dimensions, setDimensions] = useState(new Map<PlanNode, Dimensions>());
  const dimensionsComplete = dimensions.size === expandedNodes.length;

  useEffect(() => {
    setExpandedNodes(unifiedTree.toPreOrderUnique());
  }, [collapsible, unifiedTree]);

  const tellDimensions = useMemo(
    () => (item: PlanNode, width: number, height: number) => {
      if (dimensionsComplete) {
        return;
      }
      dimensions.set(item, [width, height]);
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
    console.log('resetting dimensions due to new tree...', expandedNodes);
    setDimensions(new Map());
  }, [unifiedTree, expandedNodes, collapsible, layouter]);

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
}
