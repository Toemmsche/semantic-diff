export default interface XmlSerializable<T> {
    fromXmlString(xml: String): T;

    fromXmlDom(tagName: String, xmlDom: any): T;

    toXmlString(): String;

    toXmlDom(): object;
}