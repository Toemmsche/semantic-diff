import TNode from '../../../tree/TNode';

export default abstract class CachingExtractor<D, T> {

  protected valueMap = new Map<TNode<T>, D>();

  public get(node: TNode<T>): D {
    if (!this.valueMap.has(node)) {
      this.computeValue(node);
    }
    return this.valueMap.get(node)!!;
  }

  protected abstract computeValue(node: TNode<T>): void;
}
