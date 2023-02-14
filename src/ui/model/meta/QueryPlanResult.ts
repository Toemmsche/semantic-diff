import BenchmarkResult from './BenchmarkResult';
import { PlanNode } from '../operator/PlanData';

export type System = string;
export type Query = string;

export default interface QueryPlanResult {
  // Metadata
  system: System;
  query: Query;
  queryText: string;

  // Result state
  benchmarkResult: BenchmarkResult;
  queryPlan: PlanNode;

  // plan similarity
  similarity: Map<QueryPlanResult, number>;
}

export type QueryPlanResultCollection = QueryPlanResult[];
