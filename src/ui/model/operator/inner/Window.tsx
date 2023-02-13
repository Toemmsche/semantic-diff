import { PlanData } from '../PlanData';
import React from 'react';
import { Box, Stack } from '@mui/material';
import { AccessTime, ViewColumn } from '@mui/icons-material';

export class Window extends PlanData {
  public static LABEL = 'Window';

  render(): any {
    return (
      <Stack direction="row" alignItems="center" spacing={1}>
        <ViewColumn />
        <Box>WINDOW</Box>
      </Stack>
    );
  }
}
