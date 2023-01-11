import TNode from "../tree/TNode";
import {MatchPipeline} from "../match/MatchPipeline";
import {Comparator} from "../compare/Comparator";
import ISemanticDiffOptions from "../diff/ISemanticDiffOptions";

export const enum Origin {
    OLD = "old", NEW = "new",

    SHARED = "shared"
}

export default class UnifiedTreeGenerator<T> {


    constructor (private options: ISemanticDiffOptions) {
    }

    generate (oldTree: TNode<T>, newTree: TNode<T>): TNode<T> {
        // TODO refactor
        const matchPipeline = MatchPipeline.fromMode(this.options)
        matchPipeline.execute(oldTree, newTree, new Comparator(this.options));

        // tag nodes
        oldTree.toPreOrderArray()
            .forEach(node => node.attributes.set("origin",
                node.isMatched() ? Origin.SHARED : Origin.OLD));
        newTree.toPreOrderArray()
            .forEach(node => node.attributes.set("origin",
                node.isMatched() ? Origin.SHARED : Origin.NEW));

        // Turn tree into DAG by reusing nodes

        // make all matched nodes in the new tree point to their match partner
        // in the old tree
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


                const filteredMatchChildren = match.children.filter(child => {
                    return !child.isMatched() || !child.getMatch()
                        .getParent()
                        .isMatched() || child.getMatch()
                               .getParent() != node
                });

                // TODO  this is dogshit
                // push nodes interleaved
                let k = 0;
                for (let i = 0; i <
                                node.children.length &&
                                k <
                                filteredMatchChildren.length; i++) {
                    if (node.children.indexOf(filteredMatchChildren[k]) !==
                        -1) {
                        k++;
                        continue;
                    }
                    node.children.splice(i + 1, 0, filteredMatchChildren[k++]);
                    i++;
                }

                // push the rest if any left
                if (k < filteredMatchChildren.length) {
                    node.children.push(...filteredMatchChildren.slice(k)
                        .filter(n => node.children.indexOf(n) === -1));
                }

            });

        return oldTree;
    }
}