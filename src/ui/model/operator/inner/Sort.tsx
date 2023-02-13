import { PlanData } from '../PlanData';
import { Box, Stack } from '@mui/material';
import React from 'react';
import { FilterList } from '@mui/icons-material';

export default class Sort extends PlanData {
  public static LABEL = 'Sort';

  render(): any {
    return (
      <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
        <FilterList />
        <Box>SORT</Box>
      </Stack>
    );
  }
}
