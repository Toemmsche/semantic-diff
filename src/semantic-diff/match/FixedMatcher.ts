import IMatcher from './IMatcher';
import IComparator from '../compare/IComparator';
import TNode from '../tree/TNode';

export class FixedMatcher<T> implements IMatcher<T> {

  match(oldTree: TNode<T>, newTree: TNode<T>, comparator: IComparator<T>) {
    // Ensure that root nodes are matched
    if (!oldTree.isMatchedTo(newTree)) {
      newTree.matchTo(oldTree);
    }
  }
}

