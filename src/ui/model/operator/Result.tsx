import { PlanData } from './PlanData';
import React from 'react';
import { ClearAll } from '@mui/icons-material';
import { Box, Stack } from '@mui/material';

export function RenderResult(props: { data: Result }) {
  const { data: resultData } = props;

  return (
    <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
      <ClearAll></ClearAll>
      <Box>RESULT</Box>
    </Stack>
  );
}

export class Result extends PlanData {
  public static readonly LABEL = 'Result';

  component(): Function {
    return RenderResult;
  }
}
