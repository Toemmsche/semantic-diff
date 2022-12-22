import SerDes from '../SerDes';
import TNode, {TNodeBuilder} from '../../tree/TNode';
import vkbeautify from 'vkbeautify';
import {getElementChildren, getTextContentWithoutChildren} from '../../Util';
import ISerDesOptions from '../ISerDesOptions';
import Grammar from '../../grammar/Grammar';
import XmlData from "../../data/XmlData";
import {PlanData} from "../../../ui/model/PlanData";
import TNodeBrowserSerDes from "./TNodeBrowserSerDes";
import {TableScan} from "../../../ui/model/TableScan";
import {Nullable} from "../../Types";

export default class PlanNodeBrowserSerDes extends TNodeBrowserSerDes implements SerDes<TNode<PlanData>> {


    private getInitializedBuilderFromTagName(tagName: string, text: Nullable<string>, attributes: Map<string, string>): TNodeBuilder<PlanData> {
        switch (tagName) {
            case TableScan.LABEL:
                return new TNodeBuilder<TableScan>()
                    .data(new TableScan(tagName, text, attributes));
            default:
                return new TNodeBuilder<PlanData>()
                    .data(new PlanData(tagName, text, attributes));
        }
    }

    public parseXmlDom(xmlElement: Element, includeChildren = true): TNode<PlanData> {
        const tagName = xmlElement.localName;

        // parse attributes
        const attributes = new Map();
        for (let i = 0; i < xmlElement.attributes.length; i++) {
            const attrNode = xmlElement.attributes.item(i)!!;
            attributes.set(attrNode.name, attrNode.value);
        }

        // children
        const children = [];
        for (const childElement of getElementChildren(xmlElement)) {
            children.push(this.parseXmlDom(childElement, includeChildren));
        }

        //text
        const text = getTextContentWithoutChildren(xmlElement);

        // get associated grammar Node
        const grammarNode = this.grammar.getGrammarNodeByLabel(tagName);

        const builder = this.getInitializedBuilderFromTagName(tagName, text, attributes)
            .children(children)

        if (grammarNode) {
            builder.grammarNode(grammarNode)
        }

        return builder.build();
    }

    public override parseFromString(xml: string, includeChildren: boolean = true): TNode<PlanData> {
        const root = new DOMParser()
            .parseFromString(xml, 'text/xml')
            .childNodes
            .item(0) as Element; // assume single root node as an element
        return this.parseXmlDom(root);
    }

}