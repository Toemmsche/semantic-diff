import GrammarNode from '../grammar/GrammarNode.js';
import {arraySum} from '../Util.js';
import NodeType from '../grammar/NodeType.js';

export default class TNode {

  private matchPartner ?: TNode;

  constructor(public label: string,
              public children: TNode[] = [],
              public text ?: string,
              public attributes: Map<String, string> = new Map(),
              private grammarNode ?: GrammarNode, // property node if undefined
              private parent ?: TNode,
              private index ?: number,
  ) {
    this.adjustChildIndices();
  }

  getGrammarNode(): GrammarNode {
    return this.grammarNode!!;
  }

  appendChild(node: TNode): void {
    this.children.push(node);
  }

  accessProperty(path: string): string | nu {
    // We assume that descending according to the path is always unambiguous
    // TODO performance improvements
    const pathNodes = path.split('/');
    let node: TNode | nu = this;
    for (const pathNode of pathNodes) {
      // Termination conditions
      if (pathNode === '#text' || pathNode === '') {
        return node.text;
      }
      if (pathNode.startsWith('@_')) {
        const attributeName = pathNode.replace('@_', '');
        return node.attributes.get(attributeName);
      }
      node = node.children.find((child) => child.label === pathNode);
      if (!node) {
        return null;
      }
    }
    return node.text;
  }

  toJson(): string {
    // Avoid circular JSON
    function replacer(key: string, value: any) {
      if (key === 'parent') {
        return undefined;
      }
      return value;
    }

    return JSON.stringify(this, replacer);
  }

  copy(includeChildren: Boolean = true): TNode {
    let childCopies: TNode[] = [];
    if (includeChildren) {
      childCopies = this.children.map(child => child.copy(includeChildren));
    }
    const attributesCopy = new Map(this.attributes.entries());
    return new TNode(
        this.label,
        childCopies,
        this.text,
        attributesCopy,
        this.grammarNode
    ); // leave parent and index undefined
  }

  xPath(): string {
    // discard root node
    return this.path()
        .slice(1)
        .map((node) => node.index)
        .join('/');
  }

  path(limit ?: number) {
    const pathArr = [];
    let node: TNode | nu = this;
    while (node != null && (limit == null || pathArr.length < limit)) {
      pathArr.push(node);
      node = node.parent;
    }
    // this node is always last in path
    return pathArr.reverse();
  }

  size(): number {
    return 1 + this.children.map(child => child.size()).reduce(arraySum, 0);
  }

  toPreOrderArray(arr: TNode[] = []): TNode[] {
    arr.push(this);
    for (const child of this.children) {
      child.toPreOrderArray(arr);
    }
    return arr;
  }

  toPostOrderArray(arr: TNode[] = []): TNode[] {
    for (const child of this.children) {
      child.toPostOrderArray(arr);
    }
    arr.push(this);
    return arr;
  }

  removeFromParent(): void {
    this.parent!!.children.splice(this.index!!, 1);
    this.parent!!.adjustChildIndices();
  }

  childAt(index: number): TNode {
    return this.children[index];
  }

  getIndex(): number {
    return this.index!!;
  }

  setIndex(index: number): void {
    throw new Error('unimplemented');
  }

  getParent(): TNode {
    return this.parent!!;
  }

  insertChild(newIndex: number, newChild: TNode): void {
    this.children.splice(newIndex, 0, newChild);
    this.adjustChildIndices();
  }

  getSiblings(): TNode[] {
    if (!this.parent) {
      return [];
    }
    return this.parent.children;
  }

  isRoot(): boolean {
    return !this.parent;
  }

  contentEquals(other: TNode): boolean {
    let attributesEqual = true;
    const allKeys = new Set([
      ...this.attributes.keys(),
      ...other.attributes.keys()
    ]);
    for (const key of allKeys) {
      if (this.attributes.get(key) != other.attributes.get(key)) {
        attributesEqual = false;
        break;
      }
    }
    // Do not perform nested equality check on children
    return this.label === other.label && this.text == other.text && attributesEqual;
  }

  degree(): number {
    return this.children.length;
  }

  changeIndex(newIndex: number) {
    // delete
    this.parent!!.children.splice(this.index!!, 1);
    // insert
    this.parent!!.children.splice(newIndex, 0, this);
    // adjust indices of all children
    this.parent!!.adjustChildIndices();
  }

  hasInternalOrdering() {
    // TODO
    return undefined;
  }

  isPropertyNode(): boolean {
    return !this.grammarNode;
  }

  isLeaf(): boolean {
    return this.grammarNode != null && this.grammarNode.type === NodeType.LEAF;
  }

  nonPropertyNodes(): TNode[] {
    return this.toPreOrderArray().filter(node => !node.isPropertyNode());
  }

  leaves(): TNode[] {
    return this.toPreOrderArray().filter(node => node.isLeaf());
  }

  getLeftSibling(): TNode | nu {
    return this.getSiblings()[this.index!! - 1];
  }

  getRightSibling(): TNode | nu {
    return this.getSiblings()[this.index!! + 1];
  }

  [Symbol.iterator]() {
    return this.children[Symbol.iterator]();
  }

  /* =============== MATCHING STUFF ================== */

  matchTo(other: TNode): boolean {
    if (this.matchPartner || other.matchPartner) {
      return false;
    }
    // Bijective matching
    this.matchPartner = other;
    other.matchPartner = this;
    return true;
  }

  getMatch(): TNode {
    return this.matchPartner!!;
  }

  isMatchedTo(other: TNode): boolean {
    return this.matchPartner === other;
  }

  isMatched(): boolean {
    return !!this.matchPartner;
  }

  getMatchingMap(): Map<TNode, TNode> {
    return new Map(this.toPreOrderArray()
        .filter(node => node.isMatched())
        .map(node => [
          node,
          node.getMatch()
        ])
    );
  }

  verifyMatching(): boolean {
    return !this.matchPartner || (this.getMatch().isMatchedTo(this));
  }

  private adjustChildIndices(): void {
    // Set children's parent and index
    for (const [i, child] of this.children.entries()) {
      child.parent = this;
      child.index = i;
    }
  }

}