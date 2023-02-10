import TNode, { TNodeBuilder } from '../tree/TNode';
import vkbeautify from 'vkbeautify';
import ISerDesOptions from './options/ISerDesOptions';
import Grammar from '../grammar/Grammar';
import SerDes from './SerDes';
import { Nullable } from '../Types';

export default abstract class TNodeJsonSerDes<T> extends SerDes<TNode<T>> {
  public constructor(private grammar: Grammar, private options: ISerDesOptions) {
    super();
  }

  protected abstract getData(
    tagName: string,
    text: Nullable<string>,
    attributes: Map<string, string>
  ): T;

  public override buildString(node: TNode<T>): string {
    // TODO replacer function
    const jsonString = JSON.stringify(node);
    // TODO change the option name to be more general, e.g. 'PRETTY_OUTPUT'
    if (this.options.PRETTY_XML) {
      return vkbeautify.json(jsonString);
    }
    return jsonString;
  }

  public transformParsedJsonObj(parsedJsonObj: any, includeChildren: boolean = true): TNode<T> {
    const attributes = new Map();
    const children = [];
    const label = parsedJsonObj[this.options.JX_LABEL_KEY];
    const text = parsedJsonObj[this.options.JX_TEXT_KEY];
    for (const [key, val] of Object.entries(parsedJsonObj)) {
      if (key === this.options.JX_ATTRS_KEY) {
        for (const [attrKey, attrVal] of Object.entries(val as any)) {
          // attribute
          attributes.set(attrKey, attrVal);
        }
      } else if (key === this.options.JX_CHILDREN_KEY && includeChildren) {
        for (const childObj of val as Array<any>) {
          const child = this.transformParsedJsonObj(childObj, includeChildren);
          children.push(child);
        }
      }
    }
    const grammarNode = this.grammar.getGrammarNodeByLabel(label);
    const builder = new TNodeBuilder<T>()
      .data(this.getData(label, text, attributes))
      .children(children);

    if (grammarNode) {
      builder.grammarNode(grammarNode);
    }

    return builder.build();
  }

  public override parseFromString(jsonString: string, includeChildren: boolean = true): TNode<T> {
    const parsedJsonObj = JSON.parse(jsonString);
    return this.transformParsedJsonObj(parsedJsonObj, true);
  }
}
