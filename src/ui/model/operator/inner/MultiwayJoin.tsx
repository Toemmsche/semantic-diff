import { Operator } from '../Operator';
import React from 'react';
import { Box, Stack } from '@mui/material';
import { MoreHoriz } from '@mui/icons-material';

export class MultiwayJoin extends Operator {
  public static LABEL = 'MultiwayJoin';

  render(): any {
    return (
      <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
        <MoreHoriz />
        <Box>MULTI-WAY JOIN</Box>
      </Stack>
    );
  }
}
