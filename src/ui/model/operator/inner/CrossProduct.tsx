import { Operator } from '../Operator';
import React from 'react';
import { Box, Stack } from '@mui/material';
import { Close } from '@mui/icons-material';

export class CrossProduct extends Operator {
  public static LABEL = 'CrossProduct';

  render(): any {
    return (
      <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
        <Close />
        <Box>CROSS PRODUCT</Box>
      </Stack>
    );
  }
}
