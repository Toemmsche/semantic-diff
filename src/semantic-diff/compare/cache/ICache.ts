import TNode from '../../tree/TNode';
import ICopyable from "../../data/ICopyable";
import IData from "../../data/IData";
import {Nullable} from "../../Types";

export default interface ICache<T> {
  getHash(node: TNode<T>): number;

  getContentHash(node: TNode<T>): number;

  getSize(node: TNode<T>): number;

  getProperties(node: TNode<T>) : Map<string, Nullable<string>>;
}