import { PlanData } from './PlanData';
import { Box } from '@mui/material';
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
  [SetOperationType.UNION_ALL, '\u228E\u2003'],
  [SetOperationType.UNION, '\u22C3\u2003'],
  [SetOperationType.INTERSECT_ALL, '\u2A40\u2003'],
  [SetOperationType.INTERSECT, '\u2229\u2003'],
  [SetOperationType.EXCEPT_ALL, '\u2238\u2003'],
  [SetOperationType.EXCEPT, '\u2216\u2003']
]);

export function getSetOperationSymbolForType(type: SetOperationType) {
  if (UTF8_SET_SYMBOLS.has(type)) {
    return UTF8_SET_SYMBOLS.get(type);
  }
  return '???';
}

export function RenderSetOperation(props: { data: SetOperation }) {
  const { data: setOperationData } = props;

  return (
    <Box>
      {getSetOperationSymbolForType(setOperationData.type) + setOperationData.type.toUpperCase()}
    </Box>
  );
}

export default class SetOperation extends PlanData {
  public static LABEL = 'SetOperation';

  get type(): SetOperationType {
    return this.attributes.get('type')! as SetOperationType;
  }
  component(): Function {
    return RenderSetOperation;
  }
}
