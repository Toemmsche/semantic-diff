import React, { useRef, useState } from 'react';
import { PlanNode } from '../../../model/operator/PlanData';
import { Handle, Position } from 'reactflow';
import { useParameterState } from '../../../state/ParameterStore';
import { Box, IconButton, Paper, Popover, Stack } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { Nullable } from '../../../../semantic-diff/Types';
import NodeDetails from './NodeDetails';
import { getColorForIndex } from './color';

export interface IUnifiedDiffProps {
  data: {
    expand: () => void;
    hide: () => void;
    planNode: PlanNode;
  };
}

export default function UnifiedDiffPlanNode(props: IUnifiedDiffProps) {
  const { hide, planNode, expand } = props.data;

  // Internal state
  const [hoverActive, setHoverActive] = useState(false);
  const [hasExpanded, setHasExpanded] = useState(false);
  const [detailsAnchorEl, setDetailsAnchorEl] = useState(null as Nullable<HTMLElement>);
  const nodeRef = useRef(null);

  const [parameters] = useParameterState();

  const metaPlanData = planNode.getMetaNode().data;

  let groupSize = planNode.getGroupSourceIndices().length;

  // this will become a linear gradient
  let background =
    'linear-gradient(to right, ' +
    planNode
      .getGroupSourceIndices()
      .map((sourceIndex, j) => {
        const color = getColorForIndex(sourceIndex);
        // apply minimal smnoothing
        const start = Math.floor((j * 100) / groupSize) + 1;
        const end = Math.floor(((j + 1) * 100) / groupSize) - 1;
        return `${color} ${start}%, ${color} ${end}%`;
      })
      .join(', ') +
    ')';
  return (
    <Paper elevation={3}>
      <Box
        ref={nodeRef}
        borderRadius={1}
        sx={{
          background: background,
          borderStyle: planNode.isLeaf() ? 'dotted' : 'none',
          filter: hoverActive ? 'brightness(50%)' : undefined
        }}
        fontWeight={800}
        onMouseEnter={() => setHoverActive(true)}
        onClick={() => {
          if (!detailsAnchorEl) setDetailsAnchorEl(nodeRef.current);
        }}
        onMouseLeave={() => setHoverActive(false)}>
        <Handle type="target" position={Position.Top} style={{ opacity: '0' }} />
        <Box padding={1}>
          <Stack width="100%" direction="row" alignItems="center" justifyContent="space-between">
            {metaPlanData.render()}
            {hoverActive &&
              parameters.collapsible &&
              !planNode.isLeaf() &&
              (hasExpanded ? (
                <IconButton
                  onClick={() => {
                    setHasExpanded(false);
                    hide();
                  }}>
                  <ExpandMore sx={{ transform: 'rotate(180deg)' }} />
                </IconButton>
              ) : (
                <IconButton
                  onClick={() => {
                    setHasExpanded(true);
                    expand();
                  }}>
                  <ExpandMore />
                </IconButton>
              ))}
            <Popover
              anchorEl={detailsAnchorEl}
              open={detailsAnchorEl != null}
              onClose={() => {
                setDetailsAnchorEl(null);
                setHoverActive(false);
              }}>
              <NodeDetails planNodes={planNode.getMatchGroup()} />
            </Popover>
          </Stack>
        </Box>
        <Handle type="source" position={Position.Bottom} style={{ opacity: '0' }} />
      </Box>
    </Paper>
  );
}
