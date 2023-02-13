import { Edge, Node } from 'reactflow';
import { PlanData } from '../../../model/operator/PlanData';
import { TreeLayoutOptions } from './ITreeLayoutOptions';

export default interface IBlockingLayouter {
  treeLayout(nodes: Node<PlanData>[], edges: Edge[], options: TreeLayoutOptions): Node[];
}
