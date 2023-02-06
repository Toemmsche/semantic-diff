import IMatcher from './IMatcher';
import IComparator from '../compare/IComparator';
import TNode from '../tree/TNode';
import IMatchOptions from './IMatchOptions';

export default class BottomUpMatcher<T> implements IMatcher<T> {
  constructor(private options: IMatchOptions) {}

  match(oldTree: TNode<T>, newTree: TNode<T>, comparator: IComparator<T>): void {
    let moreMatches = oldTree.leaves().filter((n) => n.isMatched() && !n.isRoot());
    while (moreMatches.length > 0) {
      const next = [];
      for (const node of moreMatches) {
        const cand = node.getParent();
        const candMatch = node.getSingleMatch().getParent();
        if (
          !cand.isMatched() &&
          !candMatch.isMatched() &&
          comparator.compareContent(cand, candMatch) < this.options.COMPARISON_THRESHOLD
        ) {
          // we can also relax the following process

          // TODO depth optimization
          if (cand.children.length !== candMatch.children.length) {
            continue;
          }

          let allMatching = true;

          for (let i = 0; i < cand.children.length; i++) {
            if (!cand.childAt(i).isMatchedTo(candMatch.childAt(i))) {
              allMatching = false;
              break;
            }
          }

          if (allMatching) {
            // great, can match the parent as well
            cand.matchTo(candMatch);
            next.push(cand);
          }
        }
      }
      moreMatches = next;
    }
  }
}
