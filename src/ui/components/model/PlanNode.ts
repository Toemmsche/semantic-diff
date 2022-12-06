import {TNode} from "../../../semantic-diff";

export interface PlanNode {

    get operatorName() : string

    get operatorId() : string

    get childPlanNodes() : PlanNode[]
}

// dirty id hack
let i = 0

export function tNodeToPlanNode(node: TNode) : PlanNode {
    const k = i++;
    return {
        ...node,
        get operatorName() : string {
            return node.label;
        },

        get operatorId() : string {
            return node.attributes.get("id") ?? String(k);
        },

        get childPlanNodes() : PlanNode[] {
            return node.children.map(c => tNodeToPlanNode(c));
        }
    }
}