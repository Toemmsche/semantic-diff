import { PlanData } from '../PlanData';
import { Box, Stack } from '@mui/material';
import { ManageSearch } from '@mui/icons-material';
import React from 'react';

export class TableScan extends PlanData {
  public static LABEL = 'TableScan';

  get tableName(): string {
    return this.attributes.get('table_name')!!;
  }

  render(): any {
    return (
      <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
        <ManageSearch />
        <Box>{this.tableName.toUpperCase()}</Box>
      </Stack>
    );
  }
}
