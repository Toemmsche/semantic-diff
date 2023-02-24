import GrammarNode from '../grammar/GrammarNode';
import IData from '../data/IData';
import ICopyable from '../data/ICopyable';
import NodeType from '../grammar/NodeType';
import { Nullable } from '../Types';
import Origin from './Origin';

export class TNodeBuilder<T> {
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

export default class TNode<T> {
  // Every node is matchable, this is fundamental to our approach
  private readonly _matches: TNode<T>[] = [];

  // will be set by matcher
  private _origin: Origin = new Origin(-1, -1, '');
  private readonly _children: TNode<T>[] = [];
  private _parent: Nullable<TNode<T>> = null;
  private _index: number | null = null;

  public constructor(
    public data: T, // state fully modifiable for now
    public readonly grammarNode: Nullable<GrammarNode>
  ) {}

  /* TODO remove these */

  get label(): string {
    return (this.data as IData & ICopyable<T>).label;
  }

  get text(): Nullable<string> {
    return (this.data as IData & ICopyable<T>).text;
  }

  set text(text: Nullable<string>) {
    (this.data as IData & ICopyable<T>).text = text;
  }

  get attributes(): Map<string, string> {
    return (this.data as IData & ICopyable<T>).attributes;
  }

  appendChild(child: TNode<T>): void {
    child._parent = this;
    child._index = this._children.length;
    this._children.push(child);
  }

  get children(): TNode<T>[] {
    return this._children;
  }

  get matches(): TNode<T>[] {
    return this._matches;
  }

  get origin(): Origin {
    return this._origin;
  }

  set origin(origin: Origin) {
    this._origin = origin;
  }

  get sourceIndex(): number {
    return this.origin.sourceIndex;
  }

  copy(includeChildren = true): TNode<T> {
    const dataCopy = (this.data as IData & ICopyable<T>).copy();
    // grammar node stays the same
    const copy = new TNode<T>(dataCopy, this.grammarNode);
    if (includeChildren) {
      // appendChild sets parent and index
      this._children.forEach((child) => copy.appendChild(child.copy()));
    }
    return copy;
  }

  xPath(): string {
    // discard root node
    return this.path()
      .slice(1)
      .map((node) => node._index)
      .join('/');
  }

  path(limit?: number) {
    const pathArr = [];
    let node: Nullable<TNode<T>> = this;
    while (node != null && (limit == null || pathArr.length < limit)) {
      pathArr.push(node);
      node = node._parent;
    }
    // this node is always last in path
    return pathArr.reverse();
  }

  size(): number {
    return this.toPreOrderUnique().length;
  }

  toPreOrderUnique(nodeSet = new Set<TNode<T>>()): TNode<T>[] {
    // early return
    if (nodeSet.has(this)) {
      return Array.from(nodeSet);
    }

    nodeSet.add(this);

    for (const child of this._children) {
      child.toPreOrderUnique(nodeSet);
    }

    return Array.from(nodeSet);
  }

  toPostOrderUnique(nodeSet = new Set<TNode<T>>()): TNode<T>[] {
    if (!nodeSet.has(this)) {
      for (const child of this._children) {
        child.toPostOrderUnique(nodeSet);
      }
      nodeSet.add(this);
    }
    return Array.from(nodeSet);
  }

  removeFromParent(): void {
    this._parent!._children.splice(this._index!, 1);
    this._parent!.adjustChildIndices();
  }

  childAt(index: number): TNode<T> {
    return this._children[index];
  }

  getIndex(): number {
    return this._index!;
  }

  setIndex(index: number): void {
    throw new Error('unimplemented');
  }

  getParent(): TNode<T> {
    return this._parent!;
  }

  insertChild(newIndex: number, newChild: TNode<T>): void {
    this._children.splice(newIndex, 0, newChild);
    this.adjustChildIndices();
  }

  getSiblings(): TNode<T>[] {
    if (!this._parent) {
      return [];
    }
    return this._parent._children;
  }

  isRoot(): boolean {
    return !this._parent;
  }

  hasInternalOrdering() {
    // Assume no ordering for property nodes
    return this.grammarNode != null && this.grammarNode?.ordered;
  }

  isPropertyNode(): boolean {
    return !this.grammarNode;
  }

