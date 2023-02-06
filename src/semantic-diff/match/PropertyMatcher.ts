import IMatcher from './IMatcher';
import IComparator from '../compare/IComparator';
import TNode from '../tree/TNode';

/**
 * A matching module dedicated to the matching or property nodes.
 */
export class PropertyMatcher<T> implements IMatcher<T> {
  /**
   * Extend the matching with matches between property nodes of matched
   * leaf and inner nodes.
   */
  match(oldTree: TNode<T>, newTree: TNode<T>, comparator: IComparator<T>) {
    const newMatchedNodes = newTree.nonPropertyNodes().filter((node) => node.isMatched()); // must be matched

    for (const newMatchedNode of newMatchedNodes) {
      this.matchProperties(newMatchedNode.getSingleMatch(), newMatchedNode);
    }
  }

  private matchProperties(oldNode: TNode<T>, newNode: TNode<T>): void {
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
  }
}
