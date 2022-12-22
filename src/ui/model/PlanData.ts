import {TNode} from "../../semantic-diff";
import XmlData from "../../semantic-diff/data/XmlData";
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

    componentName(): string {
        return "renderPlanNode";
    }
}

export type PlanNode = TNode<PlanData>;