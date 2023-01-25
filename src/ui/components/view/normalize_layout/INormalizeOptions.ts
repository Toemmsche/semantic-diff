import {PlanNode} from "../../../model/PlanData";


export default interface INormalizeOptions {
    filter: (planNode: PlanNode) => boolean,
    computeData: (planNode: PlanNode) => any;
    computeEdgeData: (parentPlanNode: PlanNode, childPlanNode: PlanNode) => any;
}

export const defaultNormalizeOptions = {
    filter: (planNode: PlanNode) => {
        return true;
    },
    computeData: (planNode: PlanNode) => {
        return planNode.data
    },

    computeEdgeData: (parentPlanNode: PlanNode, childPlanNode: PlanNode) => {
        return {
            parentPlanData: parentPlanNode.data,
            childPlanData: childPlanNode.data
        }
    }
}