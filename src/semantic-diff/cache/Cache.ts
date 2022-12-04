import ICacheFacade from './ICacheFacade';
import TNode from '../tree/TNode';
import SizeExtractor from './extractor/SizeExtractor';
import HashExtractor from './extractor/HashExtractor';
import ContentHashExtractor from './extractor/ContentHashExtractor';
import PropertyExtractor from './extractor/PropertyExtractor';

export default class Extract implements ICacheFacade {

  private hashExtractor = new HashExtractor();
  private contentHashExtractor = new ContentHashExtractor();
  private sizeExtractor = new SizeExtractor();
  private propertyExtractor = new PropertyExtractor();

  getHash(node: TNode): number {
    return this.hashExtractor.get(node);
  }

  getContentHash(node: TNode): number {
    return this.contentHashExtractor.get(node);
  }

  getSize(node: TNode): number {
    return this.sizeExtractor.get(node);
  }

  getProperties(node: TNode) : Map<string, string  | nu> {
    return this.propertyExtractor.get(node);
  }

}