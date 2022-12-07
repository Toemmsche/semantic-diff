import {TNode} from "../../../semantic-diff";
import XmlData from "../../../semantic-diff/data/XmlData";

export interface PlanData extends XmlData {

    get operatorName(): string

    get operatorId(): string
}

// dirty id hack
let i = 0

export function tNodeToPlanNode(node: TNode<XmlData>): TNode<PlanData> {
    const k = i++;
    node.data = Object.assign({
        get operatorName(): string {
            return node.label;
        },
        get operatorId(): string {
            return node.attributes.get("id") ?? String(k);
        }
    }, node.data);

    // cast is safe
    return node as TNode<PlanData>;
}