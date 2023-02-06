// Abstract union find implementation
export default class UnionFind<T> {
  private readonly _size: Map<T, number>;
  private readonly _parent: Map<T, T>;

  constructor() {
    this._size = new Map();
    this._parent = new Map();
  }

  public find(element: T): T {
    let curr = element;
    while (this._parent.has(curr)) {
      curr = this._parent.get(curr)!;
    }
    const root = curr;

    // apply path compression
    curr = element;
    while (this._parent.has(curr)) {
      const next = this._parent.get(curr)!;
      this._parent.set(curr, root);
      curr = next;
    }

    return root;
  }

  public union(a: T, b: T): void {
    let rootA = this.find(a);
    let rootB = this.find(b);
    if (rootA === rootB) {
      // nothing to do
      return;
    }

    let sizeA = this._size.has(a) ? this._size.get(a)! : 1;
    let sizeB = this._size.has(b) ? this._size.get(b)! : 1;

    if (sizeB > sizeA) {
      // swap
      [rootA, rootB, sizeA, sizeB] = [rootB, rootA, sizeB, sizeA];
    }
    this._parent.set(rootB, rootA);
    this._size.set(rootA, sizeA + sizeB);
  }

  public size(element: T): number {
    return this._size.has(element) ? this._size.get(element)! : 1;
  }
}
