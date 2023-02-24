import { Edge, Node } from 'reactflow';
import { Operator } from '../../../model/operator/Operator';
import { TreeLayoutOptions } from './ITreeLayoutOptions';

export default interface IBlockingLayouter {
  treeLayout(nodes: Node<Operator>[], edges: Edge[], options: TreeLayoutOptions): Node[];
}
