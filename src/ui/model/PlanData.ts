import {TNode} from "../../semantic-diff";
import XmlData from "../../semantic-diff/data/XmlData";
import RenderPlanNode from "../components/nodes/RenderPlanNode";
import IDiffNodeData from "../components/nodes/IDiffNodeData";

export class PlanData extends XmlData {

    // dirty id hack, be careful about null IDs
    static increasingId = 0;
    dummyId = String(PlanData.increasingId++);
    get operatorName(): string {
        return this.label;
    }

    get operatorId(): string {
        return this.dummyId;
    }

    get exactCardinality(): number {
        return parseInt(this.attributes.get("exact_cardinality")!!)
    }

    component(): Function {
        return RenderPlanNode;
    }

    // render props
    renderWidth: number = 0;
    renderHeight: number = 0;
}

export type PlanNode = TNode<PlanData>;
export type DiffPlanData = PlanData & IDiffNodeData;
export type PlanDiffNode = TNode<DiffPlanData>;