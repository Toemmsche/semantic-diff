import IMatcher from './IMatcher';
import TNode from '../tree/TNode';
import IComparator from '../compare/IComparator';
import { persistBestMatches } from './BestMatchPersister';

export class HashMatcher<T> implements IMatcher<T> {
  match(oldTree: TNode<T>, newTree: TNode<T>, comparator: IComparator<T>) {
    const oldNodes = oldTree.nonPropertyNodes().filter((node) => !node.isMatched());
    const newNodes = newTree
      .nonPropertyNodes()
      .filter((node) => !node.isMatched())
      // Match subtrees in a greedy fashion (starting with the "heaviest")
      // to improve performance
      .sort((a, b) => comparator.compareSize(b, a));

    const keyFunction = (node: TNode<T>) => comparator.getHash(node);
    const compareFunction = (oldNode: TNode<T>, newNode: TNode<T>) =>
      comparator.comparePosition(oldNode, newNode);

    // Match all nodes of two subtrees.
    const matchFunction = (oldRoot: TNode<T>, newRoot: TNode<T>) => {
      // found a perfect match, match entire subtrees
      const newPreOrder = newRoot.toPreOrderUnique();
      const oldPreOrder = oldRoot.toPreOrderUnique();

      // stable sort both arrays because hash may ignore child order of
      // certain nodes
      const stableSortByHash = (a: TNode<T>, b: TNode<T>) =>
        comparator.getHash(a) - comparator.getHash(b);
      newPreOrder.sort(stableSortByHash);
      oldPreOrder.sort(stableSortByHash);

      for (let i = 0; i < newPreOrder.length; i++) {
        if (!newPreOrder[i].isMatched() && !oldPreOrder[i].isMatched()) {
          newPreOrder[i].matchTo(oldPreOrder[i]);
        }
      }
    };
    // every match is accepted when the hash values equal
    const threshOldFunction = (cv: number) => true;
    persistBestMatches(
      oldNodes,
      newNodes,
      keyFunction,
      compareFunction,
      matchFunction,
      threshOldFunction
    );
  }
}
