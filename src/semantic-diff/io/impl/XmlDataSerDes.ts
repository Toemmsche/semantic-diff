import { Nullable } from '../../Types';
import TNodeXMLSerDes from '../TNodeXMLSerDes';
import XmlData from '../../data/XmlData';

export default class XmlDataSerDes extends TNodeXMLSerDes<XmlData> {
  protected getData(
    tagName: string,
    text: Nullable<string>,
    attributes: Map<string, string>
  ): XmlData {
    return new XmlData(tagName, text, attributes);
  }
}
