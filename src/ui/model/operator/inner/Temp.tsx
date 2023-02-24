import { Operator } from '../Operator';
import React from 'react';
import { Box, Stack } from '@mui/material';
import { AccessTime } from '@mui/icons-material';

export class Temp extends Operator {
  public static LABEL = 'Temp';

  render(): any {
    return (
      <Stack direction="row" alignItems="center" spacing={1}>
        <AccessTime />
        <Box>TEMP</Box>
      </Stack>
    );
  }
}
