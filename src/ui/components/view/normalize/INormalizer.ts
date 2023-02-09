import { PlanData, PlanNode } from '../../../model/operator/PlanData';
import INormalizeOptions from './INormalizeOptions';
import { Edge, Node } from 'reactflow';

export default interface INormalizer {
  normalize(
    plan: PlanNode,
    planIndex: number,
    dimensinos: Map<PlanNode, [number, number]>,
    options: INormalizeOptions
  ): [Node<PlanData>[], Edge[]];
}
