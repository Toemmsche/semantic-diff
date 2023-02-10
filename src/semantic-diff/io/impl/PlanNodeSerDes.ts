import { PlanData } from '../../../ui/model/operator/PlanData';
import { TableScan } from '../../../ui/model/operator/TableScan';
import { Nullable } from '../../Types';
import Join from '../../../ui/model/operator/Join';
import { PipelineBreakerScan } from '../../../ui/model/operator/PipelineBreakerScan';
import { QueryPlanResultCollection } from '../../../ui/model/meta/QueryPlanResult';
import GroupBy from '../../../ui/model/operator/GroupBy';
import Sort from '../../../ui/model/operator/Sort';
import { EarlyProbe } from '../../../ui/model/operator/EarlyProbe';
import { Result } from '../../../ui/model/operator/Result';
import SetOperation from '../../../ui/model/operator/SetOperation';
import TNodeJsonSerDes from '../TNodeJsonSerDes';

// use JSOn as the new default
export default class PlanNodeSerDes extends TNodeJsonSerDes<PlanData> {
  protected getData(
    tagName: string,
    text: Nullable<string>,
    attributes: Map<string, string>
  ): PlanData {
    switch (tagName) {
      case Result.LABEL:
        return new Result(tagName, text, attributes);
      case TableScan.LABEL:
        return new TableScan(tagName, text, attributes);
      case Join.LABEL:
        return new Join(tagName, text, attributes);
      case PipelineBreakerScan.LABEL:
        return new PipelineBreakerScan(tagName, text, attributes);
      case GroupBy.LABEL:
        return new GroupBy(tagName, text, attributes);
      case Sort.LABEL:
        return new Sort(tagName, text, attributes);
      case EarlyProbe.LABEL:
        return new EarlyProbe(tagName, text, attributes);
      case SetOperation.LABEL:
        return new SetOperation(tagName, text, attributes);
      default:
        return new PlanData(tagName, text, attributes);
    }
  }

  public queryPlanResultCollectionFromJson(jsontext: string): QueryPlanResultCollection {
    // no preprocessing necessary, we expect a valid input
    const coll = JSON.parse(jsontext) as QueryPlanResultCollection;
    return coll;
  }
}
