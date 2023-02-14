import Cache from './cache/Cache';
import IComparator from './IComparator';
import TNode from '../tree/TNode';

import ComparisonType from '../grammar/ComparisonType';
import ICompareOptions from './ICompareOptions';
import LcsLib from '../lib/LcsLib';
import UnimplementedError from '../error/UnimplementedError';
import { Nullable } from '../Types';
import GrammarNode from '../grammar/GrammarNode';

/**
 * Wrapper class for the computation of various comparison values.
 */
export class Comparator<T> extends Cache<T> implements IComparator<T> {
  private lcsLib: LcsLib;

  constructor(public options: ICompareOptions) {
    super();
    this.lcsLib = new LcsLib(this.options);
  }

  /**
   * Compute the commonality between two subtrees as a comparison value. The
   * commonality is defined as the number of overlapping leaves. Leaves are
   * considered 'equal' if they are matched.
   */
  compareCommonality(nodeA: TNode<T>, nodeB: TNode<T>): number {
    let common = 0;
    const setA = new Set(nodeB.leaves());
    const setB = new Set(nodeA.leaves());

    for (const cand of setA) {
      if (cand.isMatched() && setB.has(cand.getSingleMatch())) {
        common++;
      }
    }

    const commonalityCv = 1 - common / Math.max(setA.size, setB.size);

    return this.weightedAverage(
      [this.compareContent(nodeA, nodeB), this.comparePosition(nodeA, nodeB), commonalityCv],
      [this.options.CONTENT_WEIGHT, this.options.POSITION_WEIGHT, this.options.COMMONALITY_WEIGHT]
    );
  }

  compare(nodeA: TNode<T>, nodeB: TNode<T>): number {
    const compareValue = this.weightedAverage(
      [this.compareContent(nodeA, nodeB), this.comparePosition(nodeA, nodeB)],
      [this.options.CONTENT_WEIGHT, this.options.POSITION_WEIGHT]
    );
    // TODO handle null value
    return compareValue ?? 0;
  }

  compareContent(nodeA: TNode<T>, nodeB: TNode<T>): number {
    // different labels cannot be matched
    // TODO maybe use grammar node or other criterion
    if (nodeA.label !== nodeB.label || nodeA.grammarNode == null || nodeB.grammarNode == null) {
      return 1.0;
    }
    // compare different properties of each node and weigh the resulting
    // comparison values according to the specified grammar.

    console.assert(nodeB.grammarNode === nodeA.grammarNode);

    const grammarNode: GrammarNode = nodeA.grammarNode;

    // just by label equality, we get a good base value
    const items: Nullable<number>[] = [0];
    const weights = [100];
    const propertiesA = this.getProperties(nodeA);
    const propertiesB = this.getProperties(nodeB);
    for (const wcv of grammarNode.weightedCVs) {
      // Extract property
      const valueA = propertiesA.get(wcv.path);
      const valueB = propertiesB.get(wcv.path);
      if (valueA == null && valueB == null) {
        // do not add item or weight
        continue;
      }
      let cv: Nullable<number> = 1;
      if (!((valueA == null && valueB) || (valueA && valueB == null))) {
        switch (wcv.comparisonType) {
          case ComparisonType.ALL_OR_NOTHING:
            cv = valueA === valueB ? 0 : 1;
            break;
          case ComparisonType.LCS:
            cv = this.compareLcs([...valueA!!], [...valueB!!]);
            break;
          case ComparisonType.GATE:
            if (valueA !== valueB) {
              return 1.0;
            }
            break;
          case ComparisonType.NUMERIC:
            if (valueA == null || valueB == null) {
              // assume best case
              cv = 0;
              break;
            }
            const large = Math.max(parseInt(valueA), parseInt(valueB));
            const small = Math.min(parseInt(valueA), parseInt(valueB));

            if (large === 0) {
              cv = 0;
            } else {
              cv = 1 - small / large;
            }
            break;
          default:
            throw new UnimplementedError();
        }
      }
      items.push(cv);
      weights.push(wcv.weight);
    }

    // default value of 0, if there is nothing to compare, they are sufficiently equal
    return this.weightedAverage(items, weights, 0);
  }

  /**
   * Compare the position of two nodes, determined by their paths.
   */
  comparePosition(nodeA: TNode<T>, nodeB: TNode<T>): number {
    const radius = this.options.PATH_COMPARE_RANGE;

    // exclude the compared nodes
    const slices = [nodeA, nodeB].map((node) =>
      node
        .path(radius + 1)
        .reverse()
        .slice(1)
        .map(
          (n: TNode<T>) =>
            (this.options.USE_CONTENT_HASH_FOR_PATH_COMPARISON ? this.getContentHash(n) : n.label) +
            // Consider position if ordered
            (!n.isRoot() && n.grammarNode?.ordered ? n.getIndex().toString() : '')
        )
    );
    return this.comparePathLcs(slices[0], slices[1]);
  }

  compareSize(nodeA: TNode<T>, nodeB: TNode<T>): number {
    return this.getSize(nodeA) - this.getSize(nodeB);
  }

  /**
   * Compute the weighted average for a set of comparison values and weights.
   */
  weightedAverage(items: Nullable<number>[], weights: number[], defaultValue = 0): number {
    let itemSum = 0;
    let weightSum = 0;
    for (let i = 0; i < items.length; i++) {
      if (items[i] != null) {
        // Perfect matches receive a boost for their weight.
        const adjustedWeight =
          (items[i] === 0 ? this.options.WEIGHT_BOOST_MULTIPLIER : 1) * weights[i];
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
    return 1 - this.lcsLib.getLcsLength(seqA!!, seqB!!) / maxLength;
  }

  /**
   * Because the path compare range is constant, the corresponding LCS
   * computation can be accelerated.
   */
  private comparePathLcs(pathA: any[], pathB: any[]): number {
    const maxLength = Math.max(pathA.length, pathB.length);
    if (maxLength === 0) return 0;
    return 1 - this.lcsLib.getLcsLengthFast(pathA, pathB) / maxLength;
  }
}
