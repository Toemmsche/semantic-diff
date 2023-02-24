import { Operator } from '../Operator';
import React from 'react';
import { Box, Stack } from '@mui/material';

export const UTF8_SMALL_SIGMA = 'σ';

export class Select extends Operator {
  public static LABEL = 'Select';

  static isSelect(data: Operator): data is Select {
    return data.label === Select.LABEL;
  }

  render(): any {
    return (
      <Stack direction="row" alignItems="center" spacing={1}>
        <Box>{UTF8_SMALL_SIGMA}</Box>
        <Box>SELECT</Box>
      </Stack>
    );
  }
}
