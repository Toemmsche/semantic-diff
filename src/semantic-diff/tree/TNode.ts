import GrammarNode from '../grammar/GrammarNode';
import {arraySum} from '../Util';
import IData from "../data/IData";
import ICopyable from "../data/ICopyable";
import NodeType from "../grammar/NodeType";
import {Nullable} from "../Types";
import DiffState from "../delta/DiffState";

export class TNodeBuilder<T> {


    private _children: TNode<T>[] = [];

    private _data: Nullable<T>;

    private _grammarNode: Nullable<GrammarNode>;

    children (children: TNode<T>[]): TNodeBuilder<T> {
        this._children = children;
        return this;
    }

    data (data: T): TNodeBuilder<T> {
        this._data = data;
        return this;
    }

    grammarNode (grammarNode: GrammarNode): TNodeBuilder<T> {
        this._grammarNode = grammarNode;
        return this;
    }

    build (): TNode<T> {
        if (!this._data) {
            throw new Error("Missing data");
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
    protected _matchPartner: Nullable<TNode<T>> = null;
    protected readonly _children: TNode<T>[] = [];
    protected _parent: Nullable<TNode<T>> = null;
    private _index: number | null = null;

    public constructor (public data: T, // data fully modifiable for now
                        public readonly grammarNode: Nullable<GrammarNode>
    ) {
    }

    /* TODO remove these */

    get label (): string {
        return (this.data as IData & ICopyable<T>).label;
    }

    get text (): Nullable<string> {
        return (this.data as IData & ICopyable<T>).text;
    }

    set text (text: Nullable<string>) {
        (this.data as IData & ICopyable<T>).text = text;
    }

    get attributes (): Map<string, string> {
        return (this.data as IData & ICopyable<T>).attributes;
    }

    appendChild (child: TNode<T>): void {
        child._parent = this;
        child._index = this._children.length;
        this._children.push(child);
    }

    get children (): TNode<T>[] {
        return this._children;
    }


    accessProperty (path: string): Nullable<string> {
        // We assume that descending according to the path is always unambiguous
        // TODO performance improvements
        const pathNodes = path.split('/');
        let node: Nullable<TNode<T>> = this;
        for (const pathNode of pathNodes) {
            // Termination conditions
            if (pathNode === '#text' || pathNode === '') {
                return node.text;
            }
            if (pathNode.startsWith('@_')) {
                const attributeName = pathNode.replace('@_', '');
                return node.attributes.get(attributeName);
            }
            node = node._children.find((child) => child.label === pathNode);
            if (!node) {
                return null;
            }
        }
        return node.text;
    }

    copy (includeChildren: Boolean = true): TNode<T> {
        const dataCopy = (this.data as IData & ICopyable<T>).copy();
        // grammar node stays the same
        const copy = new TNode<T>(dataCopy, this.grammarNode);
        if (includeChildren) {
            // appendChild sets parent and index
            this._children.forEach(child => copy.appendChild(child.copy()));
        }
        return copy;
    }

    xPath (): string {
        // discard root node
        return this.path()
                   .slice(1)
                   .map(node => node._index)
                   .join('/');
    }

    path (limit ?: number) {
        const pathArr = [];
        let node: Nullable<TNode<T>> = this;
        while (node != null && (limit == null || pathArr.length < limit)) {
            pathArr.push(node);
            node = node._parent;
        }
        // this node is always last in path
        return pathArr.reverse();
    }

    size (): number {
        return 1 + this._children.map(child => child.size())
                       .reduce(arraySum, 0);
    }

    toPreOrderArray (arr: TNode<T>[] = []): TNode<T>[] {
        arr.push(this);
        for (const child of this._children) {
            child.toPreOrderArray(arr);
        }
        return arr;
    }

    toPostOrderArray (arr: TNode<T>[] = []): TNode<T>[] {
        for (const child of this._children) {
            child.toPostOrderArray(arr);
        }
        arr.push(this);
        return arr;
    }

    removeFromParent (): void {
        this._parent!!._children.splice(this._index!!, 1);
        this._parent!!.adjustChildIndices();
    }

    childAt (index: number): TNode<T> {
        return this._children[index];
    }

    getIndex (): number {
        return this._index!!;
    }

    setIndex (index: number): void {
        throw new Error('unimplemented');
    }

    getParent (): TNode<T> {
        return this._parent!!;
    }

    insertChild (newIndex: number, newChild: TNode<T>): void {
        this._children.splice(newIndex, 0, newChild);
        this.adjustChildIndices();
    }

    getSiblings (): TNode<T>[] {
        if (!this._parent) {
            return [];
        }
        return this._parent._children;
    }

    isRoot (): boolean {
        return !this._parent;
    }

    hasInternalOrdering () {
        // Assume no ordering for property nodes
        return this.grammarNode != null && this.grammarNode?.ordered;
    }

    isPropertyNode (): boolean {
        return !this.grammarNode;
    }

    isLeaf (): boolean {
        return this.grammarNode != null && this.grammarNode.type === NodeType.LEAF;
    }

    nonPropertyNodes (): TNode<T>[] {
        return this.toPreOrderArray().filter(node => !node.isPropertyNode());
    }

    leaves (): TNode<T>[] {
        return this.toPreOrderArray().filter(node => node.isLeaf());
    }

    contentEquals (other: TNode<T>): boolean {
        return (this.data as IData & ICopyable<T>).equals(other.data);
    }

    degree (): number {
        return this._children.length;
    }

    changeIndex (newIndex: number) {
        // delete
        this._parent!!._children.splice(this._index!!, 1);
        // insert
        this._parent!!._children.splice(newIndex, 0, this);
        // adjust indices of all children
        this._parent!!.adjustChildIndices();
    }

    getLeftSibling (): Nullable<TNode<T>> {
        return this.getSiblings()[this._index!! - 1];
    }

    getRightSibling (): Nullable<TNode<T>> {
        return this.getSiblings()[this._index!! + 1];
    }

    [Symbol.iterator] () {
        return this._children[Symbol.iterator]();
    }

    /* =============== MATCHING STUFF ================== */

    matchTo (other: TNode<T>): boolean {
        if (this._matchPartner || other._matchPartner) {
            return false;
        }
        // Bijective matching
        this._matchPartner = other;
        other._matchPartner = this;
        return true;
    }

    getMatch (): TNode<T> {
        return this._matchPartner!!;
    }

    isMatchedTo (other: TNode<T>): boolean {
        return this._matchPartner === other;
    }

    isMatched (): boolean {
        return !!this._matchPartner;
    }

    getMatchingMap (): Map<TNode<T>, TNode<T>> {
        return new Map(this.toPreOrderArray()
                           .filter(node => node.isMatched())
                           .map(node => [
                               node,
                               node.getMatch()
                           ])
        );
    }

    verifyMatching (): boolean {
        return !this._matchPartner || (this.getMatch().isMatchedTo(this));
    }

    getDiffState (): DiffState {
        if (this._matchPartner) {
            let move;
            // for typescript
            if (this._parent == null || this._matchPartner._parent == null) {
                move = !(this.isRoot() && this._matchPartner.isRoot());
            } else if (this._parent.isMatched()) {
                move = this._parent.getMatch() !== this._matchPartner._parent;
            } else {
                // the parents cannot be matched to each other
                move = true;
            }
            const update = !this.contentEquals(this._matchPartner);
            if (move && update) {
                return DiffState.MOVED_AND_UPDATED;
            } else if (move) {
                return DiffState.MOVED;
            } else if (update) {
                return DiffState.UPDATED;
            } else {
                return DiffState.IDENTICAL;
            }
        } else {
            return DiffState.ADDED_OR_REMOVED;
        }
    }

    private adjustChildIndices (): void {
        // Set children's parent and index
        for (const [i, child] of this._children.entries()) {
            child._parent = this;
            child._index = i;
        }
    }

}