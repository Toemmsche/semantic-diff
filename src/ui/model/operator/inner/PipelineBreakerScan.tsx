import { PlanData, PlanNode } from '../PlanData';
import { Box, Stack } from '@mui/material';
import React from 'react';

const UTF8_STACK = '☷';

export class PipelineBreakerScan extends PlanData {
  public static LABEL = 'PipelineBreakerScan';

  get scannedId(): string {
    return this.attributes.get('scanned_id')!;
  }

  static isPipelineBreakerScan(data: PlanData): data is PipelineBreakerScan {
    return data.label === PipelineBreakerScan.LABEL;
  }

  render(): any {
    return (
      <Stack direction="row" alignItems="center" spacing={1}>
        <Box>{UTF8_STACK}</Box>
        <Box>PIPELINE BREAKER SCAN</Box>
      </Stack>
    );
  }

  public static handlePipelineBreakerScans(tree: PlanNode, useCopy = false) {
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
        .filter((n) => n.data.operatorId === scannedId && !node.children.includes(n))
        .forEach((scannedNode) => {
          if (useCopy) {
            // adjust ids
            const copy = scannedNode.copy();
            copy.data.attributes.set('operator_id', copy.data.id);
            node.data.attributes.set('scanned_id', copy.data.id);
            node.appendChild(copy);
          } else {
            // form a true DAG edge
            node.appendChildExtra(scannedNode);
          }
        });
    });
  }

  public static isPipelineBreakerScanEdge(parent: PlanNode, child: PlanNode) {
    // check if match group of parent contains scan of child
    return parent
      .getMatchGroup()
      .some(
        (p) =>
          p.sourceIndex === child.sourceIndex &&
          this.isPipelineBreakerScan(p.data) &&
          p.data.scannedId === child.data.operatorId
      );
  }
}
