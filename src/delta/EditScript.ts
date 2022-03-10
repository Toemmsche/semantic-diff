import {EditOperation} from "./EditOperation.js";
import ChangeType from "./ChangeType.js";
import TNode from "../tree/TNode.js"

export class EditScript {

    constructor(private editOperations: EditOperation[] = [], private cost: number = 0) {
    }

    appendDeletion(deletedNode: TNode): void {
        this.editOperations.push(
            new EditOperation(
                ChangeType.DELETION,
                deletedNode.xPath()
            ));
        this.cost += deletedNode.size();
    }

    appendInsertion(insertedNode: TNode): void {
        this.editOperations.push(
            new EditOperation(
                ChangeType.INSERTION,
                undefined,
                insertedNode.xPath(),
                insertedNode.copy(),
            ));
        this.cost += insertedNode.size();
    }


    appendMove(oldPath: string, newPath: string): void {
        this.editOperations.push(
            new EditOperation(
                ChangeType.MOVE,
                oldPath,
                newPath,
            ));
        this.cost++;
    }

    appendUpdate(updatedNode: TNode) {
        this.editOperations.push(
            new EditOperation(
               ChangeType.UPDATE,
                updatedNode.xPath(),
                undefined,
                updatedNode.copy(false),
            ));
        this.cost++;
    }

    deletions() {
        return this
            .editOperations
            .filter((editOp) => editOp.isDeletion())
            .length;
    }

    insertions() {
        return this
            .editOperations
            .filter((editOp) => editOp.isInsertion())
            .length;
    }


    moves() {
        return this
            .editOperations
            .filter((editOp) => editOp.isMove())
            .length;
    }

    size() {
        return this.editOperations.length;
    }

    updates() {
        return this
            .editOperations
            .filter((editOp) => editOp.isUpdate())
            .length;
    }
}
