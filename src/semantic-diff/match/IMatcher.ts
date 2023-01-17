import TNode from '../tree/TNode';
import IComparator from '../compare/IComparator';

export default interface IMatcher<T> {
  match(oldTree: TNode<T>, newTree: TNode<T>, comparator: IComparator<T>): void;
}
