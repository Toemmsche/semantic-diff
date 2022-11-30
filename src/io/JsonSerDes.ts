import fs from 'fs';

export default abstract class JsonSerDes<T> {
    public abstract parseJsonString(Json: string, includeChildren: boolean): T;

    public abstract buildJsonString(obj: T): string;

    public parseFromFile(path: string): T {
        return this.parseJsonString(fs.readFileSync(path).toString(), true);
    }
}