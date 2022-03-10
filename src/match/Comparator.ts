import Extractor from "../extract/Extractor.js";
import IComparator from "./IComparator.js";
import TNode from "../tree/TNode.js";
import {DiffConfig} from "../Global.js";
import {getLcsLength, getLcsLengthFast} from "../lib/Lcs.js";

/**
 * Wrapper class for the computation of various comparison values.
 */
export class Comparator extends Extractor implements IComparator {


    compare(nodeA: TNode, nodeB: TNode): number {
        const compareValue = this.weightedAverage(
            [
                this.compareContent(nodeA, nodeB),
                this.comparePosition(nodeA, nodeB),
            ],
            [
                DiffConfig.CONTENT_WEIGHT,
                DiffConfig.POSITION_WEIGHT,
            ],
        );
        // TODO
        return compareValue ?? 0;
    }

    compareContent(nodeA: TNode, nodeB: TNode): number {
        // different labels cannot be matched
        if (nodeA.label !== nodeB.label) return 1.0;
        // TODO
        return 0;
    }

    /**
     * Perform an LCS-based comparison between two sequences.
     */
    private compareLcs(seqA : any[], seqB : any[], defaultValue = null) : number | null {
        if (seqA == null) {
            seqA = [];
        } else if (seqB == null) {
            seqB = [];
        }
        const maxLength = Math.max(seqA.length, seqB.length);
        if (maxLength === 0) return defaultValue;
        return 1 - getLcsLength(seqA, seqB) / maxLength;
    }

    /**
     * Because the path compare range is constant, the corresponding LCS
     * computation can be accelerated.
     */
    private comparePathLcs(pathA : number[], pathB: number[]) : number {
        const maxLength = Math.max(pathA.length, pathB.length);
        if (maxLength === 0) return 0;
        return 1 - getLcsLengthFast(pathA, pathB) / maxLength;
    }

    /**
     * Compare the position of two nodes, determined by their paths.
     */
    comparePosition(nodeA: TNode, nodeB: TNode) : number {
        const radius = DiffConfig.PATH_COMPARE_RANGE;

        /*
         const nodeLeftSlice = nodeA.getSiblings()
         .slice(Math.max(nodeA.index - radius, 0), nodeA.index)
         .map(n => this.hashExtractor.get(n));
         const otherLeftSlice = nodeB.getSiblings()
         .slice(Math.max(nodeB.index - radius, 0), nodeB.index)
         .map(n => this.hashExtractor.get(n));
         const leftCV = this.compareLcs(nodeLeftSlice, otherLeftSlice, 0);

         const nodeRightSlice = nodeA.getSiblings()
         .slice(nodeA.index + 1, nodeA.index + radius + 1)
         .map(n => this.hashExtractor.get(n));
         const otherRightSlice = nodeB.getSiblings()
         .slice(nodeB.index + 1, nodeB.index + radius + 1)
         .map(n => this.hashExtractor.get(n));
         const rightCV = this.compareLcs(nodeRightSlice, otherRightSlice, 0);
         */

        // exclude the compared nodes
        const nodePathSlice =
            nodeA
                .path(radius + 1)
                .reverse()
                .slice(1)
                .map((n: TNode) => this.getContentHash(n));
        const otherPathSlice =
            nodeB
                .path(radius + 1)
                .reverse()
                .slice(1)
                .map((n: TNode) => this.getContentHash(n));
        const pathCV = this.comparePathLcs(nodePathSlice, otherPathSlice);
        return pathCV;
    }


    compareSet(setA : Set<any>, setB: Set<any>, defaultValue = null) : number | null {
        const size = Math.max(setA.size, setB.size);
        if (size === 0) return defaultValue;
        let commonCounter = 0;
        for (const element of setA) {
            if (setB.has(element)) {
                commonCounter++;
            }
        }
        return 1 - (commonCounter / size);
    }

    compareSize(nodeA : TNode, nodeB : TNode) : number{
        return this.getSize(nodeA) - this.getSize(nodeB);
    }

    compareString(strA : string, strB: string, defaultValue = null) : number | null{
        if (strA == null && strB == null) return defaultValue;
        // For now, this is an all-or-nothing comparison
        return strA === strB ? 0 : 1;
    }

    /**
     * Compute the weighted average for a set of comparison values and weights.
     */
    weightedAverage(items : number[], weights : number[], defaultValue = null) : number | null{
        let itemSum = 0;
        let weightSum = 0;
        for (let i = 0; i < items.length; i++) {
            if (items[i] != null) {
                // Perfect matches receive a boost for their weight.
                const adjustedWeight =
                    (items[i] === 0 ? DiffConfig.WEIGHT_BOOST_MULTIPLIER :
                        1) *
                    weights[i];
                itemSum += items[i] * adjustedWeight;
                weightSum += adjustedWeight;
            }
        }
        if (weightSum === 0) return defaultValue;
        return itemSum / weightSum;
    }
}
