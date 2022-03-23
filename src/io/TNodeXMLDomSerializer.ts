import XmlSerializable from './XmlSerializable.js';
import TNode from '../tree/TNode.js';
import xmldom from '@xmldom/xmldom';
import ISerializationOptions from './ISerializationOptions.js';
import vkbeautify, {xml} from 'vkbeautify';
import {getElementChildren, getTextContentWithoutChildren} from '../Util.js';

export default class TNodeXMLDomSerializer implements XmlSerializable<TNode> {

  constructor(private options: ISerializationOptions) {

  }

  buildXmlString(node: TNode): string {
    const ownerDocument = new xmldom.DOMImplementation().createDocument(
        null,
        null
    );
    const xmlString =  new xmldom.XMLSerializer().serializeToString(this.buildXmlDom(
        ownerDocument,
        node
    ));
    if (this.options.PRETTY_XML) {
      return vkbeautify.xml(xmlString);
    }
    return xmlString;
  }

  buildXmlDom(ownerDocument: any, node: TNode): any {
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

  parseXmlDom(xmlElement: Element, includeChildren = true): TNode {
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
    const grammarNode = this.options.GRAMMAR.getGrammarNodeByLabel(tagName);
    console.log(`Detected ${tagName} as ${grammarNode?.type}`);

    return new TNode(tagName, children, text, attributes, grammarNode);
  }

  parseXmlString(xml: string, includeChildren: boolean = true): TNode {
    const root = new xmldom
        .DOMParser()
        .parseFromString(xml, 'text/xml')
        .childNodes
        .item(0) as Element; // assume single root node as an element
    return this.parseXmlDom(root);
  }

}