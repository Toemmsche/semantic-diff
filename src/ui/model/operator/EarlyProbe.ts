import { PlanData, PlanNode, RenderPlanNode } from './PlanData';

export class EarlyProbe extends PlanData {
  public static LABEL = 'EarlyProbe';

  get source(): string {
    return this.attributes.get('source')!;
  }

  component(): Function {
    return RenderPlanNode;
  }

  public static isEarlyProbe(data: PlanData): data is EarlyProbe {
    return data.label === EarlyProbe.LABEL;
  }

  public static handleEarlyProbes(unifiedTree: PlanNode) {
    // look for temp scans
    unifiedTree.toPreOrderUnique().forEach((node) => {
      if (!EarlyProbe.isEarlyProbe(node.data)) {
        return;
      }
      if (!node.data.source) {
        throw new Error('EarlyProbe is missing source');
      }

      // find all sources (current and match)
      const sources = [node.data.source];
      if (node.isMatched()) {
        const matchData = node.getSingleMatch().data;
        if (!(matchData instanceof EarlyProbe) || matchData.source == null) {
          throw new Error('Match of EarlyProbe is not a EarlyProbe or missing source');
        }
        sources.push(matchData.source);
      }

      unifiedTree
        .toPreOrderUnique()
        .filter(
          (n) =>
            n.origin === node.origin &&
            sources.some((s) => s === n.data.operatorId) &&
            !n.children.some((c) => c === node)
        )
        .forEach((sourceNode) => {
          // appended at the end?
          sourceNode.children.push(node);
        });
    });
  }
}
