import TNode from "./src/tree/TNode.js";
import {MatchPipeline} from "./src/match/MatchPipeline.js";
import {EditScriptGenerator} from "./src/delta/EditScriptGenerator.js";
import {JSDOM} from 'jsdom';
import TNodeFXPSerializer from './src/io/TNodeFXPSerializer.js';
import TNodeXMLDomSerializer from './src/io/TNodeXMLDomSerializer.js';
import EditScriptXMLDomSerializer from './src/io/EditScriptXmlDomSerializer.js';
import {defaultDiffOptions} from './src/diff/ISemanticDiffOptions.js';
import {cpeeGrammar} from './src/Global.js';
import SemanticDiff from './src/diff/SemanticDiff.js';


const options = {...defaultDiffOptions, GRAMMAR: cpeeGrammar}
const ser = new TNodeXMLDomSerializer(options)

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

const differ = new SemanticDiff(options);
const es = differ.diff(oldroot, newRoot);


const esser = new EditScriptXMLDomSerializer(options);

console.log(esser.buildXmlString(es));




