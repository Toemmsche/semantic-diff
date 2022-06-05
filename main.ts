import TNode from "./src/tree/TNode.js";
import TNodeXMLDomSerDes from './src/io/TNodeXMLDomSerDes.js';
import EditScriptXmlDomSerDes from './src/io/EditScriptXmlDomSerDes.js';
import {defaultDiffOptions} from './src/diff/ISemanticDiffOptions.js';
import {cpeeGrammar} from './src/Global.js';
import SemanticDiff from './src/diff/SemanticDiff.js';
import * as fs from 'fs';
import GrammarXmlDomSerDes from './src/io/GrammarXmlDomSerDes.js';


const options = {...defaultDiffOptions, GRAMMAR: cpeeGrammar}
const ser = new TNodeXMLDomSerDes(cpeeGrammar, options)

const gser = new GrammarXmlDomSerDes(options);
const gf = fs.readFileSync('grammar.xml');
const grammar = gser.parseXmlString(gf.toString(), true);

const tree = new TNode("description", [
    new TNode("parallel", [
        new TNode("manipuluate", [], "total += result.value['cost']"),
        new TNode("call", [new TNode("parameters", [new TNode("method", [], "POST")])], "", new Map([["endpoint", "http://example.org"]]))
    ])
]);

const str = ser.buildXmlString(tree);
console.log(str);

const fo = fs.readFileSync('test/old.xml').toString();
const fn = fs.readFileSync('test/new.xml').toString();
const oldTree = ser.parseXmlString(fo);
const newTree = ser.parseXmlString(fn);

const differ = new SemanticDiff(options);
const es = differ.diff(oldTree, newTree);


const esser = new EditScriptXmlDomSerDes(cpeeGrammar, options);

console.log(esser.buildXmlString(es));




