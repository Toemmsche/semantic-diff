import EditScriptXmlSerDes from '../EditScriptXmlSerDes';
import XmlData from '../../data/XmlData';
import XmlDataSerDes from './XmlDataSerDes';
import TNodeXMLSerDes from '../TNodeXMLSerDes';

export default class EditScriptXmlDataSerDes extends EditScriptXmlSerDes<XmlData> {
  protected getTNodeSerdes(): TNodeXMLSerDes<XmlData> {
    return new XmlDataSerDes(this.grammar, this.options);
  }
}
