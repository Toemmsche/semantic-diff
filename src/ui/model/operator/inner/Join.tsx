import { PlanData, PlanNode } from '../PlanData';
import { Box, Stack } from '@mui/material';
import React from 'react';

export enum JoinMethod {
  HASH_JOIN = 'hash',
  NESTED_LOOP_JOIN = 'nl',
  BLOCKWISE_NESTED_LOOP_JOIN = 'bnl',
  MERGE_JOIN = 'merge',
  INDEX_NESTED_LOOP_JOIN = 'indexnl'
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

export default class Join extends PlanData {
  public static LABEL = 'Join';

  get joinType(): JoinType {
    return this.attributes.get('type')! as JoinType;
  }

  render(): any {
    let joinName = 'JOIN';
    switch (this.method) {
      case JoinMethod.INDEX_NESTED_LOOP_JOIN:
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
      case JoinMethod.MERGE_JOIN:
        joinName = 'MERGE JOIN';
        break;
    }
    return (
      <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
        <Box>{getJoinSymbolForType(this.joinType)}</Box>
        <Box>{joinName}</Box>
      </Stack>
    );
  }

  static isJoin(data: PlanData): data is Join {
    return data.label === Join.LABEL;
  }

  static isBuildEdge(parent: PlanNode, child: PlanNode) {
    const parentPlanData = parent.data;
    if (Join.isJoin(parentPlanData) && parentPlanData.method === JoinMethod.HASH_JOIN) {
      return child
        .getMatchGroup()
        .some((n) => parent.getMatchGroup().includes(n.getParent()) && n.getIndex() === 0);
    }
  }

  static isProbeEdge(parent: PlanNode, child: PlanNode) {
    const parentPlanData = parent.data;
    if (Join.isJoin(parentPlanData) && parentPlanData.method === JoinMethod.HASH_JOIN) {
      return child
        .getMatchGroup()
        .some((n) => parent.getMatchGroup().includes(n.getParent()) && n.getIndex() === 1);
    }
  }

  get method(): JoinMethod {
    return this.attributes.get('method')! as JoinMethod;
  }
}
