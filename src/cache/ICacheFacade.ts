import TNode from '../tree/TNode.js';

export default interface ICacheFacade {
  getHash(node: TNode): number;

  getContentHash(node: TNode): number;

  getSize(node: TNode): number;

  getProperties(node: TNode) : Map<string, string  | nu>;
}