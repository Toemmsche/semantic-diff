import GrammarNode from "../src/grammar/GrammarNode.js";
import NodeType from "../src/grammar/NodeType.js";
import Grammar from "../src/grammar/Grammar.js";
import Fxp from "fast-xml-parser";

// cpee grammar for now
const cpeeGrammar = new Grammar(
    [ // inners
        new GrammarNode(NodeType.INNER, "description", []),
        new GrammarNode(NodeType.INNER, "parallel", [
            {
                path  : "@mode",
                weight: 1
            }
        ]),
        new GrammarNode(NodeType.INNER, "loop", [
            {
                path  : "@mode",
                weight: 1
            }
        ]),
    ],
    [ // leaves
        new GrammarNode(NodeType.LEAF, "call", [
            {
                path  : "@endpoint",
                weight: 3
            },
            {
                path  : "parameters/method",
                weight: 2
            },
            {
                path  : "code/finalize",
                weight: 1
            }
        ]),
        new GrammarNode(NodeType.LEAF, "manipulate", [
            {
                path  : "",
                weight: 1
            }
        ]),
        new GrammarNode(NodeType.LEAF, "stop", [])
    ]
);

export const GRAMMAR : Grammar = cpeeGrammar;

export const ATTRIBUTE_GROUP_NAME = "@_";
export const TEXT_NODE_NAME = "#text";
const xmlParseOptions = {
    ignoreAttributes    : false,
    attributesGroupName : ATTRIBUTE_GROUP_NAME,
    alwaysCreateTextNode: true,
    removeNSPrefix      : true,
    trimValues          : true,

};
export const XML_PARSER  : Fxp.XMLParser = new Fxp.XMLParser(xmlParseOptions);