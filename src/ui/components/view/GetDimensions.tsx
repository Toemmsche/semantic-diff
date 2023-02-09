import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import IAsyncLayouter from './layout/IAsyncLayouter';
import IBlockingLayouter from './layout/IBlockingLayouter';
import { PlanNode } from '../../model/operator/PlanData';
import DefaultNormalizer from './normalize/DefaultNormalizer';
import { ICustomUnifiedEdgeData } from './elements/CustomUnifiedEdge';
import { defaultTreeLayoutOptions } from './layout/ITreeLayoutOptions';
import { fitLater } from './layout/RefreshLayout';
import { Edge, Node, ReactFlowInstance } from 'reactflow';
import UnifiedDiffPlanNode from './elements/UnifiedDiffPlanNode';
import { Box } from '@mui/material';
import { useCollapsible, useLayouter } from '../../state/ParameterStore';

function normalizeAndLayout(
  unifiedTree: PlanNode,
  expandedNodes: PlanNode[],
  setExpandedNodes: (planNodes: PlanNode[]) => any,
  dimensions: Map<PlanNode, [number, number]>,
  collapsible: boolean,
  layouter: IBlockingLayouter | IAsyncLayouter,
  setNodes: (nodes: Node[]) => any,
  setEdges: (edges: Edge[]) => any,
  reactFlowInstance: ReactFlowInstance
) {
  console.log('Rendering unified tree with dimensions', unifiedTree, dimensions);

  const [normalizedNodes, normalizedEdges] = new DefaultNormalizer().normalize(
    unifiedTree,
    0,
    dimensions,
    {
      filter: (planNode: PlanNode) => expandedNodes.some((pn) => pn === planNode),
      computeData: (planNode: PlanNode) => {
        return {
          hide: () => {
            // all descendants
            const descendants = new Set(planNode.toPreOrderUnique());
            descendants.delete(planNode);
            setExpandedNodes(expandedNodes.filter((n) => !descendants.has(n)));
          },
          expand: () => {
            setExpandedNodes([
              ...expandedNodes, // TODO what about duplicates
              ...planNode.children
            ]);
          },
          planNode: planNode
        };
      },
      computeEdgeData: (parentPlanNode: PlanNode, childPlanNode: PlanNode) => {
        return {
          childPlanNode: childPlanNode,
          parentPlanNode: parentPlanNode
        } as ICustomUnifiedEdgeData;
      }
    }
  );

  const layoutNodes = layouter.treeLayout(
    normalizedNodes,
    normalizedEdges,
    defaultTreeLayoutOptions
  );
  if (layoutNodes instanceof Promise) {
    // async layouter
    layoutNodes.then((ln) => {
      setNodes(ln);
      setEdges(normalizedEdges);
      console.log(`Rendered ${ln.length} nodes and ${normalizedEdges.length} edges`);
      fitLater(reactFlowInstance);
    });
  } else {
    // blocking layouter
    setNodes(layoutNodes);
    setEdges(normalizedEdges);
    console.log(`Rendered ${layoutNodes.length} nodes and ${normalizedEdges.length} edges`);
    fitLater(reactFlowInstance);
  }
}

function Dimentor<T>(props: {
  item: T;
  callback: (item: T, width: number, height: number) => void;
  renderFunc: (item: T) => any;
}) {
  const { item, callback, renderFunc } = props;
  const childRef = useRef(null);

  useLayoutEffect(() => {
    //console.log('render dimentor');
    // @ts-ignore
    callback(item, childRef.current!.clientWidth, childRef.current!.clientHeight);
  });

  return (
    // shed all excess height and width
    <Box ref={childRef} height="max-content" width="max-content">
      {renderFunc(item)}
    </Box>
  );
}

export interface INodeDimensionProps {
  unifiedTree: PlanNode;
  setNodes: (nodes: Node[]) => any;
  setEdges: (edges: Edge[]) => any;
  reactFlowInstance: ReactFlowInstance;
}

function renderPlanNode(planNode: PlanNode) {
  return (
    <UnifiedDiffPlanNode
      data={{
        // dummy input for collapse / expand
        hide: () => {},
        expand: () => {},
        planNode: planNode
      }}></UnifiedDiffPlanNode>
  );
}

export default function GetDimensionsPortal(props: INodeDimensionProps) {
  const { unifiedTree, setNodes, setEdges, reactFlowInstance } = props;
  const [expandedNodes, setExpandedNodes] = useState([] as PlanNode[]);
  const [collapsible] = useCollapsible();
  const [layouter] = useLayouter();
  const [dimensions, setDimensions] = useState(new Map<PlanNode, [number, number]>());
  const dimensionsComplete = dimensions.size === expandedNodes.length;

  useEffect(() => {
    if (collapsible) {
      setExpandedNodes([unifiedTree]);
    } else {
      setExpandedNodes(unifiedTree.toPreOrderUnique());
    }
  }, [unifiedTree, collapsible]);

  const tellDimensions = useMemo(
    () => (item: PlanNode, width: number, height: number) => {
      if (dimensionsComplete) {
        console.assert(
          [width, height].every((v, i) => dimensions.has(item) && v === dimensions.get(item)![i])
        );
        return;
      }
      dimensions.set(item, [width, height]);
      if (dimensions.size === expandedNodes.length) {
        normalizeAndLayout(
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

  console.log('rerender get dim');

  useEffect(() => {
    console.log('resetting dimensions due to new tree...');
    setDimensions(new Map());
  }, [unifiedTree, expandedNodes, collapsible, layouter]);

  const comps = expandedNodes.map((item, i) => (
    <Dimentor item={item} callback={tellDimensions} renderFunc={renderPlanNode} />
  ));
  // test component for rendering
  return createPortal(comps, document.body);
}
