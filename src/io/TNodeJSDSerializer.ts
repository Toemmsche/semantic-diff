import XmlSerializable from './XmlSerializable.js';
import TNode from '../tree/TNode.js';
import {JSDOM} from 'jsdom';

export default class TNodeJSDSerializer implements XmlSerializable<TNode> {

  buildXmlDom(obj: TNode, includeChildren: boolean): any {
    throw new Error('unimplemented');
  }

  buildXmlString(obj: TNode): string {
    return '';
  }

  parseXmlDom(xmlDom: any): TNode {
    throw new Error('unimplemented');
  }

  parseXmlString(xml: string): TNode {
    const dom = new JSDOM(xml, {contentType: 'text/xml'});
    const xmlDom = dom.window.document.children.item(0);
    return this.parseXmlDom(xmlDom);
  }

};