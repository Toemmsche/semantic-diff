import TNode from '../../../tree/TNode';
import { stringHash } from '../../../lib/StringHash';
import CachingExtractor from './CachingExtractor';
import { Nullable } from '../../../Types';
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
      const propertyMap = this.propertyExtractor.get(node);
      for (const [key, val] of propertyMap) {
        content += key + '=' + val;
      }
    }
    return stringHash(content);
  }
}
