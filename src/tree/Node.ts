import GrammarNode from "../grammar/GrammarNode.js";
import XmlSerializable from "../io/XmlSerializable.js";
import {ATTRIBUTE_GROUP_NAME, GRAMMAR, TEXT_NODE_NAME, XML_PARSER} from "../Global.js";
import {arraySum} from "../Util.js";

export default class Node implements XmlSerializable<Node> {

    constructor(public label: string,
                public children: Node[] = [],
                public text ?: string,
                public attributes: Map<String, string> = new Map(),
                private grammarNode ?: GrammarNode, // property node if undefined
                private parent ?: Node,
                private index ?: number,
    ) {
        this.adjustChildIndices();
    }

    fromXmlDom(tagName: string, xmlDom: any): Node {
        // parse text
        let text = null
        if (TEXT_NODE_NAME in xmlDom) {
            text = xmlDom[TEXT_NODE_NAME]
        }
        delete xmlDom[TEXT_NODE_NAME]

        // parse attributes
        const attributes = new Map<String, string>();
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

        // get associated grammar Node
        const grammarNode = GRAMMAR.getGrammarNodeByLabel(tagName);
        console.log(`Detected ${tagName} as ${grammarNode?.type}`)

        return new Node(tagName, children, text, attributes, grammarNode);
    }

    fromXmlString(xml: string): Node {
        const xmlDom = XML_PARSER.parse(xml)
        // get first object
        // TODO ignore processing instructions and comments
        const tagName = Object.keys(xmlDom)[0]
        return this.fromXmlDom(tagName, xmlDom[tagName]);
    }

    toXmlDom(): object {
        throw new Error("Unimplemented")
    }

    toXmlString(): string {
        throw new Error("Unimplemented")
    }

    toJson(): string {
        // Avoid circular JSON
        function replacer(key: string, value: any) {
            if (key === "parent") {
                return undefined;
            }
            return value;
        }

        return JSON.stringify(this, replacer)
    }


    copy(includeChildren: Boolean = true): Node {
        let childCopies: Node[] = [];
        if (includeChildren) {
            childCopies = this.children.map(child => child.copy(includeChildren));
        }
        const attributesCopy = new Map(this.attributes.entries())
        return new Node(this.label, childCopies, this.text, attributesCopy, this.grammarNode); // leave parent and index undefined
    }

    xPath(): string {
        // discard root node
        return this.path()
                   .slice(1)
                   .map((node) => node.index)
                   .join("/");
    }

    path(limit ?: number) {
        const pathArr = [];
        let node: Node | nu = this;
        while (node != null && (limit == null || pathArr.length < limit)) {
            pathArr.push(node);
            node = node.parent;
        }
        // this node is always last in path
        return pathArr.reverse();
    }

    size(): number {
        return 1 + this.children.map(child => child.size()).reduce(arraySum);
    }

    toPreOrderArray(arr: Node[] = []): Node[] {
        arr.push(this);
        for (const child of this.children) {
            child.toPreOrderArray(arr);
        }
        return arr;
    }

    toPostOrderArray(arr: Node[] = []): Node[] {
        for (const child of this.children) {
            child.toPostOrderArray(arr);
        }
        arr.push(this);
        return arr;
    }

    removeFromParent(): void {
        if (this.index) {
            this.parent?.children?.splice(this.index, 1)
        }
    }

    childAt(index: number): Node {
        return this.children[index];
    }

    getIndex(): number {
        return this.index!!;
    }

    setIndex(index: number): void {
        throw new Error("unimplemented");
    }

    getParent(): Node {
        return this.parent!!;
    }

    insertChild(newIndex: number, newChild: Node): void {
        this.children.splice(newIndex, 0, newChild);
        this.adjustChildIndices();
    }

    private adjustChildIndices(): void {
        // Set children's parent and index
        for (const [i, child] of this.children.entries()) {
            child.parent = this;
            child.index = i;
        }
    }

    getSiblings(): Node[] {
        if (!this.parent) {
            return [];
        }
        return this.parent.children;
    }

    isRoot(): boolean {
        return !this.parent;
    }

    contentEquals(other: Node): boolean {
        let attributesEqual = true;
        const allKeys = new Set([...this.attributes.keys(), ...other.attributes.keys()])
        for (const key of allKeys) {
            if (this.attributes.get(key) != other.attributes.get(key)) {
                attributesEqual = false;
                break;
            }
        }
        // Do not perform nested equality check on children
        return this.label === other.label && this.text == other.text && attributesEqual
    }

    degree() {
        return this.children.length;
    }


    changeIndex(newIndex: number) {
        // delete
        this.parent!!.children.splice(this.index!!, 1);
        // insert
        this.parent!!.children.splice(newIndex, 0, this);
        // adjust indices of all children
        this.parent!!.adjustChildIndices();
    }


    hasInternalOrdering() {
        // TODO
        return undefined;
    }

    /* =============== MATCHING STUFF ================== */

    private matchPartner ?: Node;

    matchTo(other: Node): boolean {
        if (this.matchPartner || other.matchPartner) {
            return false;
        }
        // Bijective matching
        this.matchPartner = other;
        other.matchPartner = this;
        return true;
    }

    getMatch(): Node {
        return this.matchPartner!!;
    }

    isMatchedTo(other: Node): boolean {
        return this.matchPartner === other;
    }

    isMatched(): boolean {
        return !!this.matchPartner;
    }

}