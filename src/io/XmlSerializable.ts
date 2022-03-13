export default interface XmlSerializable<T> {
  parseXmlString(xml: string, includeChildren: boolean): T;

  buildXmlString(obj: T): string;

}