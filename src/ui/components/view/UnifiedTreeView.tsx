import React, { useMemo } from 'react';
import ReactFlow, { MiniMap, useEdgesState, useReactFlow } from 'reactflow';
import 'reactflow/dist/style.css';
import { PlanNode } from '../../model/operator/PlanData';
import useAnimatedNodes from '../useAnimatedNodes';
import UnifiedDiffPlanNode from './elements/UnifiedDiffPlanNode';
import Legend from './Legend';
import CustomUnifiedEdge from './elements/CustomUnifiedEdge';
import LayoutWithDimensions from './LayoutWithDimensions';

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
      <LayoutWithDimensions
        unifiedTree={unifiedTree}
        setNodes={setNodes}
        setEdges={setEdges}
        reactFlowInstance={reactFlowInstance}></LayoutWithDimensions>
      <ReactFlow
        nodesConnectable={false}
        zoomOnScroll
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        // @ts-ignore
        edgeTypes={edgeTypes}>
        <MiniMap zoomable pannable nodeColor="darkgrey"></MiniMap>
      </ReactFlow>
      <Legend></Legend>
    </>
  );
}
