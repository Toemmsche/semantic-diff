/*
 Functional requirements:

 - weights for attribute and text value comparison
 - node type (leaf, inner, root, property)
 - weight for nested property comparison

 - Possible format
 XPATH like:

 (implicit root node)/child1/child2/@attrname
 (implicit root node)/child1 <-- matches text content
 */

import WeightedCV from './WeightedCV';
import NodeType from './NodeType';

export default class GrammarNode {

  // TODO internal ordering
  constructor(public type: NodeType,
              public label: string,
              public weightedCVs: WeightedCV[],
              public ordered = true) {
  }
}