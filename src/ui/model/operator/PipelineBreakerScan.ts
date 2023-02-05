import { PlanData, PlanNode, RenderPlanNode } from './PlanData';

export class PipelineBreakerScan extends PlanData {
  public static LABEL = 'PipelineBreakerScan';

  get scannedId(): string {
    return this.attributes.get('scanned_id')!;
  }

  component(): Function {
    return RenderPlanNode;
  }

  static isPipelineBreakerScan(data: PlanData): data is PipelineBreakerScan {
    return data.label === PipelineBreakerScan.LABEL;
  }

  public static handlePipelineBreakerScans(tree: PlanNode) {
    tree.toPreOrderUnique().forEach((node) => {
      if (!PipelineBreakerScan.isPipelineBreakerScan(node.data)) {
        return;
      }
      if (!node.data.scannedId) {
        throw new Error('PipelineBreakerScan is missing scanned id');
      }
      const scannedId = node.data.scannedId;

      tree
        .toPreOrderUnique()
        .filter((n) => n.data.operatorId === scannedId && !node.children.some((c) => c === n))
        .forEach((scannedNode) => {
          node.children.push(scannedNode);
        });
    });
  }
}
