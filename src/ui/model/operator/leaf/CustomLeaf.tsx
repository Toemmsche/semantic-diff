import { Operator } from '../Operator';
import React from 'react';
import { Box, Stack } from '@mui/material';
import { QuestionMark } from '@mui/icons-material';

export class CustomLeaf extends Operator {
  public static LABEL = 'CustomLeaf';

  get name(): string {
    return this.attributes.get('name')!;
  }

  render(): any {
    return (
      <Stack direction="row" alignItems="center" spacing={1}>
        <QuestionMark />
        <Box>{this.name.toUpperCase()}</Box>
      </Stack>
    );
  }
}
