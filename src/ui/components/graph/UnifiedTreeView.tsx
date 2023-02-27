import React, { useMemo } from 'react';
import ReactFlow, { MiniMap, useEdgesState, useReactFlow } from 'reactflow';
import 'reactflow/dist/style.css';
import { PlanNode } from '../../model/operator/Operator';
import DeltaNode from './elements/DeltaNode';
import Legend from './Legend';
import DeltaEdge from './elements/DeltaEdge';
import PreRenderDimensions from './dimensions/PreRenderDimensions';
import useAnimatedNodes from './AnimatedNodes';

export interface IUnifiedTreeViewProps {
  unifiedTree: PlanNode;
}

export function UnifiedTreeView(props: IUnifiedTreeViewProps) {
  const { unifiedTree } = props;

  const nodeTypes = useMemo(
    () => ({
      customNode: DeltaNode
    }),
    []
  );

  const edgeTypes = useMemo(
    () => ({
      customEdge: DeltaEdge
    }),
    []
  );

  // empty initial state
  const [nodes, setNodes] = useAnimatedNodes([]);
  const [edges, setEdges] = useEdgesState([]);

  const reactFlowInstance = useReactFlow();

  return (
    <>
      <PreRenderDimensions
        unifiedTree={unifiedTree}
        setNodes={setNodes}
        setEdges={setEdges}
        reactFlowInstance={reactFlowInstance}></PreRenderDimensions>
      <ReactFlow
        nodesConnectable={false}
        zoomOnScroll
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}>
        <MiniMap zoomable pannable nodeColor="darkgrey"></MiniMap>
      </ReactFlow>
      <Legend></Legend>
    </>
  );
}
