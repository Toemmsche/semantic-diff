import TNode from '../tree/TNode.js';
import {stringHash} from '../lib/StringHash.js';
import AbstractExtractor from './AbstractExtractor.js';

export default class ContentHashExtractor extends AbstractExtractor<number> {
  protected computeValue(node: TNode) {
    this.valueMap.set(node, this.contentHash(node));
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