import { EditOperation } from './EditOperation';
import ChangeType from './ChangeType';
import TNode from '../tree/TNode';
import XmlData from '../data/XmlData';

export class EditScript<T> {
  private editOperations: EditOperation<T>[] = [];
  private cost: number = 0;

  constructor(editOperations: EditOperation<T>[] | undefined, cost: number | undefined) {
    if (editOperations) this.editOperations = editOperations;
    if (cost) this.cost = cost;
  }

  getCost(): number {
    return this.cost;
  }

  appendDeletion(deletedNode: TNode<T>): void {
    this.editOperations.push(new EditOperation(ChangeType.DELETION, deletedNode.xPath()));
    this.cost += deletedNode.size();
  }

  [Symbol.iterator]() {
    return this.editOperations[Symbol.iterator]();
  }

  appendInsertion(insertedNode: TNode<T>): void {
    this.editOperations.push(
      new EditOperation(ChangeType.INSERTION, undefined, insertedNode.xPath(), insertedNode.copy())
    );
    this.cost += insertedNode.size();
  }

  appendMove(oldPath: string, newPath: string): void {
    this.editOperations.push(new EditOperation(ChangeType.MOVE, oldPath, newPath));
    this.cost++;
  }

  appendUpdate(updatedNode: TNode<T>) {
    this.editOperations.push(
      new EditOperation(ChangeType.UPDATE, updatedNode.xPath(), undefined, updatedNode.copy(false))
    );
    this.cost++;
  }

  deletions() {
    return this.editOperations.filter((editOp) => editOp.isDeletion()).length;
  }

  insertions() {
    return this.editOperations.filter((editOp) => editOp.isInsertion()).length;
  }

  moves() {
    return this.editOperations.filter((editOp) => editOp.isMove()).length;
  }

  size() {
    return this.editOperations.length;
  }

  updates() {
    return this.editOperations.filter((editOp) => editOp.isUpdate()).length;
  }
}
