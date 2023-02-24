import { Edge, Node } from 'reactflow';
import { Operator } from '../../../model/operator/Operator';
import { TreeLayoutOptions } from './ITreeLayoutOptions';

export default interface IAsyncLayouter {
  treeLayout(nodes: Node<Operator>[], edges: Edge[], options: TreeLayoutOptions): Promise<Node[]>;
}
