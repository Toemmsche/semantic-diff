import { TNode } from '../../../semantic-diff/index';
import XmlData from '../../../semantic-diff/data/XmlData';
import { Box } from '@mui/material';
import React from 'react';
import { Nullable } from '../../../semantic-diff/Types';
import { Result } from './inner/Result';
import { TableScan } from './leaf/TableScan';
import Join from './inner/Join';
import { PipelineBreakerScan } from './inner/PipelineBreakerScan';
import GroupBy from './inner/GroupBy';
import Sort from './inner/Sort';
import { EarlyProbe } from './inner/EarlyProbe';
import SetOperation from './inner/SetOperation';
import { MultiwayJoin } from './inner/MultiwayJoin';
import { CrossProduct } from './inner/CrossProduct';
import { GroupJoin } from './inner/GroupJoin';
import { InlineTable } from './leaf/InlineTable';
import { Select } from './inner/Select';
import { Temp } from './inner/Temp';
import { Window } from './inner/Window';
import { CustomInner } from './inner/CustomInner';
import { CustomLeaf } from './leaf/CustomLeaf';
import ICopyable from '../../../semantic-diff/data/ICopyable';
import PlanDataFactory from './PlanDataFactory';

export class PlanData extends XmlData implements ICopyable<PlanData> {
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

  get estimatedCardinality(): number {
    return parseInt(this.attributes.get('estimated_cardinality')!);
  }

  get systemRepresentation(): string {
    return this.attributes.get('system_representation')!;
  }

  render(): any {
    return <Box>{this.label}</Box>;
  }

  copy(): PlanData {
    const xmlDataCopy = super.copy();
    // must remove operatorId, as it would no longer be unique
    xmlDataCopy.attributes.delete('operator_id');
    return PlanDataFactory.create(xmlDataCopy.label, xmlDataCopy.text, xmlDataCopy.attributes);
  }
}

export type PlanNode = TNode<PlanData>;
