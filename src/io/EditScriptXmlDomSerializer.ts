import {EditScript} from '../delta/EditScript.js';
import XmlSerializable from './XmlSerializable.js';
import xmldom from '@xmldom/xmldom';
import ChangeType from '../delta/ChangeType.js';
import TNodeXMLDomSerializer from './TNodeXMLDomSerializer.js';
import {EditOperation} from '../delta/EditOperation.js';
import ISerializationOptions from './ISerializationOptions.js';
import vkbeautify from 'vkbeautify';
import {getElementChildren} from '../Util.js';


export default class EditScriptXMLDomSerializer implements XmlSerializable<EditScript> {

  constructor(private options: ISerializationOptions) {
  }

  buildXmlString(editScript: EditScript): string {
    const ownerDocument = new xmldom.DOMImplementation().createDocument(
        null,
        null
    ); //TODO namespaces
    const root = ownerDocument.createElement(this.options.DELTA_TAG);

    root.setAttribute('cost', editScript.getCost().toString());

    // parser for TNodes
    const nodeParser = new TNodeXMLDomSerializer(this.options);

    for (const editOperation of editScript) {
      const xmlElement = ownerDocument.createElement(editOperation.type);
      if (editOperation.oldPath != null) {
        xmlElement.setAttribute('oldPath', editOperation.oldPath);
      }
      if (editOperation.newPath != null) {
        xmlElement.setAttribute('newPath', editOperation.newPath);
      }
      if (editOperation.newContent != null) {
        xmlElement.appendChild(nodeParser.buildXmlDom(
            ownerDocument,
            editOperation.newContent
        ));
      }
      root.appendChild(xmlElement);
    }
    const xmlString =  new xmldom.XMLSerializer().serializeToString(root);
    if (this.options.PRETTY_XML) {
      return vkbeautify.xml(xmlString);
    }
    return xmlString;
  }

  parseXmlString(xml: string, includeChildren: boolean): EditScript {
    const root: Element = new xmldom.DOMParser().parseFromString(xml).childNodes
        .item(0) as Element; // assume root node is first child
    if (root.nodeName !== this.options.DELTA_TAG) {
      throw new Error('invalid root tag');
    }
    // parse cost
    let cost = undefined;
    if (root.hasAttribute('cost')) {
      cost = parseInt(root.getAttribute('cost')!!);
    }

    // parser for TNodes
    const nodeParser = new TNodeXMLDomSerializer(this.options);

    const editOperations = [];
    // parse edit operations
    for (const element of getElementChildren(root)) {
      const changeType = element.nodeName;

      let oldPath = undefined;
      if (element.hasAttribute('oldPath')) {
        oldPath = element.getAttribute('oldPath')!!;
      }
      let newPath = undefined;
      if (element.hasAttribute('newPath')) {
        newPath = element.getAttribute('newPath')!!;
      }

      let newContent = undefined;
      // check for newcontent
      if (element.childNodes.length > 0) {
        const newContentElement = element.childNodes.item(0) as Element;
        newContent = nodeParser.parseXmlDom(newContentElement);
      }

      editOperations.push(new EditOperation(
          changeType as ChangeType,
          oldPath,
          newPath,
          newContent
      ));
    }
    return new EditScript(editOperations, cost);
  }

}