import fs from 'fs';

export default abstract class XmlSerDes<T> {
    public abstract parseXmlString(xml: string, includeChildren: boolean): T;

    public abstract buildXmlString(obj: T): string;

    public parseFromFile(path: string): T {
        return this.parseXmlString(fs.readFileSync(path).toString(), true);
    }
}