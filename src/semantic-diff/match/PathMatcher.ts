import TNode from '../tree/TNode';
import IComparator from '../compare/IComparator';
import IMatcher from './IMatcher';
import IPathMatchOptions from './IPathMatchOptions';

export class PathMatcher<T> implements IMatcher<T> {
  /**
   * Create a new PathMatcher instance.
   */
  constructor(private options: IPathMatchOptions) {}

  /**
   * Extend the matching with inner nodes matches that are found along the path
   * of already matched leaves. Also considers the commonality between subtrees
   * in quality mode.
   */
  match(oldTree: TNode<T>, newTree: TNode<T>, comparator: IComparator<T>) {
    // Store all candidates for an inner node
    let candidateMap = new Map<TNode<T>, Set<TNode<T>>>();

    // Starting point is existing matches between leaves
    for (const [newNode, oldNode] of newTree.getSingleMatchingMap()) {
      // copy paths, reverse them and remove first element, discard already
      // matched nodes
      const newPath = newNode
        .path() // Reverse is in-place
        .reverse()
        .slice(1)
        .filter((node) => !node.isMatched());
      let oldPath = oldNode
        .path() // Reverse is in-place
        .reverse()
        .slice(1)
        .filter((node) => !node.isMatched());

      newNodeLoop: for (const newNode of newPath) {
        for (const oldNode of oldPath) {
          // If a candidate has already been captured, we can skip
          // duplicate candidate pairs along the paths.
          if (candidateMap.has(newNode) && candidateMap.get(newNode)!!.has(oldNode)) {
            // Nodes along the new path have can have old nodes from the
            // non-duplicate part of the old path as candidates.
            // Only the duplicate part is cut off.
            const oldNodeIndex = oldPath.indexOf(oldNode);
            oldPath = oldPath.slice(0, oldNodeIndex);
            continue newNodeLoop;
          }

          // Label equality must be ensured
          if (newNode.label === oldNode.label) {
            if (!candidateMap.has(newNode)) {
              candidateMap.set(newNode, new Set());
            }
            // Set remembers insertion order
            candidateMap.get(newNode)!!.add(oldNode);
          }
        }
      }
    }

    // To avoid suboptimal matches, the candidate map is sorted ascending by
    // size of the candidate set. As a result, unique and therefore robust
    // matches are found first and not overwritten by more vague matches.
    candidateMap = new Map(
      [...candidateMap.entries()].sort((entryA, entryB) => entryA[1].size - entryB[1].size)
    );

    // Sadly, we cannot use the persistBestMatches() function for this matching
    // module because of the unique order the candidates are dealt with.
    const oldToNewMap = new Map<TNode<T>, { newNode: TNode<T>; compareValue: number }>();
    mapLoop: for (const [newNode, oldNodeSet] of candidateMap) {
      // Remember the minimum comparison value
      let minCV = 1;
      let minCVNode = null;
      for (const oldNode of oldNodeSet) {
        if (oldNode.isMatched()) continue;
        let cv;
        // TODO move commonality distinction to comparator
        if (this.options.WITH_COMMONALITY) {
          cv = comparator.compareCommonality(oldNode, newNode);
        } else {
          cv = comparator.compare(oldNode, newNode);
        }

        // Perfect match? => add to M and resume with different node
        if (cv === 0) {
          newNode.matchTo(oldNode);
          oldToNewMap.delete(oldNode);
          continue mapLoop;
        }
        if (
          cv <= this.options.COMPARISON_THRESHOLD &&
          cv < minCV &&
          (!oldToNewMap.has(oldNode) || cv < oldToNewMap.get(oldNode)!!.compareValue)
        ) {
          minCV = cv;
          minCVNode = oldNode;
        }
      }
      if (minCVNode != null) {
        oldToNewMap.set(minCVNode, {
          newNode: newNode,
          compareValue: minCV
        });
      }
    }

    // Persist the best matches
    for (const [oldNode, bestMatch] of oldToNewMap) {
      bestMatch.newNode.matchTo(oldNode);
    }
  }
}
