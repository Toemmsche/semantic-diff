import IComparator from '../compare/IComparator';
import TNode from '../tree/TNode';
import {persistBestMatches} from './BestMatchPersister';
import IMatcher from './IMatcher';
import IMatchOptions from './IMatchOptions';

export class SimilarityMatcher<T> implements IMatcher<T> {

  constructor(private options: IMatchOptions) {

  }

  /**
   * Extend the matching with matches between sufficiently similar leaf nodes.
   * For each unmatched new leaf node, the old node with the lowest comparison
   * value that is better than that node's current best match is chosen.
   */
  match(oldTree: TNode<T>, newTree: TNode<T>, comparator: IComparator<T>) {
    // filter for unmatched leaf nodes
    const oldLeaves =
        oldTree
            .leaves()
            .filter((leaf: TNode<T>) => !leaf.isMatched());
    const newLeaves =
        newTree
            .leaves()
            .filter((leaf: TNode<T>) => !leaf.isMatched());

    const keyFunction = (node: TNode<T>) => node.label;

    const compareFunction =
        (oldNode: TNode<T>, newNode: TNode<T>) => comparator.compare(
            oldNode,
            newNode
        );
    const matchFunction =
        (oldNode: TNode<T>, newNode: TNode<T>) => newNode.matchTo(oldNode);
    // Only sufficiently similar matches are accepted.
    const thresholdFunction = (cv: number) => cv <= this.options.COMPARISON_THRESHOLD;

    persistBestMatches(
        oldLeaves,
        newLeaves,
        keyFunction,
        compareFunction,
        matchFunction,
        thresholdFunction,
    );
  }
}
