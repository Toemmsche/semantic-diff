import {Dataset} from "../model/meta/Dataset";
import {DBMS} from "../model/meta/DBMS";
import {PlanNode} from "../model/PlanData";
import BenchmarkResult from "./BenchmarkResult";

export default interface QueryPlanResult {

    // Metadata
    systemTitle: string
    dbms: DBMS
    dbmsVersion: string
    dataset: Dataset
    queryName: string
    queryText: string

    // Result data
    benchmarkResult: BenchmarkResult
    queryPlanXml: string

}

export type QueryPlanResultCollection = QueryPlanResult[]