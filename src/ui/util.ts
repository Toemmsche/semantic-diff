import QueryPlan from "./model/QueryPlan";
import {defaultDiffOptions, PlanNodeBrowserSerDes} from "../semantic-diff";
import {qpGrammar} from "./model/plans";


const serdes = new PlanNodeBrowserSerDes(qpGrammar, defaultDiffOptions);
export function queryPlanFromXml(text: string) : QueryPlan {
    // TODO read query plan
    return new QueryPlan(serdes.parseFromString(text), "Umbra");
}