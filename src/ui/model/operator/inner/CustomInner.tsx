import { PlanData } from '../PlanData';
import React from 'react';
import { Box, Stack } from '@mui/material';
import { AccessTime, QuestionMark } from '@mui/icons-material';

export class CustomInner extends PlanData {
  public static LABEL = 'CustomInner';

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
