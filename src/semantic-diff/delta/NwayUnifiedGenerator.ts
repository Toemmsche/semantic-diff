import TNode from '../tree/TNode';
import ISemanticDiffOptions from '../diff/ISemanticDiffOptions';

export const enum Origin {
  OLD = 'old',
  NEW = 'new',
  SHARED = 'shared'
}

export default class NwayUnifiedGenerator<T> {
  constructor(private options: ISemanticDiffOptions) {}

  converge(tree: TNode<T>) {
    tree.toPreOrderUnique().forEach((node) => {
      for (let i = 0; i < node.children.length; i++) {
        if (node.childAt(i).NgetNextLowerMatch() != null) {
          // do not clear parent
          node.children[i] = node.childAt(i).NgetNextLowerMatch()!;
        }
      }
    });
  }

  unify(tree: TNode<T>) {
    tree
      .toPostOrderUnique()
      .filter((node) => node.NisMatched())
      .forEach((node) => {
        const nextHigherMatch = node.NgetNextHigherMatch();
        if (nextHigherMatch != null) {
          const filteredMatchChildren = nextHigherMatch.children.filter((child) => {
            return (
              // have to add any unmatched children
              !child.NgetNextHigherMatch() || // or those that were moved between this and the next higher tree
              // ...either to a node not matched between the trees
              !child.NgetNextHigherMatch()!.getParent() || // ...or to a different node that IS matched between the trees
              child.NgetNextHigherMatch()!.getParent() != node
            );
          });

          // TODO  this is dogshit
          // push nodes interleaved
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
    // Turn tree into DAG by reusing nodes

    this.converge(trees[trees.length - 1]);

    // do NOT use reverse since it modifies the array in-place
    trees
      .slice(1)
      .reverse()
      .slice(1)
      .forEach((tree) => {
        this.unify(tree);
        this.converge(tree);
      });

    this.unify(trees[0]);

    return trees[0];
  }
}
