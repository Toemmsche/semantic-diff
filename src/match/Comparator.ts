import Extractor from '../extract/Extractor.js';
import IComparator from './IComparator.js';
import TNode from '../tree/TNode.js';
import {DiffConfig} from '../Global.js';
import {getLcsLength, getLcsLengthFast} from '../lib/Lcs.js';
import ComparisonType from '../grammar/ComparisonType.js';

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
    // TODO handle null value
    return compareValue ?? 0;
  }

  compareContent(nodeA: TNode, nodeB: TNode): number {
    // different labels cannot be matched
    // TODO maybe use grammar node or other criterion
    if (nodeA.label !== nodeB.label) return 1.0;
    // compare different properties of each node and weigh the resulting
    // comparison values according to the specified grammar.
    const grammarNode = nodeA.getGrammarNode();
    const items: (number | nu)[] = [];
    const weights = [];
    for (const wcv of grammarNode.weightedCVs) {
      // Extract property
      const valueA = nodeA.accessProperty(wcv.path);
      const valueB = nodeB.accessProperty(wcv.path);
      if (valueA == null && valueB == null) {
        // do not add item or weight
        continue;
      }
      let cv: number | nu = 1;
      if (!(valueA == null && valueB || valueA && valueB == null)) {
        switch (wcv.comparisonType) {
          case ComparisonType.ALL_OR_NOTHING:
            cv = valueA === valueB ? 0 : 1;
            break;
          case ComparisonType.LCS:
            cv = this.compareLcs([...valueA!!], [...valueB!!]);
        }
      }
      items.push(cv);
      weights.push(wcv.weight);
    }
    return this.weightedAverage(items, weights);
  }

  /**
   * Compare the position of two nodes, determined by their paths.
   */
  comparePosition(nodeA: TNode, nodeB: TNode): number {
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

  compareSize(nodeA: TNode, nodeB: TNode): number {
    return this.getSize(nodeA) - this.getSize(nodeB);
  }

  /**
   * Compute the weighted average for a set of comparison values and weights.
   */
  weightedAverage(items: (number | nu)[], weights: number[], defaultValue = 0): number {
    let itemSum = 0;
    let weightSum = 0;
    for (let i = 0; i < items.length; i++) {
      if (items[i] != null) {
        // Perfect matches receive a boost for their weight.
        const adjustedWeight =
            (items[i] === 0 ? DiffConfig.WEIGHT_BOOST_MULTIPLIER :
             1) *
            weights[i];
        itemSum += items[i]!! * adjustedWeight;
        weightSum += adjustedWeight;
      }
    }
    if (weightSum === 0) return defaultValue;
    return itemSum / weightSum;
  }

  /**
   * Perform an LCS-based comparison between two sequences.
   */
  private compareLcs(seqA: any[], seqB: any[], defaultValue = null): number | null {
    if (seqA == null) {
      seqA = [];
    } else if (seqB == null) {
      seqB = [];
    }
    const maxLength = Math.max(seqA.length, seqB!!.length);
    if (maxLength === 0) return defaultValue;
    return 1 - getLcsLength(seqA!!, seqB!!) / maxLength;
  }

  /**
   * Because the path compare range is constant, the corresponding LCS
   * computation can be accelerated.
   */
  private comparePathLcs(pathA: number[], pathB: number[]): number {
    const maxLength = Math.max(pathA.length, pathB.length);
    if (maxLength === 0) return 0;
    return 1 - getLcsLengthFast(pathA, pathB) / maxLength;
  }
}
