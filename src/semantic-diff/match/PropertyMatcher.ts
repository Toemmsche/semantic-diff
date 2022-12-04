import IMatcher from './IMatcher';
import IComparator from './IComparator';
import TNode from '../tree/TNode';

/**
 * A matching module dedicated to the matching or property nodes.
 */
export class PropertyMatcher implements IMatcher {
  /**
   * Extend the matching with matches between property nodes of matched
   * leaf and inner nodes.
   */
  match(oldTree: TNode, newTree: TNode, comparator: IComparator) {
    const newMatchedNodes =
        newTree
            .nonPropertyNodes()
            .filter((node) => node.isMatched()); // must be matched

    for (const newMatchedNode of newMatchedNodes) {
      this.matchProperties(newMatchedNode.getMatch(), newMatchedNode);
    }
  }

  private matchProperties(oldNode: TNode, newNode: TNode): void {
    // We assume that no two properties that are siblings in the xml tree
    // share the same label
    const oldLabelMap = new Map();
    for (const oldChild of oldNode) {
      if (oldChild.isPropertyNode() && !oldChild.isMatched()) {
        oldLabelMap.set(oldChild.label, oldChild);
      }
    }
    for (const newChild of newNode) {
      if (newChild.isPropertyNode() && !newChild.isMatched()) {
        if (oldLabelMap.has(newChild.label)) {
          const match = oldLabelMap.get(newChild.label);
          newChild.matchTo(match);
          // Theoretically, a repeated matching can occur if two arguments in
          // the new tree have the same name
          // Even though this situation is highly unlikely, we delete the
          // entry in the label map to prevent it.
          oldLabelMap.delete(newChild.label);
          this.matchProperties(match, newChild);
        }
      }
    }
  };
}
