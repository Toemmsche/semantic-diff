import { PlanData } from '../PlanData';
import React from 'react';
import { Box, Stack } from '@mui/material';

export const UTF8_GROUP_JOIN = '\u25b7\u0393';

export function RenderGroupJoin(props: { data: GroupJoin }) {
  const { data: groupJoinData } = props;
}

export class GroupJoin extends PlanData {
  public static LABEL = 'GroupJoin';

  render(): any {
    return (
      <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
        <Box>{UTF8_GROUP_JOIN}</Box>
        <Box>GROUPJOIN</Box>
      </Stack>
    );
  }
}
