import IMatcher from './IMatcher';
import IComparator from './IComparator';
import TNode from '../tree/TNode';

export class FixedMatcher implements IMatcher {

  match(oldTree: TNode, newTree: TNode, comparator: IComparator) {
    // Ensure that root nodes are matched
    if (!oldTree.isMatchedTo(newTree)) {
      newTree.matchTo(oldTree);
    }
  }
}

