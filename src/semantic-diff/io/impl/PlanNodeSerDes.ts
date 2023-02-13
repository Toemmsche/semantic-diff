import { PlanData } from '../../../ui/model/operator/PlanData';
import { TableScan } from '../../../ui/model/operator/leaf/TableScan';
import { Nullable } from '../../Types';
import Join from '../../../ui/model/operator/inner/Join';
import { PipelineBreakerScan } from '../../../ui/model/operator/inner/PipelineBreakerScan';
import { QueryPlanResultCollection } from '../../../ui/model/meta/QueryPlanResult';
import GroupBy from '../../../ui/model/operator/inner/GroupBy';
import Sort from '../../../ui/model/operator/inner/Sort';
import { EarlyProbe } from '../../../ui/model/operator/inner/EarlyProbe';
import { Result } from '../../../ui/model/operator/inner/Result';
import SetOperation from '../../../ui/model/operator/inner/SetOperation';
import TNodeJsonSerDes from '../TNodeJsonSerDes';
import { GroupJoin } from '../../../ui/model/operator/inner/GroupJoin';
import { InlineTable } from '../../../ui/model/operator/leaf/InlineTable';
import { MultiwayJoin } from '../../../ui/model/operator/inner/MultiwayJoin';
import { CrossProduct } from '../../../ui/model/operator/inner/CrossProduct';
import { Select } from '../../../ui/model/operator/inner/Select';
import { Temp } from '../../../ui/model/operator/inner/Temp';
import { CustomLeaf } from '../../../ui/model/operator/leaf/CustomLeaf';
import { CustomInner } from '../../../ui/model/operator/inner/CustomInner';
import { Window } from '../../../ui/model/operator/inner/Window';

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
      case MultiwayJoin.LABEL:
        return new MultiwayJoin(tagName, text, attributes);
      case CrossProduct.LABEL:
        return new CrossProduct(tagName, text, attributes);
      case GroupJoin.LABEL:
        return new GroupJoin(tagName, text, attributes);
      case InlineTable.LABEL:
        return new InlineTable(tagName, text, attributes);
      case Select.LABEL:
        return new Select(tagName, text, attributes);
      case Temp.LABEL:
        return new Temp(tagName, text, attributes);
      case Window.LABEL:
        return new Window(tagName, text, attributes);
      case CustomInner.LABEL:
        return new CustomInner(tagName, text, attributes);
      case CustomLeaf.LABEL:
        return new CustomLeaf(tagName, text, attributes);
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
