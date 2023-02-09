import React, { useState } from 'react';
import { PlanNode } from '../../../model/operator/PlanData';
import { Handle, Position } from 'reactflow';
import { useParameterState } from '../../../state/ParameterStore';
import { IconButton, Paper, Popover, Stack } from '@mui/material';
import { ExpandMore, Menu } from '@mui/icons-material';
import { Nullable } from '../../../../semantic-diff/Types';
import { NODE_BORDER_RADIUS, NODE_ELEVATION, NODE_PADDING } from './dimensions';
import NodeDetails from './NodeDetails';
import { getColorForIndex, getColorForSubset } from './color';

export interface IUnifiedDiffProps {
  data: {
    expand: () => void;
    hide: () => void;
    planNode: PlanNode;
  };
}

export default function UnifiedDiffPlanNode(props: IUnifiedDiffProps) {
  const [parameters, parameterActions] = useParameterState();

  const [hoverActive, setHoverActive] = useState(false);

  const { hide, planNode, expand } = props.data;

  const metaPlanData = planNode.getMetaNode().data;

  const [hasExpanded, setHasExpanded] = useState(false);

  const [detailsAnchorEl, setDetailsAnchorEl] = useState(null as Nullable<HTMLElement>);

  // child component
  let Component = metaPlanData.component();

  let bgColor = getColorForSubset(planNode.getGroupSourceIndices());

  let groupSize = planNode.getGroupSourceIndices().length;

  // this will become a linear gradient
  let background =
    'linear-gradient(to right, ' +
    planNode
      .getGroupSourceIndices()
      .map((sourceIndex, j) => {
        const color = getColorForIndex(sourceIndex);
        const start = Math.floor((j * 100) / groupSize);
        const end = Math.floor(((j + 1) * 100) / groupSize);
        return `${color} ${start}%, ${color} ${end}%`;
      })
      .join(', ') +
    ')';
  return (
    <Paper elevation={NODE_ELEVATION}>
      <Stack
        borderRadius={NODE_BORDER_RADIUS}
        sx={{
          background: background,
          borderStyle: planNode.isLeaf() ? 'dotted' : 'none'
        }}
        padding={NODE_PADDING}
        direction="column"
        alignItems="center"
        justifyContent="center"
        fontWeight={800}
        onMouseEnter={() => setHoverActive(true)}
        onMouseLeave={() => setHoverActive(false)}>
        <Handle type="target" position={Position.Top} style={{ opacity: '0' }} />
        <Stack width="100%" direction="row" alignItems="center" justifyContent="space-between">
          <Component data={metaPlanData} />
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
          <IconButton
            onClick={(event) => {
              console.log(planNode);
              setDetailsAnchorEl(event.currentTarget);
            }}>
            <Menu />
          </IconButton>
          <Popover
            anchorEl={detailsAnchorEl}
            open={detailsAnchorEl != null}
            onClose={() => setDetailsAnchorEl(null)}>
            <NodeDetails planNodes={planNode.getMatchGroup()} />
          </Popover>
        </Stack>
        <Handle type="source" position={Position.Bottom} style={{ opacity: '0' }} />
      </Stack>
    </Paper>
  );
}
