import TNode from '../tree/TNode.js';
import ICacheFacade from '../cache/ICacheFacade.js';
import ICompareOptions from './ICompareOptions';

export default interface IComparator extends ICacheFacade {

  compare(nodeA: TNode, nodeB: TNode): number;

  compareSize(nodeA: TNode, nodeB: TNode): number;

  comparePosition(nodeA: TNode, nodeB: TNode): number;

  compareContent(nodeA: TNode, nodeB: TNode): number;

  weightedAverage(items: (number | nu)[], weights: number[], defaultValue ?: number): number;

  compareCommonality(nodeA: TNode, nodeB: TNode): number;

}