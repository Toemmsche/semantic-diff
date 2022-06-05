import fs from 'fs';

export default abstract class XmlSerDes<T> {
  abstract parseXmlString(xml: string, includeChildren: boolean): T;

  abstract buildXmlString(obj: T): string;

  parseFromFile(path: string): T {
    return this.parseXmlString(fs.readFileSync(path).toString(), true);
  }
}