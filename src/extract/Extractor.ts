import IExtractorFacade from "./IExtractorFacade.js";
import TNode from "../tree/TNode.js";
import SizeExtractor from "./SizeExtractor.js";
import HashExtractor from "./HashExtractor.js";
import ContentHashExtractor from "./ContentHashExtractor.js";

export default class Extractor implements IExtractorFacade {

    private hashExtractor = new HashExtractor();
    getHash(node: TNode): number {
        return this.hashExtractor.get(node);
    }

    private contentHashExtractor = new ContentHashExtractor();
    getContentHash(node: TNode): number {
        return this.contentHashExtractor.get(node);
    }

    private sizeExtractor = new SizeExtractor();
    getSize(node: TNode): number {
        return this.sizeExtractor.get(node);
    }

}