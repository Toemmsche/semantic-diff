import { Paper, Stack } from '@mui/material';
import React from 'react';
import { useQueryPlanState } from '../../state/QueryPlanResultStore';
import {
  NODE_BORDER_RADIUS,
  NODE_ELEVATION,
  NODE_HEIGHT,
  NODE_PADDING,
  NODE_WIDTH
} from './elements/dimensions';
import { getColorForIndex } from './elements/color';

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

  const Boxes = Array(qprState.resultSelection.length)
    .fill(null)
    .map((_, index) => {
      if (!qprState.resultSelection[index]) {
        return <></>;
      }
      const color = getColorForIndex(index);
      const innerText = qprState.resultSelection[index]!.system;
      return (
        <Paper elevation={NODE_ELEVATION}>
          <Stack
            key={index}
            width={NODE_WIDTH}
            height={NODE_HEIGHT}
            bgcolor={color}
            borderRadius={NODE_BORDER_RADIUS}
            padding={NODE_PADDING}
            textAlign="center"
            direction="column"
            justifyContent="center"
            fontWeight={800}>
            {innerText}
          </Stack>
        </Paper>
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
