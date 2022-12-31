export default interface BenchmarkResult {
    result: any[];
    total: number[] ;
    compilation: number[] ;
    execution: number[] ;
    cycles: number[] ;
    instructions: number[] ;
    l1d_misses: number[] ;
    llc_misses: number[] ;
    branch_misses: number[] ;
    dtlb_misses: number[] ;
    loads: number[] ;
    stores: number[] ;
    task: number[] ;
    ipc: number[] ;
    cpus: number[] ;
    ghz: number[] ;
    scale: number[] ;
    error: string
}