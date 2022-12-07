import TNode from '../tree/TNode';
import ICache from './cache/ICache';
import ICompareOptions from './ICompareOptions';
import {Nullable} from "../Types";

export default interface IComparator<T> extends ICache<T> {

  compare(nodeA: TNode<T>, nodeB: TNode<T>): number;

  compareSize(nodeA: TNode<T>, nodeB: TNode<T>): number;

  comparePosition(nodeA: TNode<T>, nodeB: TNode<T>): number;

  compareContent(nodeA: TNode<T>, nodeB: TNode<T>): number;

  weightedAverage(items: Nullable<number>[], weights: number[], defaultValue ?: number): number;

  compareCommonality(nodeA: TNode<T>, nodeB: TNode<T>): number;

}