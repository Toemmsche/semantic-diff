import SerDes from '../SerDes';
import TNode, {TNodeBuilder} from '../../tree/TNode';
import {getElementChildren, getTextContentWithoutChildren} from '../../Util';
import {PlanData} from "../../../ui/model/PlanData";
import TNodeBrowserSerDes from "./TNodeBrowserSerDes";
import {TableScan} from "../../../ui/model/TableScan";
import {Nullable} from "../../Types";
import QueryPlan from "../../../ui/model/meta/QueryPlan";
import {DBMS} from "../../../ui/model/meta/DBMS";
import {Dataset} from "../../../ui/model/meta/Dataset";
import Join from "../../../ui/model/Join";
import {TempScan} from "../../../ui/model/TempScan";
import QueryPlanResult, {
    QueryPlanResultCollection
} from "../../../ui/data/QueryPlanResult";
import {Query} from "@testing-library/react";
import BenchmarkResult from "../../../ui/data/BenchmarkResult";

export default class PlanNodeBrowserSerDes extends TNodeBrowserSerDes implements SerDes<TNode<PlanData>> {


    private getInitializedBuilderFromTagName (tagName: string,
                                              text: Nullable<string>,
                                              attributes: Map<string, string>): TNodeBuilder<PlanData> {
        switch (tagName) {
            case TableScan.LABEL:
                return new TNodeBuilder<TableScan>()
                    .data(new TableScan(tagName, text, attributes));
            case Join.LABEL:
                return new TNodeBuilder<Join>()
                    .data(new Join(tagName, text, attributes));
            case TempScan.LABEL:
                return new TNodeBuilder<TempScan>()
                    .data(new TempScan(tagName, text, attributes));
            default:
                return new TNodeBuilder<PlanData>()
                    .data(new PlanData(tagName, text, attributes));
        }
    }

    public parseXmlDom (xmlElement: Element,
                        includeChildren = true): TNode<PlanData> {
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

        const builder = this.getInitializedBuilderFromTagName(tagName,
                                                              text,
                                                              attributes)
                            .children(children)

        if (grammarNode) {
            builder.grammarNode(grammarNode)
        }

        return builder.build();
    }

    public override parseFromString (xml: string,
                                     includeChildren: boolean = true): TNode<PlanData> {
        const root = new DOMParser()
            .parseFromString(xml, 'text/xml')
            .childNodes
            .item(0) as Element; // assume single root node as an element
        return this.parseXmlDom(root);
    }


    public benchmarkResultFromJsonNode (benchmarkResultRaw: any): BenchmarkResult {
        for (const prop in benchmarkResultRaw) {
            const member = benchmarkResultRaw[prop];
            if (prop !== "result" && prop !== "error" && member instanceof Array) {
                for (let i = 0; i < member.length; i++) {
                    if (member[i] instanceof String) {
                        // They are all floats
                        member[i] = parseFloat(member[i]);
                    }
                }
            }
        }
        return benchmarkResultRaw as BenchmarkResult;
    }

    public queryPlanResultCollectionFromJson (jsontext: string): QueryPlanResultCollection {
        const collection = JSON.parse(jsontext) as QueryPlanResultCollection;
        for (const result of collection) {
            const dbms = result.dbms;
            if (!(<any>Object).values(DBMS).includes(dbms)) {
                throw new Error("Unrecognized DBMS " + dbms);
            }

            const dataset = result.dataset;
            if (!(<any>Object).values(Dataset).includes(dataset)) {
                throw new Error("Unrecognized Dataset " + dataset);
            }
        }
        return collection;
    }

}