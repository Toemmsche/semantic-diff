import { Operator } from '../Operator';
import React from 'react';
import { ClearAll } from '@mui/icons-material';
import { Box, Stack } from '@mui/material';

export class Result extends Operator {
  public static readonly LABEL = 'Result';

  render(): any {
    return (
      <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
        <ClearAll></ClearAll>
        <Box>RESULT</Box>
      </Stack>
    );
  }
}
