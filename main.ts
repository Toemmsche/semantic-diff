import TNode from "./src/semantic-diff/tree/TNode.js";
import TNodeXMLDomSerDes from './src/semantic-diff/io/TNodeXMLDomSerDes.js';
import EditScriptXmlDomSerDes from './src/semantic-diff/io/EditScriptXmlDomSerDes.js';
import {defaultDiffOptions} from './src/semantic-diff/diff/ISemanticDiffOptions.js';
import SemanticDiff from './src/semantic-diff/diff/SemanticDiff.js';
import * as fs from 'fs';
import GrammarXmlDomSerDes from './src/semantic-diff/io/GrammarXmlDomSerDes.js';


const cpeeGrammar = new GrammarXmlDomSerDes(defaultDiffOptions).parseFromFile("grammar.xml");
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

const fo = fs.readFileSync('test/large/old.xml').toString();
const fn = fs.readFileSync('test/large/new.xml').toString();
const oldTree = ser.parseXmlString(fo);
const newTree = ser.parseXmlString(fn);

const differ = new SemanticDiff(options);
const es = differ.diff(oldTree, newTree);


const esser = new EditScriptXmlDomSerDes(cpeeGrammar, options);

console.log(esser.buildXmlString(es));




