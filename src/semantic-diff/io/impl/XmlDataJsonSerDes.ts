import { Nullable } from '../../Types';
import XmlData from '../../data/XmlData';
import TNodeJsonSerDes from '../TNodeJsonSerDes';

export default class XmlDataJsonSerDes extends TNodeJsonSerDes<XmlData> {
  protected getData(
    tagName: string,
    text: Nullable<string>,
    attributes: Map<string, string>
  ): XmlData {
    return new XmlData(tagName, text, attributes);
  }
}
