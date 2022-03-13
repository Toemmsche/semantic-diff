import TNode from '../tree/TNode.js';
import IComparator from './IComparator.js';

export default interface IMatcher {
  match(oldTree: TNode, newTree: TNode, comparator: IComparator): void;
}