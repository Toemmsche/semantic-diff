import { Box, Stack } from '@mui/material';
import React from 'react';
import { useQueryPlanState } from '../../state/QueryPlanResultStore';
import { useParameterState } from '../../state/ParameterStore';
import { nwayColors, UnifiedColors } from './elements/UnifiedDiffPlanNode';
import { NODE_BORDER_RADIUS, NODE_HEIGHT, NODE_PADDING, NODE_WIDTH } from './elements/dimensions';

export function getAllSubsets<T>(arr: T[]): T[][] {
  return arr.reduce(
    (subsets: T[][], value) => subsets.concat(subsets.map((set: T[]) => [value, ...set])),
    [[]]
  );
}

export default function Legend(props: {}) {
  const [qprState] = useQueryPlanState();
  const [parameters] = useParameterState();

  // No legend necessary if no tree or no elements view
  if (!qprState.resultSelection) {
    return <></>;
  } else if (parameters.nwayDiff) {
    const Boxes = getAllSubsets(Array.from(Array(qprState.resultSelection.length).keys())).map(
      (subset: number[]) => {
        const sorted = subset.sort().map(i => i + 1);
        const color = nwayColors.get(sorted.join(''));
        const innerText = subset.map((index) => qprState.resultSelection![index].system).join('\n');
        return (
          <Box
            width={NODE_WIDTH}
            height={NODE_HEIGHT}
            bgcolor={color}
            borderRadius={NODE_BORDER_RADIUS}
            padding={NODE_PADDING}
            textAlign="center">
            {innerText}
          </Box>
        );
      }
    );
    return (
      <Stack
        direction="column"
        sx={{
          position: 'absolute',
          bottom: 2 * NODE_HEIGHT,
          right: NODE_WIDTH / 4
        }}
        spacing={2}>
        {Boxes}
      </Stack>
    );
  } else {
    const [firstDbms, secondDbms] = qprState.resultSelection.map((qpr) => qpr.system);
    return (
      <Stack
        direction="column"
        sx={{
          position: 'absolute',
          bottom: 2 * NODE_HEIGHT,
          right: NODE_WIDTH / 4
        }}
        spacing={2}>
        <Box
          width={NODE_WIDTH}
          height={NODE_HEIGHT}
          bgcolor={UnifiedColors.EXCLUSIVE_OLD}
          borderRadius={NODE_BORDER_RADIUS}
          padding={NODE_PADDING}
          textAlign="center">
          {firstDbms}
        </Box>
        <Box
          width={NODE_WIDTH}
          height={NODE_HEIGHT}
          bgcolor={UnifiedColors.SHARED}
          borderRadius={NODE_BORDER_RADIUS}
          padding={NODE_PADDING}
          textAlign="center"
          fontStyle="italic">
          - Both -
        </Box>
        <Box
          width={NODE_WIDTH}
          height={NODE_HEIGHT}
          bgcolor={UnifiedColors.EXCLUSIVE_NEW}
          borderRadius={NODE_BORDER_RADIUS}
          padding={NODE_PADDING}
          textAlign="center">
          {secondDbms}
        </Box>
      </Stack>
    );
  }
}