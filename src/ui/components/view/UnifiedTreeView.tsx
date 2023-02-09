import React, { useMemo } from 'react';
import ReactFlow, { useEdgesState, useReactFlow } from 'reactflow';
import 'reactflow/dist/style.css';
import { PlanNode } from '../../model/operator/PlanData';
import RefreshLayout from './layout/RefreshLayout';
import useAnimatedNodes from '../useAnimatedNodes';
import UnifiedDiffPlanNode from './elements/UnifiedDiffPlanNode';
import Legend from './Legend';
import CustomUnifiedEdge from './elements/CustomUnifiedEdge';
import GetDimensionsPortal from './GetDimensions';

export interface IUnifiedTreeViewProps {
  unifiedTree: PlanNode;
}

export function UnifiedTreeView(props: IUnifiedTreeViewProps) {
  const { unifiedTree } = props;

  const nodeTypes = useMemo(
    () => ({
      customNode: UnifiedDiffPlanNode
    }),
    []
  );

  const edgeTypes = useMemo(
    () => ({
      customEdge: CustomUnifiedEdge
    }),
    []
  );

  // empty initial state
  const [nodes, setNodes] = useAnimatedNodes([]);
  const [edges, setEdges] = useEdgesState([]);

  const reactFlowInstance = useReactFlow();

  return (
    <>
      <GetDimensionsPortal
        unifiedTree={unifiedTree}
        setNodes={setNodes}
        setEdges={setEdges}
        reactFlowInstance={reactFlowInstance}></GetDimensionsPortal>
      <ReactFlow
        zoomOnScroll={false}
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        // @ts-ignore
        edgeTypes={edgeTypes}></ReactFlow>
      <Legend></Legend>
    </>
  );
}
