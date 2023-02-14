import { PlanData } from '../../../ui/model/operator/PlanData';
import { Nullable } from '../../Types';
import { QueryPlanResultCollection } from '../../../ui/model/meta/QueryPlanResult';
import TNodeJsonSerDes from '../TNodeJsonSerDes';
import PlanDataFactory from '../../../ui/model/operator/PlanDataFactory';

// use JSOn as the new default
export default class PlanNodeSerDes extends TNodeJsonSerDes<PlanData> {
  protected getData(
    tagName: string,
    text: Nullable<string>,
    attributes: Map<string, string>
  ): PlanData {
    return PlanDataFactory.create(tagName, text, attributes);
  }

  public queryPlanResultCollectionFromJson(jsontext: string): QueryPlanResultCollection {
    // no preprocessing necessary, we expect a valid input
    return JSON.parse(jsontext) as QueryPlanResultCollection;
  }
}
