import { PlanData } from '../PlanData';
import { Box, Stack } from '@mui/material';
import { ManageSearch } from '@mui/icons-material';
import React from 'react';

const tableSizeMap = new Map<string, number>();

export class TableScan extends PlanData {
  public static LABEL = 'TableScan';

  get tableName(): string {
    return this.attributes.get('table_name')!;
  }

  get tableSize(): number {
    // This is just a small hack to retrieve table sizes from Hyper and DuckDB using the values from Umbra
    const cand = this.attributes.get('table_size')!;
    if (cand == null && !tableSizeMap.has(this.tableName)) {
      console.warn('no_table_size for ', this.tableName);
      return this.exactCardinality;
    } else if (cand == null) {
      return tableSizeMap.get(this.tableName)!;
    } else {
      const size = parseInt(cand);
      tableSizeMap.set(this.tableName, size);
      return size;
    }
  }

  static isTableScan(data: PlanData): data is TableScan {
    return data.label === TableScan.LABEL;
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
