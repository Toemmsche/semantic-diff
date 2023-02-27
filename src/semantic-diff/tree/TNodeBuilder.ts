import { Nullable } from '../Types';
import GrammarNode from '../grammar/GrammarNode';
import TNode from './TNode';

export default class TNodeBuilder<T> {
  private _children: TNode<T>[] = [];

  private _data: Nullable<T>;

  private _grammarNode: Nullable<GrammarNode>;

  children(children: TNode<T>[]): TNodeBuilder<T> {
    this._children = children;
    return this;
  }

  data(data: T): TNodeBuilder<T> {
    this._data = data;
    return this;
  }

  grammarNode(grammarNode: GrammarNode): TNodeBuilder<T> {
    this._grammarNode = grammarNode;
    return this;
  }

  build(): TNode<T> {
    if (!this._data) {
      throw new Error('Missing state');
    }
    const node = new TNode<T>(this._data, this._grammarNode);
    for (const child of this._children) {
      node.appendChild(child);
    }
    return node;
  }
}
