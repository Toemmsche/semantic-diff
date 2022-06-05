import AbstractCachingExtractor from './AbstractCachingExtractor.js';
import {getPrimes} from '../../lib/PrimeGenerator.js';
import TNode from '../../tree/TNode.js';
import {stringHash} from '../../lib/StringHash.js';

export default class HashExtractor extends AbstractCachingExtractor<number> {

  protected computeValue(node: TNode): void {
    this.valueMap.set(node, this.contentHash(node) + this.childHash(node));
  }

  private childHash(node: TNode) {
    let childHash;
    if (node.hasInternalOrdering()) {
      // Respect order by multiplying child hashes with distinct prime number
      // based on index
      const primes = getPrimes(node.degree());
      childHash = node
          .children
          // Use child hash value
          .map((child, i) => this.get(child) * primes[i])
          .reduce((prev, curr) => prev + curr, 0);
    } else {
      // Arbitrary order, achieved by simple addition
      childHash = node
          .children
          // Use child hash value
          .map((child) => this.get(child))
          .reduce((prev, curr) => prev + curr, 0);
    }
    return childHash;
  }

  private contentHash(node: TNode) {
    let content = node.label;
    // Attribute order is irrelevant
    const sortedAttrList =
        [...node.attributes.keys()]
            // TODO
            .filter((key) => key !== 'xmlns') // Ignore namespaces
            .sort();
    for (const key of sortedAttrList) {
      content += key + '=' + node.attributes.get(key);
    }
    if (node.text != null) {
      content += node.text;
    }
    return stringHash(content);
  }

}