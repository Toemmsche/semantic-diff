import TNode from '../tree/TNode';
import IComparator from './IComparator';

export default interface IMatcher {
  match(oldTree: TNode, newTree: TNode, comparator: IComparator): void;
}