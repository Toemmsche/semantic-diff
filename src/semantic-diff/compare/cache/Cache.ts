import ICache from './ICache';
import TNode from '../../tree/TNode';
import SizeExtractor from './extractor/SizeExtractor';
import TreeHashExtractor from './extractor/TreeHashExtractor';
import ContentHashExtractor from './extractor/ContentHashExtractor';
import PropertyExtractor from './extractor/PropertyExtractor';
import { Nullable } from '../../Types';

export default class Cache<T> implements ICache<T> {
  private readonly propertyExtractor = new PropertyExtractor();
  private readonly contentHashExtractor = new ContentHashExtractor(this.propertyExtractor);
  private readonly hashExtractor = new TreeHashExtractor(this.contentHashExtractor);
  private readonly sizeExtractor = new SizeExtractor();

  getHash(node: TNode<T>): number {
    return this.hashExtractor.get(node);
  }

  getContentHash(node: TNode<T>): number {
    return this.contentHashExtractor.get(node);
  }

  getSize(node: TNode<T>): number {
    return this.sizeExtractor.get(node);
  }

  getProperties(node: TNode<T>): Map<string, Nullable<string>> {
    return this.propertyExtractor.get(node);
  }
}
