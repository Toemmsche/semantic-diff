import IMatcher from "./IMatcher.js";
import IComparator from "./IComparator.js";
import TNode from "../tree/TNode.js";

export class FixedMatcher implements IMatcher {

    match(oldTree : TNode, newTree: TNode, comparator : IComparator) {
        // Ensure that root nodes are matched
        if (!oldTree.isMatchedTo(newTree)) {
            newTree.matchTo(oldTree);
        }
    }
}

