import IExtractorFacade from './IExtractorFacade.js';
import TNode from '../tree/TNode.js';
import SizeExtractor from './SizeExtractor.js';
import HashExtractor from './HashExtractor.js';
import ContentHashExtractor from './ContentHashExtractor.js';
import PropertyExtractor from './PropertyExtractor.js';

export default class Extractor implements IExtractorFacade {

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