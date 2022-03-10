import TNode from "./src/tree/TNode.js";
import {MatchPipeline} from "./src/match/MatchPipeline.js";
import {EditScriptGenerator} from "./src/delta/EditScriptGenerator.js";
const tree = new TNode("description", [
    new TNode("parallel", [
        new TNode("manipuluate", [], "total += result.value['cost']"),
        new TNode("call", [new TNode("parameters", [new TNode("method", [], "POST")])], "", new Map([["endpoint", "http://example.org"]]))
    ])
]);
const xml = "<description><parallel mode=\"first\"><call endpoint=\"http://example.org\" id=\"a2\"><parameters><method>POST</method></parameters></call><manipulate>variable += 1</manipulate></parallel></description>";
const oldroot = tree.fromXmlString(xml);
console.log(JSON.stringify(oldroot.toXmlDom()));
console.log(oldroot.toXmlString());

const newxml = "<description><parallel mode=\"first\"><call endpoint=\"http://example.org\" id=\"a2\"><parameters><method>POST</method></parameters></call><manipulate>variable += 2</manipulate></parallel></description>";
const newRoot = tree.fromXmlString(newxml);

const mp = MatchPipeline.fromMode();
mp.execute(oldroot, newRoot);

const map = oldroot.getMatchingMap();

const eg = new EditScriptGenerator();
const es = eg.generateEditScript(oldroot, newRoot);

const esp = Object.getPrototypeOf(es);
const esc = es.constructor;
console.log("passing main...");