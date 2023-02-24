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
import { Operator } from './Operator';

export default class OperatorFactory {
  public static create(
    label: string,
    text: Nullable<string>,
    attributes: Map<string, string>
  ): Operator {
    switch (label) {
      case Result.LABEL:
        return new Result(label, text, attributes);
      case TableScan.LABEL:
        return new TableScan(label, text, attributes);
      case Join.LABEL:
        return new Join(label, text, attributes);
      case PipelineBreakerScan.LABEL:
        return new PipelineBreakerScan(label, text, attributes);
      case GroupBy.LABEL:
        return new GroupBy(label, text, attributes);
      case Sort.LABEL:
        return new Sort(label, text, attributes);
      case EarlyProbe.LABEL:
        return new EarlyProbe(label, text, attributes);
      case SetOperation.LABEL:
        return new SetOperation(label, text, attributes);
      case MultiwayJoin.LABEL:
        return new MultiwayJoin(label, text, attributes);
      case CrossProduct.LABEL:
        return new CrossProduct(label, text, attributes);
      case GroupJoin.LABEL:
        return new GroupJoin(label, text, attributes);
      case InlineTable.LABEL:
        return new InlineTable(label, text, attributes);
      case Select.LABEL:
        return new Select(label, text, attributes);
      case Temp.LABEL:
        return new Temp(label, text, attributes);
      case Window.LABEL:
        return new Window(label, text, attributes);
      case CustomInner.LABEL:
        return new CustomInner(label, text, attributes);
      case CustomLeaf.LABEL:
        return new CustomLeaf(label, text, attributes);
      default:
        return new Operator(label, text, attributes);
    }
  }
}
