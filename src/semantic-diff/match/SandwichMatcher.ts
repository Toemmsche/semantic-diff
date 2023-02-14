import IMatcher from './IMatcher';
import IComparator from '../compare/IComparator';
import TNode from '../tree/TNode';
import IMatchOptions from './IMatchOptions';

/**
 * A matching module that reconsiders unmatched nodes for a match
 * if certain conditions are met.
 */
export class SandwichMatcher<T> implements IMatcher<T> {
  constructor(private options: IMatchOptions) {}

  /**
   * Extend the matching with matches that can be inferred from the matching
   * of surrounding nodes, e.g., if a node is vertically or horizontally
   * sandwiched between matches. To detect fuzzy matches, the comparison
   * threshold is raised for this matching module only.
   */
  match(oldTree: TNode<T>, newTree: TNode<T>, comparator: IComparator<T>) {
    const newNodes = newTree.nonPropertyNodes().filter((node) => !node.isMatched());
    for (const newNode of newNodes) {
      // TODO fix the matcher
      const parentMatch = newNode.getParent().isMatched()
        ? newNode.getParent().getSingleMatch()
        : null;
      let minCV = 1;
      let minCVNode = null;

      // Vertical sandwiches
      newNode.children.forEach((node) => {
        if (node.isMatched()) {
          const match = node.getSingleMatch();
          if (
            match.getParent().label === newNode.label &&
            !match.getParent().isMatched() &&
            match.getParent().getParent() === parentMatch
          ) {
            const CV = comparator.compareContent(newNode, match.getParent());
            if (CV < minCV) {
              minCVNode = match.getParent();
              minCV = CV;
            }
          }
        }
      });

      // Vertical sandwich has priority.
      if (minCVNode != null && minCV <= this.options.COMPARISON_THRESHOLD) {
        newNode.matchTo(minCVNode);
        continue;
      }
      const leftSibling = newNode.getLeftSibling();
      const rightSibling = newNode.getRightSibling();

      // Left or right sibling must either not exist, or be matched
      if (
        (leftSibling != null && !leftSibling.isMatched()) ||
        (rightSibling != null && !rightSibling.isMatched())
      ) {
        continue;
      }

      const rightSiblingMatch = rightSibling?.getSingleMatch();
      const leftSiblingMatch = leftSibling?.getSingleMatch();

      let potentialMatch;

      // Case 1: Node has both a right and a left sibling
      if (leftSibling != null && rightSibling != null) {
        if (
          rightSiblingMatch!!.getLeftSibling() == null ||
          rightSiblingMatch!!.getLeftSibling() !== leftSiblingMatch!!.getRightSibling()
        ) {
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
        const parentMatch = newNode.getParent().getSingleMatch();
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
      if (
        comparator.compareContent(potentialMatch, newNode) <= this.options.COMPARISON_THRESHOLD &&
        !potentialMatch.isMatched()
      ) {
        newNode.matchTo(potentialMatch);
      }
    }
  }
}
