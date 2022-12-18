import GrammarNode from "../grammar/GrammarNode";
import IData from "./IData";
import {Nullable} from "../Types";
import ICopyable from "./ICopyable";

export default class XmlData implements IData, ICopyable<XmlData> {

    constructor(public _label: string,
                public _text: Nullable<string>,
                public _attributes: Map<string, string> = new Map()) {
    }

    equals(other: any): boolean {
        if (other == null) return false;
        if (other === this) return true;

        // instanceof check?
        if (!(other instanceof XmlData)) return false;

        const allAttributeKeys = new Set([
            ...other.attributes.keys(),
            ...this.attributes.keys(),
        ]);
        if (this.label != other.label) return false;
        if (this.text != other.text) return false;
        for (const key of allAttributeKeys) {
            if (this.attributes.get(key) != other.attributes.get(key)) return false;
        }
        // all properties equal
        return true;
    }

    get attributes(): Map<string, string> {
        return this._attributes;
    }

    get label(): string {
        return this._label;
    }

    get text(): Nullable<string> {
        return this._text;
    }

    set text(text: Nullable<string>) {
        this._text = text;
    }

    copy(): XmlData {
        const attributesCopy = new Map();
        for (const [key, val] of this._attributes) {
            attributesCopy.set(key, val);
        }
        return new XmlData(this._label, this._text, attributesCopy);
    }

}