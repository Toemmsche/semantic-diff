import TNode, { TNodeBuilder } from '../tree/TNode';
import vkbeautify from 'vkbeautify';
import ISerDesOptions from './ISerDesOptions';
import Grammar from '../grammar/Grammar';
import SerDes from './SerDes';
import XmlData from '../data/XmlData';

export default class TNodeJsonSerDes extends SerDes<TNode<XmlData>> {
  public constructor(private grammar: Grammar, private options: ISerDesOptions) {
    super();
  }
  public override buildString(node: TNode<XmlData>): string {
    // TODO replacer function
    const jsonString = JSON.stringify(node);
    // TODO change the option name to be more general, e.g. 'PRETTY_OUTPUT'
    if (this.options.PRETTY_XML) {
      return vkbeautify.json(jsonString);
    }
    return jsonString;
  }

  private transformParsedJsonObj(
    parsedJsonObj: any,
    includeChildren: boolean = true
  ): TNode<XmlData> {
    const attributes = new Map();
    const children = [];
    const label = parsedJsonObj[this.options.JSON_TAG_KEY];
    const text = parsedJsonObj[this.options.JSON_TEXT_KEY];
    for (const attr of Object.keys(parsedJsonObj)) {
      if (attr.startsWith(this.options.JSON_ATTRIBUTE_PREFIX)) {
        // attribute
        const strippedAttr = attr.substring(this.options.JSON_ATTRIBUTE_PREFIX.length);
        attributes.set(strippedAttr, parsedJsonObj[attr]);
      } else if (attr === this.options.JSON_CHILDREN_KEY && includeChildren) {
        for (const childObj of parsedJsonObj[attr]) {
          const child = this.transformParsedJsonObj(childObj, includeChildren);
          children.push(child);
        }
      }
    }
    const grammarNode = this.grammar.getGrammarNodeByLabel(label);
    const builder = new TNodeBuilder<XmlData>()
      .data(new XmlData(label, text, attributes))
      .children(children);

    if (grammarNode) {
      builder.grammarNode(grammarNode);
    }

    return builder.build();
  }

  public override parseFromString(
    jsonString: string,
    includeChildren: boolean = true
  ): TNode<XmlData> {
    const parsedJsonObj = JSON.parse(jsonString);
    return this.transformParsedJsonObj(parsedJsonObj, true);
  }
}
