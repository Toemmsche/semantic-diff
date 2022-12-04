import IComparator from './IComparator';
import TNode from '../tree/TNode';
import {persistBestMatches} from './BestMatchPersister';
import IMatcher from './IMatcher';
import IMatchOptions from './IMatchOptions';

export class SimilarityMatcher implements IMatcher {

  constructor(private options: IMatchOptions) {

  }

  /**
   * Extend the matching with matches between sufficiently similar leaf nodes.
   * For each unmatched new leaf node, the old node with the lowest comparison
   * value that is better than that node's current best match is chosen.
   */
  match(oldTree: TNode, newTree: TNode, comparator: IComparator) {
    // filter for unmatched leaf nodes
    const oldLeaves =
        oldTree
            .leaves()
            .filter((leaf: TNode) => !leaf.isMatched());
    const newLeaves =
        newTree
            .leaves()
            .filter((leaf: TNode) => !leaf.isMatched());

    const keyFunction = (node: TNode) => node.label;

    const compareFunction =
        (oldNode: TNode, newNode: TNode) => comparator.compare(
            oldNode,
            newNode
        );
    const matchFunction =
        (oldNode: TNode, newNode: TNode) => newNode.matchTo(oldNode);
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
