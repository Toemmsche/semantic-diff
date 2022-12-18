import {TNode} from "../../../semantic-diff";
import XmlData from "../../../semantic-diff/data/XmlData";
export interface PlanData extends XmlData {
    get operatorName(): string

    get operatorId(): string

    render(): any
}


export type PlanNode = TNode<PlanData>;


// dirty id hack
let i = 0

export function tNodeToPlanNode(node: TNode<XmlData>): PlanNode {
    const k = i++;
    Object.assign(node.data, {
        get operatorName(): string {
            return node.label;
        },
        get operatorId(): string {
            return node.attributes.get("id") ?? String(k);
        },
        render() {
            const parent = document.createElement("div");
            parent.innerText = this.operatorId;

            const body = document.createElement("div");
            body.innerText = this.operatorName;

            switch (this.operatorName) {
                case "TableScan": {
                    const label = document.createElement("div");
                    label.innerText = "<" + node.data.attributes.get("table_name")!! + ">";
                    body.appendChild(label);
                    break;
                }
            }

            body.setAttribute("class", "nodeBody")

            parent.appendChild(body);
            return parent;
        }
    });
    // modify recursively
    for (const child of node.children) {
        tNodeToPlanNode(child);
    }
    // cast is safe
    return node as PlanNode;
}