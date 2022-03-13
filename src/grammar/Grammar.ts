import GrammarNode from './GrammarNode.js';

export default class Grammar {
  private labelMap: Map<String, GrammarNode> = new Map();

  // Property nodes are inferred implicitly (everything that is NOT an inner
  // and NOT a leaf node)

  constructor(public inners: GrammarNode[], public leaves: GrammarNode[]) {
    for (const grammarNode of inners.concat(leaves)) {
      this.labelMap.set(grammarNode.label, grammarNode);
    }
  }

  getGrammarNodeByLabel(label: string): GrammarNode | undefined {
    return this.labelMap.get(label);
  }
}