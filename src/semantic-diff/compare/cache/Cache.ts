import ICache from './ICache';
import TNode from '../../tree/TNode';
import SizeExtractor from './extractor/SizeExtractor';
import HashExtractor from './extractor/HashExtractor';
import ContentHashExtractor from './extractor/ContentHashExtractor';
import PropertyExtractor from './extractor/PropertyExtractor';
import { Nullable } from '../../Types';

export default class Cache<T> implements ICache<T> {
  private hashExtractor = new HashExtractor();
  private contentHashExtractor = new ContentHashExtractor();
  private sizeExtractor = new SizeExtractor();
  private propertyExtractor = new PropertyExtractor();

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
