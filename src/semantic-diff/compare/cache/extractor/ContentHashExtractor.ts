import TNode from '../../../tree/TNode';
import { stringHash } from '../../../lib/StringHash';
import CachingExtractor from './CachingExtractor';
import PropertyExtractor from './PropertyExtractor';

export default class ContentHashExtractor<T> extends CachingExtractor<number, T> {
  constructor(private readonly propertyExtractor: PropertyExtractor<T>) {
    super();
  }

  protected computeValue(node: TNode<T>) {
    this.valueMap.set(node, this.contentHash(node));
  }

  private contentHash(node: TNode<T>) {
    let content = node.label;
    if (!node.isPropertyNode()) {
      const sortedPropertyEntries = [...this.propertyExtractor.get(node)].sort(([a, b], [c, d]) => {
        const firstComp = a.localeCompare(c);
        if (firstComp !== 0) {
          return firstComp;
        }
        if (b == null && d == null) {
          return 0;
        } else if (b == null) {
          return -1;
        } else if (d == null) {
          return 1;
        } else {
          return b.localeCompare(d);
        }
      });
      for (const [key, val] of sortedPropertyEntries) {
        content += key + '=' + val;
      }
    }
    return stringHash(content);
  }
}
