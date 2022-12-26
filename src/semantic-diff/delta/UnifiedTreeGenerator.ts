import TNode from "../tree/TNode";
import {EditScript} from "./EditScript";
import {getLis} from "../lib/Lis";
import {MatchPipeline} from "../match/MatchPipeline";
import {Comparator} from "../compare/Comparator";
import ISemanticDiffOptions from "../diff/ISemanticDiffOptions";

export default class UnifiedTreeGeneratory<T> {


    generate (oldTree: TNode<T>,
              newTree: TNode<T>,
              options: ISemanticDiffOptions): TNode<T> {
        // TODO refactor
        const matchPipeline = MatchPipeline.fromMode(options)
        matchPipeline.execute(oldTree, newTree, new Comparator(options));

        // tag nodes
        oldTree.toPreOrderArray().forEach(node => node.attributes.set("origin", "old"));
        newTree.toPreOrderArray().forEach(node => node.attributes.set("origin", "new"));

        // Turn tree into DAG by reusing nodes

        // make all matched nodes in the new tree point to their match partner in the old tree
        newTree.toPreOrderArray()
               .forEach(node => {
                   for (let i = 0; i < node.children.length; i++) {
                       if (node.childAt(i).isMatched()) {
                           node.children[i] = node.childAt(i).getMatch();
                       }
                   }
               });

        oldTree.toPostOrderArray()
               .filter(node => node.isMatched())
               .forEach(node => {
                   const match = node.getMatch();

                   // copy all unmatched children from match partner (= newly added children)
                   node.children.push(...match.children.filter(child => {
                       return !child.isMatched() || !child.getMatch()
                                                          .getParent()
                                                          .isMatched() || child.getMatch()
                                                                               .getParent() != node
                   }));
               });

        return oldTree;
    }
}