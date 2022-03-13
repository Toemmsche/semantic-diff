import TNode from "./src/tree/TNode.js";
import {MatchPipeline} from "./src/match/MatchPipeline.js";
import {EditScriptGenerator} from "./src/delta/EditScriptGenerator.js";
import {JSDOM} from 'jsdom';
import TNodeFXPSerializer from './src/io/TNodeFXPSerializer.js';
import TNodeXMLDomSerializer from './src/io/TNodeXMLDomSerializer.js';
import EditScriptXMLDomSerializer from './src/io/EditScriptXmlDomSerializer.js';

const ser = new TNodeXMLDomSerializer()

const tree = new TNode("description", [
    new TNode("parallel", [
        new TNode("manipuluate", [], "total += result.value['cost']"),
        new TNode("call", [new TNode("parameters", [new TNode("method", [], "POST")])], "", new Map([["endpoint", "http://example.org"]]))
    ])
]);

const str = ser.buildXmlString(tree);
console.log(str);

const xml = "<description><parallel mode=\"first\"><call endpoint=\"http://example.org\" id=\"a2\"><parameters><method>POST</method></parameters></call><manipulate>variable += 1</manipulate></parallel></description>";
const oldroot = ser.parseXmlString(xml);

const newxml = "<description><parallel mode=\"first\"><call endpoint=\"http://example.org\"><parameters><method>POST</method></parameters></call><manipulate>variable += 2</manipulate></parallel></description>";
const newRoot = ser.parseXmlString(newxml);


const m = MatchPipeline.fromMode();
m.execute(oldroot, newRoot);

const eg = new EditScriptGenerator();

const es =  eg.generateEditScript(oldroot, newRoot);

const esser = new EditScriptXMLDomSerializer();
console.log(esser.buildXmlString(es));
console.log(esser.parseXmlString(esser.buildXmlString(es), true));

