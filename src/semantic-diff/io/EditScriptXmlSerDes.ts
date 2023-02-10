import { EditScript } from '../delta/EditScript';
import SerDes from './SerDes';
import xmldom from '@xmldom/xmldom';
import ChangeType from '../delta/ChangeType';
import TNodeXMLSerDes from './TNodeXMLSerDes';
import { EditOperation } from '../delta/EditOperation';
import vkbeautify from 'vkbeautify';
import { getElementChildren } from '../Util';
import ISerDesOptions from './options/ISerDesOptions';
import Grammar from '../grammar/Grammar';
import TNode from '../tree/TNode';

export default abstract class EditScriptXmlSerDes<T> extends SerDes<EditScript<T>> {
  public constructor(protected grammar: Grammar, protected options: ISerDesOptions) {
    super();
  }

  protected abstract getTNodeSerdes(): TNodeXMLSerDes<T>;

  public override buildString(editScript: EditScript<T>): string {
    const ownerDocument = new xmldom.DOMImplementation().createDocument(null, null); //TODO namespaces
    const root = ownerDocument.createElement(this.options.DELTA_TAG);

    root.setAttribute('cost', editScript.getCost().toString());

    // parser for TNodes
    const nodeSerDes = this.getTNodeSerdes();

    for (const editOperation of editScript) {
      const xmlElement = ownerDocument.createElement(editOperation.type);
      if (editOperation.oldPath != null) {
        xmlElement.setAttribute('oldPath', editOperation.oldPath);
      }
      if (editOperation.newPath != null) {
        xmlElement.setAttribute('newPath', editOperation.newPath);
      }
      if (editOperation.newContent != null) {
        xmlElement.appendChild(nodeSerDes.buildXmlDom(ownerDocument, editOperation.newContent));
      }
      root.appendChild(xmlElement);
    }
    const xmlString = new xmldom.XMLSerializer().serializeToString(root);
    if (this.options.PRETTY_XML) {
      return vkbeautify.xml(xmlString);
    }
    return xmlString;
  }

  public override parseFromString(xml: string, includeChildren: boolean): EditScript<T> {
    const root: Element = new xmldom.DOMParser().parseFromString(xml).childNodes.item(0) as Element; // assume root node is first child
    if (root.nodeName !== this.options.DELTA_TAG) {
      throw new Error('invalid root tag');
    }
    // parse cost
    let cost = undefined;
    if (root.hasAttribute('cost')) {
      cost = parseInt(root.getAttribute('cost')!!);
    }

    // parser for TNodes
    const nodeParser = this.getTNodeSerdes();

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

      editOperations.push(
        new EditOperation(changeType as ChangeType, oldPath, newPath, newContent)
      );
    }
    return new EditScript(editOperations, cost);
  }
}
