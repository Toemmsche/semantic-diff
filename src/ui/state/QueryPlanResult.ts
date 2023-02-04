import { Dataset } from '../model/meta/Dataset';
import { DBMS } from '../model/meta/DBMS';
import BenchmarkResult from './BenchmarkResult';

export default interface QueryPlanResult {
  // Metadata
  systemTitle: string;
  dbms: DBMS;
  dbmsVersion: string;
  dataset: Dataset;
  queryName: string;
  queryText: string;

  // Result state
  benchmarkResult: BenchmarkResult;
  queryPlanXml: string;
}

export function getKey(qpr: QueryPlanResult): string {
  return qpr.dbms + qpr.dbmsVersion + qpr.dataset + qpr.queryName;
}

export type QueryPlanResultCollection = QueryPlanResult[];
