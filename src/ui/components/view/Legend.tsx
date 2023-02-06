import { Box, Stack } from '@mui/material';
import React from 'react';
import { useQueryPlanState } from '../../state/QueryPlanResultStore';
import { NODE_BORDER_RADIUS, NODE_HEIGHT, NODE_PADDING, NODE_WIDTH } from './elements/dimensions';
import { getColorForSubset } from './elements/color';

export function powerSet<T>(arr: T[]): T[][] {
  return arr.reduce(
    (subsets: T[][], value) => subsets.concat(subsets.map((set: T[]) => [value, ...set])),
    [[]]
  );
}

export default function Legend(props: {}) {
  const [qprState] = useQueryPlanState();

  // No legend necessary if no tree or no elements view
  if (!qprState.resultSelection) {
    return <></>;
  }

  const Boxes = powerSet(Array.from(Array(qprState.resultSelection.length).keys()))
    .filter((subset) => subset.length > 0)
    .map((subset: number[]) => {
      const sorted = subset.sort();
      const color = getColorForSubset(sorted);
      const innerText = subset.map((index) => qprState.resultSelection![index].system).join('\n');
      return (
        <Box
          key={sorted.join('')}
          width={NODE_WIDTH}
          height={NODE_HEIGHT}
          bgcolor={color}
          borderRadius={NODE_BORDER_RADIUS}
          padding={NODE_PADDING}
          textAlign="center">
          {innerText}
        </Box>
      );
    });
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
}
