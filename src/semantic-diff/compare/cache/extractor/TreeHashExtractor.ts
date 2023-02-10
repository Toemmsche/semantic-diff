import CachingExtractor from './CachingExtractor';
import { getPrimes } from '../../../lib/PrimeGenerator';
import TNode from '../../../tree/TNode';
import { stringHash } from '../../../lib/StringHash';
import ContentHashExtractor from './ContentHashExtractor';

export default class TreeHashExtractor<T> extends CachingExtractor<number, T> {
  constructor(private readonly contentHashExtractor: ContentHashExtractor<T>) {
    super();
  }

  protected computeValue(node: TNode<T>): void {
    this.valueMap.set(node, this.contentHashExtractor.get(node) + this.childHash(node));
  }

  private childHash(node: TNode<T>) {
    let childHash;
    if (node.hasInternalOrdering()) {
      // Respect order by multiplying child hashes with distinct prime number
      // based on index
      const primes = getPrimes(node.degree());
      childHash = node.children
        // Use child hash value
        .map((child, i) => this.get(child) * primes[i])
        .reduce((prev, curr) => prev + curr, 0);
    } else {
      // Arbitrary order, achieved by simple addition
      childHash = node.children
        // Use child hash value
        .map((child) => this.get(child))
        .reduce((prev, curr) => prev + curr, 0);
    }
    return childHash;
  }
}
