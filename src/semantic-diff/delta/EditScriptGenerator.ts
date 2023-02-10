import TNode from '../tree/TNode';
import { EditScript } from './EditScript';
import { getLis } from '../lib/Lis';
import IEditScriptOptions from './IEditScriptOptions';

export class EditScriptGenerator<T> {
  private editScript: EditScript<T> = new EditScript(undefined, undefined);

  constructor(public options: IEditScriptOptions) {}

  generateEditScript(oldTree: TNode<T>, newTree: TNode<T>) {
    // For edit script verification later on
    const copyOfOld = oldTree.copy();

    this.editScript = new EditScript(undefined, undefined);

    // 1st traversal: Pre-order of new (changed) tree
    const newPreOrder = newTree.toPreOrderUnique();
    for (const newNode of newPreOrder) {
      if (newNode.isMatched()) {
        // New node is matched -> Move, Update, or Nil
        const match = newNode.getSingleMatch();

        // Move if parents of matched nodes aren't matched
        if (!newNode.isRoot() && newNode.getParent().getSingleMatch() !== match.getParent()) {
          this.move(match);
        }

        // Update if the content (text & attributes) of matched nodes differs
        if (!newNode.contentEquals(match)) {
          this.update(match);
        }
      } else {
        // New node is not matched -> Insertion
        this.#insert(newNode);
      }
    }

    const oldPreOrder = oldTree.toPreOrderUnique();
    for (let i = 0; i < oldPreOrder.length; i++) {
      const oldNode = oldPreOrder[i];
      if (!oldNode.isMatched()) {
        // Old node is not matched.
        // We can be certain that none of its descendants are matched either.
        // -> Deletion of the subtree rooted at this node
        i += oldNode.size() - 1;
        this.delete(oldNode);
      }
    }

    // The matching and old tree are well-formed in terms of parent-child
    // relationships. However, the children of a node might still be misaligned.
    // This can occur if a node as moved within its parent.
    for (const oldNode of oldTree.toPreOrderUnique()) {
      if (this.options.EXACT_EDIT_SCRIPT || oldNode.hasInternalOrdering()) {
        this.#alignChildren(oldNode);
      }
    }

    /*
     // Verify the validity of the edit script
     // TODO
     if (!this.#editScript.isValid(copyOfOld, newTree)) {
     Logger.error('Generated edit script is not valid', this);
     }
     */

    return this.editScript;
  }

  #alignChildren(oldParent: TNode<T>) {
    const nodes = oldParent.children;
    // To find the minimal number of moves, map each child to the index of
    // its matching partner and compute the longest increasing subsequence (LIS)
    // on the result. Every node that isn't part of the LIS must be moved.
    const lis = getLis(nodes.map((node) => node.getSingleMatch().getIndex()));

    const inLis = new Set();
    for (const index of lis) {
      inLis.add(nodes[index]);
    }

    outer: for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      if (!inLis.has(node)) {
        // Node will be part of the LIS
        inLis.add(node);
        // The node may be moved further back in the node list.
        // In order to also consider the following node,
        // we must move the iteration index back.
        i--;
        const oldPath = node.xPath();
        // Find the first node that is part of the LIS whose destined index is
        // larger than the destined index of node.
        const thisMatchIndex = node.getSingleMatch().getIndex();
        for (let j = 0; j < nodes.length; j++) {
          const lisMatchIndex = nodes[j].getSingleMatch().getIndex();
          if (inLis.has(nodes[j]) && lisMatchIndex > thisMatchIndex) {
            // Move within nodes, adjust index for move further back
            node.changeIndex(j > node.getIndex() ? j - 1 : j);
            const newPath = node.xPath();
            this.editScript.appendMove(oldPath, newPath);
            continue outer;
          }
        }
        // Move to end of nodes
        node.changeIndex(nodes.length - 1);
        const newPath = node.xPath();
        this.editScript.appendMove(oldPath, newPath);
      }
    }
  }

  private delete(oldNode: TNode<T>) {
    oldNode.removeFromParent();
    this.editScript.appendDeletion(oldNode);
  }

  private findInsertionIndex(newNode: TNode<T>): number {
    let insertionIndex;
    if (newNode.getIndex() > 0) {
      const leftSibling = newNode.getSiblings()[newNode.getIndex() - 1];
      // Left sibling has a match
      insertionIndex = leftSibling.getSingleMatch().getIndex() + 1;
    } else {
      insertionIndex = 0;
    }
    return insertionIndex;
  }

  #insert(newNode: TNode<T>) {
    const copy = newNode.copy(true);

    const deleteLater: TNode<T>[] = [];
    const matchOrRemove = (copiedNode: TNode<T>, newNode: TNode<T>) => {
      if (newNode.isMatched()) {
        deleteLater.push(copiedNode);
      } else {
        newNode.matchTo(copiedNode);
        for (let i = 0; i < copiedNode.degree(); i++) {
          matchOrRemove(copiedNode.childAt(i), newNode.childAt(i));
        }
      }
    };
    matchOrRemove(copy, newNode);
    for (const copiedNode of deleteLater) {
      copiedNode.removeFromParent();
    }

    // Find appropriate insertion index
    const insertionIndex = this.findInsertionIndex(newNode);

    // Perform insert operation at match of the parent node
    const newParent = newNode.getParent().getSingleMatch();
    newParent.insertChild(insertionIndex, copy);

    this.editScript.appendInsertion(copy);
  }

  private move(oldNode: TNode<T>) {
    const newNode = oldNode.getSingleMatch();
    const oldPath = oldNode.xPath();
    // Delete from tree
    oldNode.removeFromParent();

    // Find appropriate insertion index
    const insertionIndex = this.findInsertionIndex(newNode);

    const newParent = newNode.getParent().getSingleMatch();
    newParent.insertChild(insertionIndex, oldNode);
    const newPath = oldNode.xPath();
    this.editScript.appendMove(oldPath, newPath);
  }

  private update(oldNode: TNode<T>) {
    const newNode = oldNode.getSingleMatch();

    // Overwrite old values
    oldNode.attributes.clear();
    for (const [key, val] of newNode.attributes) {
      oldNode.attributes.set(key, val);
    }
    oldNode.text = newNode.text;
    this.editScript.appendUpdate(oldNode);
  }
}
