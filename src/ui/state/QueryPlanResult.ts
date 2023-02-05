import { Dataset, Query, System } from '../model/meta/types';
import BenchmarkResult from './BenchmarkResult';

export default interface QueryPlanResult {
  // Metadata
  system: System;
  dataset: Dataset;
  query: Query;
  queryText: string;

  // Result state
  benchmarkResult: BenchmarkResult;
  queryPlanXml: string;
}

export function getKey(qpr: QueryPlanResult): string {
  return qpr.system + qpr.dataset + qpr.query;
}

export type QueryPlanResultCollection = QueryPlanResult[];
