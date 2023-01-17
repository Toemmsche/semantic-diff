import DiffState from '../../../../semantic-diff/delta/DiffState';
import { PlanData } from '../../../model/PlanData';
import { Nullable } from '../../../../semantic-diff/Types';

export default interface IDiffNodeData {
  diffState: DiffState;
  matchData: Nullable<PlanData>;
}
