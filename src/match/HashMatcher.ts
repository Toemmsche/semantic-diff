import IMatcher from "./IMatcher.js";
import TNode from "../tree/TNode.js";
import IComparator from "./IComparator.js";
import {persistBestMatches} from "./BestMatchPersister.js";

export class HashMatcher implements IMatcher {

    match(oldTree: TNode, newTree: TNode, comparator: IComparator) {
        const oldNodes =
            oldTree
                .nonPropertyNodes()
                .filter((node) => !node.isMatched());
        const newNodes =
            newTree
                .nonPropertyNodes()
                .filter((node) => !node.isMatched())
                // Match subtrees in a greedy fashion (starting with the "heaviest")
                // to improve performance
                .sort((a, b) => comparator.compareSize(b, a));

        const keyFunction = (node: TNode) => comparator.getHash(node);
        const compareFunction =
            (oldNode: TNode, newNode: TNode) => comparator.comparePosition(oldNode, newNode);

        // Match all nodes of two subtrees.
        const matchFunction = (oldRoot: TNode, newRoot: TNode) => {
            // found a perfect match, match entire subtrees
            const newPreOrder = newRoot.toPreOrderArray();
            const oldPreOrder = oldRoot.toPreOrderArray();

            // stable sort both arrays because hash may ignore child order of
            // certain nodes
            const stableSortByHash = (a: TNode, b: TNode) => comparator.getHash(a) - comparator.getHash(b);
            newPreOrder.sort(stableSortByHash);
            oldPreOrder.sort(stableSortByHash);

            for (let i = 0; i < newPreOrder.length; i++) {
                if (!newPreOrder[i].isMatched() &&
                    !oldPreOrder[i].isMatched()) {
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
            threshOldFunction,
        );
    }
}

