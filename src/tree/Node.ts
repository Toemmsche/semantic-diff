import GrammarNode from "../grammar/GrammarNode.js";
import XmlSerializable from "../io/XmlSerializable.js";
import {ATTRIBUTE_GROUP_NAME, TEXT_NODE_NAME, XML_PARSER} from "../Global.js";

export default class Node implements XmlSerializable<Node> {

    constructor(public label: String,
                public children: Node[] = [],
                public text ?: String,
                public attributes: Map<String, String> = new Map(),
                private parent ?: Node,
                private index ?: Number,
                private grammarNode ?: GrammarNode // property node if undefined
    ) {
        // Set children's parent and index
        for (const [i, child] of children.entries()) {
            child.parent = this;
            child.index = i;
        }
    }

    fromXmlDom(tagName: String, xmlDom: any): Node {
        // parse text
        let text = null
        if (TEXT_NODE_NAME in xmlDom) {
            text = xmlDom[TEXT_NODE_NAME]
        }
        delete xmlDom[TEXT_NODE_NAME]

        // parse attributes
        const attributes = new Map<String, String>();
        if (ATTRIBUTE_GROUP_NAME in xmlDom) {
            const attributeGroup = xmlDom[ATTRIBUTE_GROUP_NAME]
            for (const key in attributeGroup) {
                attributes.set(key, attributeGroup[key])
            }
        }
        delete xmlDom[ATTRIBUTE_GROUP_NAME]

        // parse children
        const children = []
        for (const childTagName in xmlDom) {
            const child = this.fromXmlDom(childTagName, xmlDom[childTagName])
            children.push(child)
        }

        // TODO set grammar node
        return new Node(tagName, children, text, attributes)
    }

    fromXmlString(xml: String): Node {
        const xmlDom = XML_PARSER.parse(xml)
        // get first object
        // TODO ignore processing instructions and comments
        const tagName = Object.keys(xmlDom)[0]
        return this.fromXmlDom(tagName, xmlDom[tagName]);
    }

    toXmlDom(): object {
        throw new Error("Unimplemented")
    }

    toXmlString(): String {
        throw new Error("Unimplemented")
    }

    toJson() : String {
        // Avoid circular JSON
        function replacer(key: String, value: any) {
            if (key === "parent") {
                return undefined;
            }
            return value;
        }
        return JSON.stringify(this, replacer)
    }
}