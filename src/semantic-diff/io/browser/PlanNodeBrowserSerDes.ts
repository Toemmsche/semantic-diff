import SerDes from '../SerDes';
import TNode, { TNodeBuilder } from '../../tree/TNode';
import { getElementChildren, getTextContentWithoutChildren } from '../../Util';
import { PlanData } from '../../../ui/model/operator/PlanData';
import TNodeBrowserSerDes from './TNodeBrowserSerDes';
import { TableScan } from '../../../ui/model/operator/TableScan';
import { Nullable } from '../../Types';
import Join from '../../../ui/model/operator/Join';
import { PipelineBreakerScan } from '../../../ui/model/operator/PipelineBreakerScan';
import { QueryPlanResultCollection } from '../../../ui/state/QueryPlanResult';
import GroupBy from '../../../ui/model/operator/GroupBy';
import Sort from '../../../ui/model/operator/Sort';
import { EarlyProbe } from '../../../ui/model/operator/EarlyProbe';
import { Result } from '../../../ui/model/operator/Result';

export default class PlanNodeBrowserSerDes
  extends TNodeBrowserSerDes
  implements SerDes<TNode<PlanData>>
{
  private getInitializedBuilderFromTagName(
    tagName: string,
    text: Nullable<string>,
    attributes: Map<string, string>
  ): TNodeBuilder<PlanData> {
    switch (tagName) {
      case Result.LABEL:
        return new TNodeBuilder<Result>().data(new Result(tagName, text, attributes));
      case TableScan.LABEL:
        return new TNodeBuilder<TableScan>().data(new TableScan(tagName, text, attributes));
      case Join.LABEL:
        return new TNodeBuilder<Join>().data(new Join(tagName, text, attributes));
      case PipelineBreakerScan.LABEL:
        return new TNodeBuilder<PipelineBreakerScan>().data(
          new PipelineBreakerScan(tagName, text, attributes)
        );
      case GroupBy.LABEL:
        return new TNodeBuilder<GroupBy>().data(new GroupBy(tagName, text, attributes));
      case Sort.LABEL:
        return new TNodeBuilder<Sort>().data(new Sort(tagName, text, attributes));
      case EarlyProbe.LABEL:
        return new TNodeBuilder<EarlyProbe>().data(new EarlyProbe(tagName, text, attributes));
      default:
        return new TNodeBuilder<PlanData>().data(new PlanData(tagName, text, attributes));
    }
  }

  public parseXmlDom(xmlElement: Element, includeChildren = true): TNode<PlanData> {
    const tagName = xmlElement.localName;

    // parse attributes
    const attributes = new Map();
    for (let i = 0; i < xmlElement.attributes.length; i++) {
      const attrNode = xmlElement.attributes.item(i)!;
      attributes.set(attrNode.name, attrNode.value);
    }

    // children
    const children = [];
    for (const childElement of getElementChildren(xmlElement)) {
      children.push(this.parseXmlDom(childElement, includeChildren));
    }

    //text
    const text = getTextContentWithoutChildren(xmlElement);

    // get associated grammar Node
    const grammarNode = this.grammar.getGrammarNodeByLabel(tagName);

    const builder = this.getInitializedBuilderFromTagName(tagName, text, attributes).children(
      children
    );

    if (grammarNode) {
      builder.grammarNode(grammarNode);
    }

    return builder.build();
  }

  public override parseFromString(xml: string, includeChildren = true): TNode<PlanData> {
    const root = new DOMParser().parseFromString(xml, 'text/xml').childNodes.item(0) as Element; // assume single root node as an element
    return this.parseXmlDom(root);
  }

  public queryPlanResultCollectionFromJson(jsontext: string): QueryPlanResultCollection {
    // no preprocessing necessary, we expect a valid input
    return JSON.parse(jsontext) as QueryPlanResultCollection;
  }
}
