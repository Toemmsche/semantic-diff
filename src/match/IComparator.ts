import TNode from '../tree/TNode.js';
import IExtractorFacade from '../extract/IExtractorFacade.js';

export default interface IComparator extends IExtractorFacade {

  compare(nodeA: TNode, nodeB: TNode): number;

  compareSize(nodeA: TNode, nodeB: TNode): number;

  comparePosition(nodeA: TNode, nodeB: TNode): number;

  compareContent(nodeA: TNode, nodeB: TNode): number;

  weightedAverage(items: (number | nu)[], weights: number[], defaultValue ?: number): number;

}