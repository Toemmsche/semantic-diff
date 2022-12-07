import CachingExtractor from './CachingExtractor';
import {arraySum} from '../../../Util';
import TNode from '../../../tree/TNode';

export default class SizeExtractor<T> extends CachingExtractor<number, T> {
  protected computeValue(node: TNode<T>): void {
    this.valueMap.set(
        node,
        1 + node.children.map(child => this.get(child)).reduce(arraySum, 0)
    );
  }
}