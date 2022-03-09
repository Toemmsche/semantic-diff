export default interface XmlSerializable<T> {
    fromXmlString(xml: string): T;

    fromXmlDom(tagName: string, xmlDom: any): T;

    toXmlString(): string;

    toXmlDom(): object;
}