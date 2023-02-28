import TNode from '../tree/TNode';

export default class DeltaGraphGenerator<T> {
  constructor() {}

  converge(tree: TNode<T>) {
    tree.toPreOrderUnique().forEach((node) => {
      for (let i = 0; i < node.children.length; i++) {
        if (node.childAt(i).getAdjacentLowerMatch() != null) {
          // do not clear parent
          node.children[i] = node.childAt(i).getAdjacentLowerMatch()!;
        }
      }
    });
  }

  unify(tree: TNode<T>) {
    tree
      .toPostOrderUnique()
      .filter((node) => node.isMatched())
      .forEach((node) => {
        const nextHigherMatch = node.getAdjacentHigherMatch();

        if (nextHigherMatch != null) {
          const filteredMatchChildren = nextHigherMatch.children.filter((child) => {
            return (
              // have to add any unmatched children
              !child.getAdjacentLowerMatch() || // or those that were moved between this and the next higher tree
              child.getAdjacentLowerMatch()!.getParent() != node
            );
          });

          // TODO is there a simpler method?
          // merge child lists interleaved
          let k = 0;
          for (let i = 0; i < node.children.length && k < filteredMatchChildren.length; i++) {
            if (node.children.indexOf(filteredMatchChildren[k]) !== -1) {
              k++;
              continue;
            }
            node.children.splice(i + 1, 0, filteredMatchChildren[k++]);
            i++;
          }

          // push the rest if any left
          if (k < filteredMatchChildren.length) {
            node.children.push(
              ...filteredMatchChildren.slice(k).filter((n) => node.children.indexOf(n) === -1)
            );
          }
        }
      });
  }

  generate(trees: TNode<T>[]): TNode<T> {
    if (trees.length === 1) {
      return trees[0];
    }

    // apply n - 1 converge() and unify()
    for (let i = trees.length - 2; i >= 0; i--) {
      const prev = trees[i + 1];
      const curr = trees[i];

      this.converge(prev);
      this.unify(curr);

      // lower act index
      curr.toPreOrderUnique().forEach((n) => {
        // align working indices
        n.workingIndex = curr.workingIndex;
      });
    }

    return trees[0];
  }
}
