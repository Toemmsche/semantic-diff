import XmlSerializable from './XmlSerializable.js';
import Fxp, {
  X2jOptionsOptional,
  XmlBuilderOptionsOptional
} from 'fast-xml-parser';
import TNode from '../tree/TNode.js';
import {GRAMMAR} from '../Global.js';

const ATTRIBUTE_GROUP_NAME = '@_';
const TEXT_NODE_NAME = '#text';
const ATTRIBUTE_NAME_PREFIX = '';
const xmlParseOptions: X2jOptionsOptional = {
  ignoreAttributes: false,
  attributesGroupName: ATTRIBUTE_GROUP_NAME,
  alwaysCreateTextNode: true,
  removeNSPrefix: true,
  trimValues: true,
  attributeNamePrefix: ATTRIBUTE_NAME_PREFIX,
  preserveOrder: true,

};
const XML_PARSER: Fxp.XMLParser = new Fxp.XMLParser(xmlParseOptions);

const xmlBuildOptions: XmlBuilderOptionsOptional = {
  attributesGroupName: ATTRIBUTE_GROUP_NAME,
  format: false,
  textNodeName: TEXT_NODE_NAME,
  attributeNamePrefix: ATTRIBUTE_NAME_PREFIX
};
const XML_BUILDER: Fxp.XMLBuilder = new Fxp.XMLBuilder(xmlBuildOptions);

export default class TNodeFXPSerializer implements XmlSerializable<TNode> {
  _parseXmlDom(tagName: string, xmlDom: any): TNode {
    // parse text
    let text = null;
    if (TEXT_NODE_NAME in xmlDom) {
      text = xmlDom[TEXT_NODE_NAME];
    }
    delete xmlDom[TEXT_NODE_NAME];

    // parse attributes
    const attributes = new Map<String, string>();
    if (ATTRIBUTE_GROUP_NAME in xmlDom) {
      const attributeGroup = xmlDom[ATTRIBUTE_GROUP_NAME];
      for (const key in attributeGroup) {
        attributes.set(key, attributeGroup[key]);
      }
    }
    delete xmlDom[ATTRIBUTE_GROUP_NAME];

    // parse children
    const children = [];
    for (const childTagName in xmlDom) {
      const child = this._parseXmlDom(childTagName, xmlDom[childTagName]);
      children.push(child);
    }

    // get associated grammar Node
    const grammarNode = GRAMMAR.getGrammarNodeByLabel(tagName);
    console.log(`Detected ${tagName} as ${grammarNode?.type}`);

    return new TNode(tagName, children, text, attributes, grammarNode);
  }

  parseXmlString(xml: string): TNode {
    let xmlDom = XML_PARSER.parse(xml);
    // get first object in array
    xmlDom = xmlDom[0]; // we expect a single root node
    // TODO ignore processing instructions and comments
    const tagName = Object.keys(xmlDom)[0];
    return this._parseXmlDom(tagName, xmlDom[tagName]);
  }

  _buildXmlDom(node: TNode, includeChildren = true, root: boolean = false): any {
    let xmlDom: any = Object.fromEntries(node.children.map(child => [
      child.label,
      this._buildXmlDom(child, true, false)
    ]));
    xmlDom = {
      ...xmlDom,
      // convert text
      '#text': node.text ?? undefined, // null indicates object presence
      '@_': Object.fromEntries(node.attributes.entries())
    };
    if (root) {
      return Object.fromEntries([
        [
          node.label,
          xmlDom
        ]
      ]);
    }
    return xmlDom;
  }

  buildXmlString(node: TNode): string {
    return XML_BUILDER.build(this._buildXmlDom(node, true, true));
  }
}