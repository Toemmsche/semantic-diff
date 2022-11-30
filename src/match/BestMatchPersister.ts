import TNode from '../tree/TNode.js';

/**
 * Persist the best matches. For each new node, the old node with the lowest
 * comparison value is chosen, as long as that node is not matched to another
 * node with a lower comparison value. Nodes are considered in the order they
 * are passed to this function.
 * @param {Array<TNode>} oldNodes The nodes of the old tree to consider for a
 *     matching
 * @param {Array<TNode>} newNodes The nodes of the new tree to consider for a
 *     matching
 * @param {Function} keyFunction A function mapping each node to a key. Only
 *     nodes with the same key can be matched. The key can be a hash value or
 *     the node label.
 * @param {Function} compareFunction A function mapping each pair of nodes to a
 *     comparison value from the range [0;1].
 * @param {Function} matchHandler A function to execute when two nodes are
 *     chosen for a match.
 * @param {Function} thresholdFunction A boolean function to determine if a
 *     comparison value is sufficient for a match.
 */
export function persistBestMatches(oldNodes: TNode[],
                                   newNodes: TNode[],
                                   keyFunction: (node: TNode) => any,
                                   compareFunction: (node: TNode, other: TNode) => number,
                                   matchHandler: (node: TNode, match: TNode) => void,
                                   thresholdFunction: (cv: number) => boolean = (cv) => true) {
  const candidateMap = new Map<TNode, TNode[]>();
  for (const oldNode of oldNodes) {
    const key = keyFunction(oldNode);
    if (!candidateMap.has(key)) {
      candidateMap.set(key, []);
    }
    candidateMap.get(key)!!.push(oldNode);
  }

  const oldToNewMap = new Map<TNode, { newNode: TNode, compareValue: number }>();
  newNodeLoop: for (const newNode of newNodes) {
    // existing matches cannot be altered
    if (newNode.isMatched()) {
      continue;
    }

    const key = keyFunction(newNode);

    let minCV = 1;
    let minCVNode = null;
    for (const oldNode of candidateMap.get(key) ?? []) {
      // existing matches cannot be altered
      if (oldNode.isMatched()) {
        continue;
      }
      // compare positionally only
      const CV = compareFunction(oldNode, newNode);
      // handle a perfect match
      if (CV === 0) {
        matchHandler(oldNode, newNode);
        oldToNewMap.delete(oldNode);
        continue newNodeLoop;
      }
      if (CV <= minCV &&
          thresholdFunction(CV) &&
          (!oldToNewMap.has(oldNode) ||
              CV < oldToNewMap.get(oldNode)!!.compareValue)) {
        minCV = CV;
        minCVNode = oldNode;
      }
    }
    if (minCVNode != null) {
      oldToNewMap.set(minCVNode, {
        newNode: newNode,
        compareValue: minCV,
      });
    }
  }
  for (const [oldNode, bestMatch] of oldToNewMap) {
    matchHandler(oldNode, bestMatch.newNode);
  }
}
