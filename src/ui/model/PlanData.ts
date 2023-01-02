import {TNode} from "../../semantic-diff";
import XmlData from "../../semantic-diff/data/XmlData";
import RenderPlanNode from "../components/nodes/RenderPlanNode";
import IDiffNodeData from "../components/view/diff/IDiffNodeData";
import {Origin} from "../../semantic-diff/delta/UnifiedTreeGenerator";

export class PlanData extends XmlData {

    // dirty id hack, be careful about null IDs
    static increasingId = 0;
    dummyId = String(PlanData.increasingId++);

    get operatorName (): string {
        return this.label;
    }

    get operatorId (): string {
        return this.dummyId;
    }

    get exactCardinality (): number {
        return parseInt(this.attributes.get("exact_cardinality")!!)
    }

    component (): Function {
        return RenderPlanNode;
    }


    // extension for unified viewer
    origin (): Origin {
        const originFromAttributes = this.attributes.get("origin")!!;
        return originFromAttributes as Origin;
    }

    isExpanded (): boolean {
        return this.attributes.get("isExpanded") === "true";
    }
}

export type PlanNode = TNode<PlanData>;
export type DiffPlanData = PlanData & IDiffNodeData;
export type PlanDiffNode = TNode<DiffPlanData>;