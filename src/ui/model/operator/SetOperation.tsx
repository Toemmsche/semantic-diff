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

export function RenderSetOperation(props: { data: SetOperation }) {
  const { data: setOperationData } = props;

  return <Box>SetOperation</Box>;
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
