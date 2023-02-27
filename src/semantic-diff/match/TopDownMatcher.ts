import IMatcher from './IMatcher';
import IComparator from '../compare/IComparator';
import TNode from '../tree/TNode';
import IMatchOptions from './IMatchOptions';
import { arrayMin } from '../Util';

export default class TopDownMatcher<T> implements IMatcher<T> {
  constructor(private options: IMatchOptions) {}

  match(oldTree: TNode<T>, newTree: TNode<T>, comparator: IComparator<T>): void {
    // simple top down matching
    const matchRecursive = (oldNode: TNode<T>, newNode: TNode<T>) => {
      if (
        !oldNode.isMatched() &&
        !newNode.isMatched() &&
        comparator.compareContent(oldNode, newNode) < this.options.COMPARISON_THRESHOLD
      ) {
        oldNode.matchTo(newNode);
      }
      if (oldNode.isMatchedTo(newNode)) {
        for (
          let i = 0;
          i < [oldNode.children.length, newNode.children.length].reduce(arrayMin);
          i++
        ) {
          matchRecursive(oldNode.childAt(i), newNode.childAt(i));
        }
      }
    };

    oldTree
      .toPreOrderUnique()
      .filter((n) => n.isMatched())
      .forEach((n) => matchRecursive(n, n.getSingleMatch()));
  }
}
