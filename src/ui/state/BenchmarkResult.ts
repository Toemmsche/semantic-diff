import { Nullable } from '../../semantic-diff/Types';

export default interface BenchmarkResult {
  result: any;
  total: Nullable<number>;
  compilation: Nullable<number>;
  execution: Nullable<number>;
  cycles: Nullable<number>;
  instructions: Nullable<number>;
  l1d_misses: Nullable<number>;
  llc_misses: Nullable<number>;
  branch_misses: Nullable<number>;
  dtlb_misses: Nullable<number>;
  loads: Nullable<number>;
  stores: Nullable<number>;
  task: Nullable<number>;
  ipc: Nullable<number>;
  cpus: Nullable<number>;
  ghz: Nullable<number>;
  scale: Nullable<number>;
  error: Nullable<string>;
}
