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

  public static handleEarlyProbes(tree: PlanNode) {
    // look for temp scans
    tree.toPreOrderUnique().forEach((node) => {
      if (!EarlyProbe.isEarlyProbe(node.data)) {
        return;
      }
      if (!node.data.source) {
        throw new Error('EearlyProbe is missing source');
      }
      const source = node.data.source;

      tree
        .toPreOrderUnique()
        .filter((p) => p.data.operatorId === source && !p.children.some((c) => c === node))
        .forEach((sourceNode) => {
          sourceNode.appendChildExtra(node);
        });
    });
  }

  public static isEarlyProbeEdge(parent: PlanNode, child: PlanNode) {
    return (
      this.isEarlyProbe(child.data) &&
      parent
        .getMatchGroup()
        .some(
          (p) =>
            p.sourceIndex === child.sourceIndex &&
            p.data.operatorId === (child.data as EarlyProbe).source
        )
    );
  }
}
