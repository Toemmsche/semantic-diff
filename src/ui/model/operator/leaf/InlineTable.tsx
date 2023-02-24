import { Operator } from '../Operator';
import React from 'react';
import { Box, Stack } from '@mui/material';
import { Storage } from '@mui/icons-material';

export class InlineTable extends Operator {
  public static LABEL = 'InlineTable';

  render(): any {
    return (
      <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
        <Storage />
        <Box>INLINE TABLE</Box>
      </Stack>
    );
  }
}
