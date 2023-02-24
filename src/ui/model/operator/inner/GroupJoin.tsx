import { Operator } from '../Operator';
import React from 'react';
import { Box, Stack } from '@mui/material';
import { JoinMethod, JoinType } from './Join';

export const UTF8_GROUP_JOIN = '\u25b7\u0393';

export function RenderGroupJoin(props: { data: GroupJoin }) {
  const { data: groupJoinData } = props;
}

export class GroupJoin extends Operator {
  public static LABEL = 'GroupJoin';

  get joinType(): JoinType {
    return this.attributes.get('type')! as JoinType;
  }

  get method(): JoinMethod {
    return this.attributes.get('method')! as JoinMethod;
  }

  static isGroupJoin(data: Operator): data is GroupJoin {
    return data.label === GroupJoin.LABEL;
  }

  render(): any {
    return (
      <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
        <Box>{UTF8_GROUP_JOIN}</Box>
        <Box>GROUPJOIN</Box>
      </Stack>
    );
  }
}
