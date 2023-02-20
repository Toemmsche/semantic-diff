export enum MatchAlgorithm {
  NONE,
  TOP_DOWN,
  BOTTOM_UP,
  SIMPLE,
  FULL
}

export enum LayoutAlgorithm {
  DAGRE,
  D3_HIERARCHY,
  ELK_JS_LAYERED,
  ELK_JS_MRTREE
}

export enum EdgeType {
  BEZIER,
  STRAIGHT,
  SMOOTH_STEP
}

export enum DagEdgeTreatment {
  IGNORE,
  COPY_SUBTREE,
  FULL_DAG
}
