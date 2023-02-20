import { Nullable } from '../../../semantic-diff/Types';

export default interface BenchmarkResult {
  // Most of these values will be undefined, but total runtime is required
  total: number;
  compilation?: number;
  execution?: number;
  cycles?: number;
  instructions?: number;
  l1d_misses?: number;
  llc_misses?: number;
  branch_misses?: number;
  dtlb_misses?: number;
  loads?: number;
  stores?: number;
  task?: number;
  ipc?: number;
  cpus?: number;
  ghz?: number;
  scale?: number;
}

export enum ComparisonSemantic {
  GREATER_IS_BETTER,
  LOWER_IS_BETTER
}

export function compareAgainstBaseline(
  compMetric: number,
  baselineMetric: number,
  comparisonSemantic: ComparisonSemantic = ComparisonSemantic.LOWER_IS_BETTER
) {
  if (comparisonSemantic === ComparisonSemantic.LOWER_IS_BETTER) {
    if (baselineMetric < compMetric) {
      return compMetric / baselineMetric - 1;
    } else {
      return -(baselineMetric / compMetric - 1);
    }
  } else {
    throw new Error('not implemented');
  }
}

// only allow number types
export type ComparisonMetric = keyof BenchmarkResult;
