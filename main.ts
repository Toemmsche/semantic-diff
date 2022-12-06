import TNode from "./src/semantic-diff/tree/TNode.js";
import TNodeXMLDomSerDes from './src/semantic-diff/io/node/TNodeXMLDomSerDes.js';
import EditScriptXmlDomSerDes from './src/semantic-diff/io/node/EditScriptXmlDomSerDes.js';
import {defaultDiffOptions} from './src/semantic-diff/diff/ISemanticDiffOptions.js';
import SemanticDiff from './src/semantic-diff/diff/SemanticDiff.js';
import * as fs from 'fs';
import GrammarXmlDomSerDes from './src/semantic-diff/io/node/GrammarXmlDomSerDes.js';


const cpeeGrammar = new GrammarXmlDomSerDes(defaultDiffOptions).parseFromString(fs.readFileSync("grammar.xml").toString());
const options = {...defaultDiffOptions, GRAMMAR: cpeeGrammar}
const ser = new TNodeXMLDomSerDes(cpeeGrammar, options)

const gser = new GrammarXmlDomSerDes(options);
const gf = fs.readFileSync('grammar.xml');
const grammar = gser.parseFromString(gf.toString(), true);

const tree = new TNode("description", [
    new TNode("parallel", [
        new TNode("manipuluate", [], "total += result.value['cost']"),
        new TNode("call", [new TNode("parameters", [new TNode("method", [], "POST")])], "", new Map([["endpoint", "http://example.org"]]))
    ])
]);

const str = ser.buildString(tree);
console.log(str);

const fo = fs.readFileSync('test/large/old.xml').toString();
const fn = fs.readFileSync('test/large/new.xml').toString();
const oldTree = ser.parseFromString(fo);
const newTree = ser.parseFromString(fn);

const differ = new SemanticDiff(options);
const es = differ.diff(oldTree, newTree);


const esser = new EditScriptXmlDomSerDes(cpeeGrammar, options);

console.log(esser.buildString(es));




