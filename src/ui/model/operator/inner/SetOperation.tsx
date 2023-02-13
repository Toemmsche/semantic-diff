import { PlanData } from '../PlanData';
import { Box, Stack } from '@mui/material';
import React from 'react';

export enum SetOperationType {
  UNION = 'union',
  UNION_ALL = 'unionall',
  INTERSECT = 'intersect',
  INTERSECT_ALL = 'intersectall',
  EXCEPT = 'except',
  EXCEPT_ALL = 'exceptall'
}

const UTF8_SET_SYMBOLS = new Map<SetOperationType, string>([
  [SetOperationType.UNION_ALL, '\u228E'],
  [SetOperationType.UNION, '\u22C3'],
  [SetOperationType.INTERSECT_ALL, '\u2229'],
  [SetOperationType.INTERSECT, '\u2229'],
  [SetOperationType.EXCEPT_ALL, '\u2238'],
  [SetOperationType.EXCEPT, '\u2216']
]);

export function getSetOperationSymbolForType(type: SetOperationType) {
  if (UTF8_SET_SYMBOLS.has(type)) {
    return UTF8_SET_SYMBOLS.get(type);
  }
  return '???';
}

export default class SetOperation extends PlanData {
  public static LABEL = 'SetOperation';

  get type(): SetOperationType {
    return this.attributes.get('type')! as SetOperationType;
  }

  render(): any {
    let setOperationName;
    switch (this.type) {
      case SetOperationType.EXCEPT:
        setOperationName = 'EXCEPT';
        break;
      case SetOperationType.EXCEPT_ALL:
        setOperationName = 'EXCEPT ALL';
        break;
      case SetOperationType.INTERSECT:
        setOperationName = 'INTERSECT';
        break;
      case SetOperationType.INTERSECT_ALL:
        setOperationName = 'INTERSECT ALL';
        break;
      case SetOperationType.UNION:
        setOperationName = 'UNION';
        break;
      case SetOperationType.UNION_ALL:
        setOperationName = 'UNION ALL';
        break;
    }

    return (
      <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
        <Box>{getSetOperationSymbolForType(this.type)}</Box>
        <Box>{setOperationName}</Box>
      </Stack>
    );
  }
}
