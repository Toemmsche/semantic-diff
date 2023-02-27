import SerDes from './SerDes';
import xmldom from '@xmldom/xmldom';
import vkbeautify from 'vkbeautify';
import { getElementChildren, getTextContentWithoutChildren, RUNNING_IN_BROWSER } from '../Util';
import ISerDesOptions from './options/ISerDesOptions';
import Grammar from '../grammar/Grammar';
import { Nullable } from '../Types';
import TNode from '../tree/TNode';
import TNodeBuilder from '../tree/TNodeBuilder';

export default abstract class TNodeXMLSerDes<T> extends SerDes<TNode<T>> {
  public constructor(private grammar: Grammar, private options: ISerDesOptions) {
    super();
  }

  protected abstract getData(
    tagName: string,
    text: Nullable<string>,
    attributes: Map<string, string>
  ): T;

  public override buildString(node: TNode<T>): string {
    const ownerDocument = (
      RUNNING_IN_BROWSER ? new DOMImplementation() : new xmldom.DOMImplementation()
    ).createDocument(null, null);
    const xmlString = (
      RUNNING_IN_BROWSER ? new XMLSerializer() : new xmldom.XMLSerializer()
    ).serializeToString(this.buildXmlDom(ownerDocument, node));
    if (this.options.PRETTY_XML) {
      return vkbeautify.xml(xmlString);
    }
    return xmlString;
  }

  public buildXmlDom(ownerDocument: any, node: TNode<T>): any {
    const xmlElement = ownerDocument.createElement(node.label);
    if (node.isRoot()) {
      // TODO namespace
    }

    for (const [key, value] of node.attributes) {
      xmlElement.setAttribute(key, value);
    }

    for (const child of node) {
      xmlElement.appendChild(this.buildXmlDom(ownerDocument, child));
    }

    if (node.text != null) {
      xmlElement.appendChild(ownerDocument.createTextNode(node.text));
    }

    return xmlElement;
  }

  public parseXmlDom(xmlElement: Element, includeChildren = true): TNode<T> {
    const tagName = xmlElement.localName;

    // parse attributes
    const attributes = new Map();
    for (let i = 0; i < xmlElement.attributes.length; i++) {
      const attrNode = xmlElement.attributes.item(i)!!;
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

    // TODO remove logging
    // console.log(`Detected ${tagName} as ${grammarNode?.type}`);

    const builder = new TNodeBuilder<T>()
      .data(this.getData(tagName, text, attributes))
      .children(children);

    if (grammarNode) {
      builder.grammarNode(grammarNode);
    }

    return builder.build();
  }

  public override parseFromString(xml: string, includeChildren: boolean = true): TNode<T> {
    const root = (RUNNING_IN_BROWSER ? new DOMParser() : new xmldom.DOMParser())
      .parseFromString(xml, 'text/xml')
      .childNodes.item(0) as Element; // assume single root node as an element
    return this.parseXmlDom(root);
  }
}
