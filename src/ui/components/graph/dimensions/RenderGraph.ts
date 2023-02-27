import { PlanNode } from '../../../model/operator/Operator';
import IBlockingLayouter from '../layout/IBlockingLayouter';
import IAsyncLayouter from '../layout/IAsyncLayouter';
import { Edge, Node, ReactFlowInstance } from 'reactflow';
import DefaultNormalizer from '../normalize/DefaultNormalizer';
import { ICustomUnifiedEdgeData } from '../elements/CustomUnifiedEdge';
import { defaultTreeLayoutOptions } from '../layout/ITreeLayoutOptions';
import { fitLater } from '../layout/RefreshLayout';
import { Dimensions } from './PreRenderDimensions';

export default function renderGraph(
  unifiedTree: PlanNode,
  expandedNodes: PlanNode[],
  setExpandedNodes: (planNodes: PlanNode[]) => any,
  dimensions: Map<PlanNode, Dimensions>,
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
      filter: (planNode: PlanNode) => expandedNodes.includes(planNode),
      computeData: (planNode: PlanNode) => {
        return {
          expandedNodes: expandedNodes,
          setExpandedNodes: setExpandedNodes,
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
