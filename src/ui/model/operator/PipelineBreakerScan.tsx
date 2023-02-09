import { PlanData, PlanNode } from './PlanData';
import { Box, Stack } from '@mui/material';
import React from 'react';

export function RenderPipelineBreakerScan(props: {}) {
  return (
    <Stack direction="column">
      <Box>PIPELINEBREAKERSCAN PIPESDFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFf</Box>
      <Box>PIPELINEBREAKERSCAN PIPESDFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFf</Box>
      <Box>PIPELINEBREAKERSCAN PIPESDFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFf</Box>
      <Box>PIPELINEBREAKERSCAN PIPESDFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFf</Box>
      <Box>PIPELINEBREAKERSCAN PIPESDFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFf</Box>
      <Box>PIPELINEBREAKERSCAN PIPESDFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFf</Box>
    </Stack>
  );
}

export class PipelineBreakerScan extends PlanData {
  public static LABEL = 'PipelineBreakerScan';

  get scannedId(): string {
    return this.attributes.get('scanned_id')!;
  }

  component(): Function {
    return RenderPipelineBreakerScan;
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
          node.appendChildExtra(scannedNode);
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
