import React, { useState } from 'react';
import { PlanNode } from '../../../model/operator/PlanData';
import { Handle, Position } from 'reactflow';
import { useParameterState } from '../../../state/ParameterStore';
import { Box, IconButton, Popover, Stack } from '@mui/material';
import { ExpandMore, Menu } from '@mui/icons-material';
import { Nullable } from '../../../../semantic-diff/Types';
import { NODE_BORDER_RADIUS, NODE_HEIGHT, NODE_PADDING, NODE_WIDTH } from './dimensions';
import NodeDetails from './NodeDetails';
import { getColorForSubset } from './color';

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

  return (
    <Box
      bgcolor={bgColor}
      width={NODE_WIDTH}
      height={NODE_HEIGHT}
      borderRadius={NODE_BORDER_RADIUS}
      sx={{
        borderStyle: planNode.isLeaf() ? 'dotted' : 'none'
      }}
      padding={NODE_PADDING}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
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
        {hoverActive && (
          <>
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
          </>
        )}
      </Stack>
      <Handle type="source" position={Position.Bottom} style={{ opacity: '0' }} />
    </Box>
  );
}
