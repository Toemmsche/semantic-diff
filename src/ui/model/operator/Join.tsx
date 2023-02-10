import { PlanData } from './PlanData';
import { Box, Stack } from '@mui/material';
import React from 'react';

export enum JoinMethod {
  HASH_JOIN = 'hash',
  NESTED_LOOP_JOIN = 'nl',
  BLOCKWISE_NESTED_LOOP_JOIN = 'bnl',
  SORT_MERGE_JOIN = 'merge',
  INDEX_JOIN = 'indexnl'
}

export enum JoinType {
  INNER = 'inner',
  SINGLE = 'single',
  FULL_OUTER = 'fullouter',
  LEFT_OUTER = 'leftouter',
  RIGHT_OUTER = 'rightouter',
  LEFT_SEMI = 'leftsemi',
  RIGHT_SEMI = 'rightsemi',
  LEFT_MARK = 'leftmark',
  RIGHT_MARK = 'rightmark',
  LEFT_ANTI = 'leftanti',
  RIGHT_ANTI = 'rightanti'
}

const UTF8_JOIN_SYMBOLS = new Map<JoinType, string>([
  [JoinType.INNER, '⋈'],
  [JoinType.LEFT_OUTER, '\u27d5'],
  [JoinType.RIGHT_OUTER, '\u27d6'],
  [JoinType.FULL_OUTER, '\u27d7'],
  [JoinType.SINGLE, '\u27d51'],
  [JoinType.LEFT_MARK, '\u27d5\u1D39'],
  [JoinType.RIGHT_MARK, '\u27d6\u1D39'],
  [JoinType.LEFT_SEMI, '\u22c9'],
  [JoinType.RIGHT_SEMI, '\u22ca'],
  [JoinType.LEFT_ANTI, '\u25b7'],
  [JoinType.RIGHT_ANTI, '\u25c1']
]);

export function getJoinSymbolForType(type: JoinType) {
  if (UTF8_JOIN_SYMBOLS.has(type)) {
    return UTF8_JOIN_SYMBOLS.get(type);
  }
  return UTF8_JOIN_SYMBOLS.get(JoinType.INNER)! + '?';
}

export function RenderJoin(props: { data: Join }) {
  const { data: joinData } = props;

  let joinName = 'JOIN';
  switch (joinData.method) {
    case JoinMethod.INDEX_JOIN:
      joinName = 'INDEX NL JOIN';
      break;
    case JoinMethod.HASH_JOIN:
      joinName = 'HASH JOIN';
      break;
    case JoinMethod.NESTED_LOOP_JOIN:
      joinName = 'NL JOIN';
      break;
    case JoinMethod.BLOCKWISE_NESTED_LOOP_JOIN:
      joinName = 'BLOCK NL JOIN';
      break;
  }
  return (
    <Box>
      <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
        <Box>{getJoinSymbolForType(joinData.joinType)}</Box>
        <Box>{joinName}</Box>
      </Stack>
    </Box>
  );
}

export default class Join extends PlanData {
  public static LABEL = 'Join';

  get joinType(): JoinType {
    return this.attributes.get('type')! as JoinType;
  }

  component(): Function {
    return RenderJoin;
  }

  get method(): JoinMethod {
    return this.attributes.get('method')! as JoinMethod;
  }
}
