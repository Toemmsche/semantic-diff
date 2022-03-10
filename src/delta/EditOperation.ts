import ChangeType from "./ChangeType.js";
import TNode from "../tree/TNode.js"

export class EditOperation {

    constructor(
        public type: ChangeType,
        public oldPath ?: string,
        public newPath ?: string,
        public newContent ?: TNode,
    ) {
    }

    isDeletion(): Boolean {
        return this.type === ChangeType.DELETION;
    }

    isInsertion(): Boolean {
        return this.type === ChangeType.INSERTION;
    }

    isMove(): Boolean {
        return this.type === ChangeType.MOVE;
    }

    isUpdate(): Boolean {
        return this.type === ChangeType.UPDATE;
    }

    toString(): string {
        return this.type + " " +
            (this.oldPath !== null ? this.oldPath + " " : "") +
            (this.oldPath !== null && this.newPath !== null ? "-> " : "") +
            (this.newPath !== null ? this.newPath + " " : "") +
            (this.newContent !== null ? this.newContent + " " : "");
    }
}
