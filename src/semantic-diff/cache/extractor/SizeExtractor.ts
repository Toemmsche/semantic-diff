import AbstractCachingExtractor from './AbstractCachingExtractor';
import {arraySum} from '../../Util';
import TNode from '../../tree/TNode';

export default class SizeExtractor extends AbstractCachingExtractor<number> {
  protected computeValue(node: TNode): void {
    this.valueMap.set(
        node,
        1 + node.children.map(child => this.get(child)).reduce(arraySum, 0)
    );
  }
}