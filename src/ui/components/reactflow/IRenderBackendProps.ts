import QueryPlan from "../../model/meta/QueryPlan";

export default interface IRenderBackendProps {
    /** Result node with children */
    firstPlan: QueryPlan;

    secondPlan: QueryPlan
}