import { TNode } from '../../../semantic-diff/index';
import XmlData from '../../../semantic-diff/data/XmlData';
import DiffState from '../../../semantic-diff/delta/DiffState';
import { Box } from '@mui/material';
import React from 'react';
import { Nullable } from '../../../semantic-diff/Types';
import NodeDetails from '../../components/view/elements/NodeDetails';

export function RenderPlanNode(props: { data: PlanData }) {
  const { data: planData } = props;

  return (
    <Box>
      <Box>{planData.operatorName.toUpperCase()}</Box>
    </Box>
  );
}

export class PlanData extends XmlData {
  // dirty id hack, be careful about null IDs
  static increasingId = 0;
  dummyId = String(PlanData.increasingId++);

  get operatorName(): string {
    return this.label;
  }

  get operatorId(): string {
    return this.attributes.get('operator_id')!;
  }

  get id(): string {
    return this.dummyId;
  }

  get exactCardinality(): number {
    return parseInt(this.attributes.get('exact_cardinality')!);
  }

  get systemRepresentation(): string {
    return this.attributes.get('system_representation')!;
  }

  component(): Function {
    return RenderPlanNode;
  }
}

export type PlanNode = TNode<PlanData>;
