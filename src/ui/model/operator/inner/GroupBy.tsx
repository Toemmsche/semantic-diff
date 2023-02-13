import { PlanData } from '../PlanData';
import { Box, Stack } from '@mui/material';
import React from 'react';

export const UTF8_LARGE_GAMMA = 'Γ';

export default class GroupBy extends PlanData {
  public static LABEL = 'GroupBy';

  render(): any {
    return (
      <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
        <Box>{UTF8_LARGE_GAMMA}</Box>
        <Box>GROUP BY</Box>
      </Stack>
    );
  }
}
