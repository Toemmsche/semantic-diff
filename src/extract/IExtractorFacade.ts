import TNode from '../tree/TNode.js';

export default interface IExtractorFacade {
  getHash(node: TNode): number;

  getContentHash(node: TNode): number;

  getSize(node: TNode): number;
}