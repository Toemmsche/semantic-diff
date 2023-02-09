import { Dataset, Query, System } from './types';
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

  // plan similarity
  similarity: Map<QueryPlanResult, number>;
}

export type QueryPlanResultCollection = QueryPlanResult[];
