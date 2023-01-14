import {TNode} from "../../semantic-diff";
import XmlData from "../../semantic-diff/data/XmlData";
import IDiffNodeData from "../components/view/diff/IDiffNodeData";
import {Origin} from "../../semantic-diff/delta/UnifiedTreeGenerator";
import RenderPlanNodeDetails from "../components/details/RenderPlanNodeDetails";
import DiffState from "../../semantic-diff/delta/DiffState";
import {Box} from "@mui/material";
import React from "react";

export function RenderPlanNode (props: { data: PlanData }) {
    const {data: planData} = props

    return (
        <Box>
            <Box>{planData.operatorName.toUpperCase()}</Box>
        </Box>
    )

}

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

    detailComponent() : Function {
        return RenderPlanNodeDetails;
    }

    // extension for two way viewer
    hoverActive : boolean = false;

    // extension for unified viewer

    origin: Origin = Origin.OLD;

    diffState: DiffState = DiffState.IDENTICAL;
}

export type PlanNode = TNode<PlanData>;
export type DiffPlanData = PlanData & IDiffNodeData;
export type PlanDiffNode = TNode<DiffPlanData>;