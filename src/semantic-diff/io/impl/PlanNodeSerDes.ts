import { Operator } from '../../../ui/model/operator/Operator';
import { Nullable } from '../../Types';
import { QueryPlanResultCollection } from '../../../ui/model/meta/QueryPlanResult';
import TNodeJsonSerDes from '../TNodeJsonSerDes';
import OperatorFactory from '../../../ui/model/operator/OperatorFactory';

// use JSOn as the new default
export default class PlanNodeSerDes extends TNodeJsonSerDes<Operator> {
  protected getData(
    tagName: string,
    text: Nullable<string>,
    attributes: Map<string, string>
  ): Operator {
    return OperatorFactory.create(tagName, text, attributes);
  }

  public queryPlanResultCollectionFromJson(jsontext: string): QueryPlanResultCollection {
    // no preprocessing necessary, we expect a valid input
    return JSON.parse(jsontext) as QueryPlanResultCollection;
  }
}