  isLeaf(): boolean {
    if (this.children.length > 0 && this.grammarNode == null) {
      console.warn('broken_leaf', this.label);
    }
    return this.grammarNode != null && this.grammarNode.type === NodeType.LEAF;
  }

  nonPropertyNodes(): TNode<T>[] {
    return this.toPreOrderUnique().filter((node) => !node.isPropertyNode());
  }

  leaves(): TNode<T>[] {
    return this.toPreOrderUnique().filter((node) => node.isLeaf());
  }

  contentEquals(other: TNode<T>): boolean {
    return (this.data as IData & ICopyable<T>).equals(other.data);
  }

  degree(): number {
    return this._children.length;
  }

  changeIndex(newIndex: number) {
    // delete
    this._parent!._children.splice(this._index!, 1);
    // insert
    this._parent!._children.splice(newIndex, 0, this);
    // adjust indices of all children
    this._parent!.adjustChildIndices();
  }

  getLeftSibling(): Nullable<TNode<T>> {
    return this.getSiblings()[this._index! - 1];
  }

  getRightSibling(): Nullable<TNode<T>> {
    return this.getSiblings()[this._index! + 1];
  }

  [Symbol.iterator]() {
    return this._children[Symbol.iterator]();
  }

  private adjustChildIndices(): void {
    // Set children's parent and index
    for (const [i, child] of this._children.entries()) {
      child._parent = this;
      child._index = i;
    }
  }

  /* =============== MATCHING STUFF ================== */

  matchTo(other: TNode<T>): boolean {
    if (this.isMatchedTo(other)) {
      return false;
    }
    // if the set contains two nodes from the same tree, do not match at all
    if (
      other.sourceIndex >= 0 &&
      (other.sourceIndex === this.sourceIndex ||
        this.getGroupSourceIndices().includes(other.sourceIndex))
    ) {
      console.warn('match_set_same_tree');
      return false;
    }
    // TODO ensure a complete matching
    this._matches.push(other);
    other._matches.push(this);
    return true;
  }

  getSingleMatch(): TNode<T> {
    // at max one match for the "traditional" method
    if (this._matches.length > 1) {
      throw new Error('single_match_multiple_partners');
    } else if (this._matches.length === 0) {
      throw new Error('single_match_no_partner');
    }
    return this._matches[0];
  }

  isMatchedTo(other: TNode<T>): boolean {
    return this._matches.includes(other);
  }

  isMatched(): boolean {
    return this._matches.length > 0;
  }

  getSingleMatchingMap(): Map<TNode<T>, TNode<T>> {
    return new Map(
      this.toPreOrderUnique()
        .filter((node) => node.isMatched())
        .map((node) => [node, node.getSingleMatch()])
    );
  }

  verifySingleMatching(): boolean {
    return (
      !this.isMatched() || (this.matches.length === 1 && this.getSingleMatch().isMatchedTo(this))
    );
  }

  // =============== NWAY STUFF =================

  appendChildExtra(node: TNode<T>): void {
    // append without setting parent or index
    this.children.push(node);
  }

  getMatchGroup(): TNode<T>[] {
    return [this, ...this._matches];
  }

  getGroupSourceIndices(): number[] {
    return this.getMatchGroup()
      .map((n) => n.sourceIndex)
      .sort();
  }

  getMetaNode(): TNode<T> {
    return this.getMatchGroup().sort((a, b) => a.sourceIndex - b.sourceIndex)[0];
  }

  resetMatches() {
    // remove everything
    this._matches.splice(0, this._matches.length);
  }

  get workingIndex(): number {
    return this.origin.workingIndex;
  }

  set workingIndex(index: number) {
    this.origin.workingIndex = index;
  }

  public getAdjacentHigherMatch(): Nullable<TNode<T>> {
    const candidates = [...this._matches].filter((m) => m.workingIndex === this.workingIndex + 1);
    if (candidates.length > 0) {
      return candidates[0];
    }
    return null;
  }

  public getAdjacentLowerMatch(): Nullable<TNode<T>> {
    const candidates = [...this._matches].filter((m) => m.workingIndex === this.workingIndex - 1);
    if (candidates.length > 0) {
      return candidates[0];
    }
    return null;
  }
}
