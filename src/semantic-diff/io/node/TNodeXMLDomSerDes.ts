import SerDes from '../SerDes';
import TNode from '../../tree/TNode';
import xmldom from '@xmldom/xmldom';
import vkbeautify from 'vkbeautify';
import {getElementChildren, getTextContentWithoutChildren} from '../../Util';
import ISerDesOptions from '../ISerDesOptions';
import Grammar from '../../grammar/Grammar';

export default class TNodeXMLDomSerDes extends SerDes<TNode> {

  public constructor(private grammar: Grammar, private options: ISerDesOptions) {
    super();
  }

  public override buildString(node: TNode): string {
    const ownerDocument = new xmldom.DOMImplementation().createDocument(
        null,
        null
    );
    const xmlString = new xmldom.XMLSerializer().serializeToString(this.buildXmlDom(
        ownerDocument,
        node
    ));
    if (this.options.PRETTY_XML) {
      return vkbeautify.xml(xmlString);
    }
    return xmlString;
  }

  public buildXmlDom(ownerDocument: any, node: TNode): any {
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

  public parseXmlDom(xmlElement: Element, includeChildren = true): TNode {
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

    return new TNode(tagName, children, text, attributes, grammarNode);
  }

  public override parseFromString(xml: string, includeChildren: boolean = true): TNode {
    const root = new xmldom
        .DOMParser()
        .parseFromString(xml, 'text/xml')
        .childNodes
        .item(0) as Element; // assume single root node as an element
    return this.parseXmlDom(root);
  }

}