import { PlanData, PlanNode, RenderPlanNode } from './PlanData';

export class TempScan extends PlanData {
  public static LABEL = 'TempScan';

  get scannedId(): string {
    return this.attributes.get('scanned_id')!;
  }

  component(): Function {
    return RenderPlanNode;
  }

  static isTempScan(data: PlanData): data is TempScan {
    return data.label === TempScan.LABEL;
  }

  public static handleTempScans(tree: PlanNode) {
    tree.toPreOrderUnique().forEach((node) => {
      if (!TempScan.isTempScan(node.data)) {
        return;
      }
      if (!node.data.scannedId) {
        throw new Error('TempScan is missing scanned id');
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
