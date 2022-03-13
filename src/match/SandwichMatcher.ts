import IMatcher from './IMatcher.js';
import IComparator from './IComparator.js';
import TNode from '../tree/TNode.js';

/**
 * A matching module that reconsiders unmatched nodes for a match
 * if certain conditions are met.
 */
export class SandwichMatcher implements IMatcher {
  /**
   * Extend the matching with matches that can be inferred from the matching
   * of surrounding nodes, e.g., if a node is vertically or horizontally
   * sandwiched between matches. To detect fuzzy matches, the comparison
   * threshold is raised for this matching module only.
   */
  match(oldTree: TNode, newTree: TNode, comparator: IComparator) {
    const newNodes = newTree
        .nonPropertyNodes()
        .filter((node) => !node.isMatched());
    for (const newNode of newNodes) {
      const parentMatch = newNode.getParent().getMatch();
      let minCV = 1;
      let minCVNode = null;

      // Vertical sandwiches
      newNode.children.forEach((node) => {
        if (node.isMatched()) {
          const match = node.getMatch();
          if (match.getParent().label === newNode.label &&
              !match.getParent().isMatched() &&
              match.getParent().getParent() === parentMatch) {
            const CV = comparator.compare(newNode, match.getParent());
            if (CV < minCV) {
              minCVNode = match.getParent();
              minCV = CV;
            }
          }
        }
      });

      // Vertical sandwich has priority.
      if (minCVNode != null) {
        newNode.matchTo(minCVNode);
        continue;
      }
      const leftSibling = newNode.getLeftSibling();
      const rightSibling = newNode.getRightSibling();

      // Left or right sibling must either not exist, or be matched
      if ((leftSibling != null && !leftSibling.isMatched()) ||
          (rightSibling != null && !rightSibling.isMatched())) {
        continue;
      }

      const rightSiblingMatch = rightSibling?.getMatch();
      const leftSiblingMatch = leftSibling?.getMatch();

      let potentialMatch;

      // Case 1: Node has both a right and a left sibling
      if (leftSibling != null && rightSibling != null) {
        if (rightSiblingMatch!!.getLeftSibling() == null ||
            rightSiblingMatch!!.getLeftSibling() !==
            leftSiblingMatch!!.getRightSibling()) {
          continue;
        }
        potentialMatch = rightSiblingMatch!!.getLeftSibling();

        // Case 2: Node has a left, but no right sibling
      } else if (rightSibling == null && leftSibling != null) {
        if (leftSiblingMatch!!.getRightSibling() == null) {
          continue;
        }
        potentialMatch = leftSiblingMatch!!.getRightSibling();
        // Potential match cannot have a right sibling
        if (potentialMatch!!.getRightSibling() != null) {
          continue;
        }

        // Case 3: Node has a right, but no left sibling
      } else if (rightSibling != null && leftSibling == null) {
        if (rightSiblingMatch!!.getLeftSibling() == null) {
          continue;
        }
        potentialMatch = rightSiblingMatch!!.getLeftSibling();
        // Potential match cannot have a left sibling
        if (potentialMatch!!.getLeftSibling() != null) {
          continue;
        }
        // Case 4: Node has neither a left nor a right sibling, but the parent
        // is matched
      } else if (newNode.getParent().isMatched()) {
        const parentMatch = newNode.getParent().getMatch();
        if (parentMatch.degree() === 1) {
          potentialMatch = parentMatch.childAt(0);
        } else {
          continue;
        }
      } else {
        continue;
      }

      potentialMatch = potentialMatch!!;

      // Potential match must be unmatched and have the same label
      if (potentialMatch.label === newNode.label &&
          !potentialMatch.isMatched()) {
        newNode.matchTo(potentialMatch);
      }
    }
  }
}
