import React, { useRef, useState } from 'react';
import { PlanNode } from '../../../model/operator/Operator';
import { Handle, Position } from 'reactflow';
import { useParameterState } from '../../../state/ParameterStore';
import { Box, IconButton, Paper, Popover, Stack } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { Nullable } from '../../../../semantic-diff/Types';
import NodeDetails from './NodeDetails';
import { getGradientForIndexGroup } from './color';
import {NodeDimensionsType} from "../../../state/Parameters";

export interface IUnifiedDiffProps {
  data: {
    expandedNodes: PlanNode[];
    setExpandedNodes: (nodes: PlanNode[]) => any;
    planNode: PlanNode;
  };
}

export default function DeltaNode(props: IUnifiedDiffProps) {
  const { expandedNodes, planNode, setExpandedNodes } = props.data;

  // Internal state
  const [hoverActive, setHoverActive] = useState(false);
  const [detailsAnchorEl, setDetailsAnchorEl] = useState(null as Nullable<HTMLElement>);
  const [parameters] = useParameterState();
  const nodeDimensions = parameters.nodeDimensions;
  const nodeRef = useRef(null);

  const hasExpanded =
    planNode.isLeaf() || planNode.children.every((c) => expandedNodes.includes(c));

  let CollapsibleToggles = <></>;
  if (parameters.collapsible && !planNode.isLeaf()) {
    const hide = () => {
      // all descendants
      const descendants = new Set(planNode.toPreOrderUnique());
      descendants.delete(planNode);
      setExpandedNodes(expandedNodes.filter((n) => !descendants.has(n)));
    };

    const expand = () => {
      console.log('expanding', setExpandedNodes, expandedNodes);
      setExpandedNodes([
        // must eliminate duplicates here for rendering to work
        ...new Set([...expandedNodes, ...planNode.children])
      ]);
    };

    CollapsibleToggles = (
      <IconButton
        onClick={(event) => {
          event.stopPropagation();
          if (hasExpanded) hide();
          else expand();
        }}>
        <ExpandMore
          style={{
            transform: `rotate(${hasExpanded ? 180 : 0}deg)`,
            transition: 'transform 0.2s'
          }}
        />
      </IconButton>
    );
  }

  const metaPlanData = planNode.getMetaNode().data;

  let background = getGradientForIndexGroup(planNode.getGroupSourceIndices());

  return (
    <Paper elevation={3}>
      <Box
        ref={nodeRef}
        borderRadius={1}
        sx={{
          background: background,
          borderStyle: planNode.isLeaf() ? 'solid' : 'none',
          filter: hoverActive ? 'brightness(50%)' : undefined,
          opacity: !hasExpanded ? 0.6 : 1
        }}
        fontWeight={800}
        onMouseEnter={() => setHoverActive(true)}
        onClick={() => {
          if (!detailsAnchorEl) setDetailsAnchorEl(nodeRef.current);
        }}
        onMouseLeave={() => setHoverActive(false)}>
        <Handle type="target" id="topHandle" position={Position.Top} style={{ opacity: 0 }} />
        <Box padding={1}>
          <Stack
              width={nodeDimensions.kind == NodeDimensionsType.STATIC ? nodeDimensions.staticDimensions[0] : undefined}
              height={nodeDimensions.kind == NodeDimensionsType.STATIC ? nodeDimensions.staticDimensions[1] : undefined}
              direction="row" alignItems="center" justifyContent="space-evenly">
            {metaPlanData.render()}
            {CollapsibleToggles}
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

        <Handle
          type="source"
          id="bottomHandle"
          position={Position.Bottom}
          style={{
            opacity: 0
          }}
        />
      </Box>
    </Paper>
  );
}
