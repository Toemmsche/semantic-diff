import GrammarNode from "../src/grammar/GrammarNode.js";
import NodeType from "../src/grammar/NodeType.js";
import Grammar from "../src/grammar/Grammar.js";
import Fxp, {X2jOptionsOptional, XmlBuilderOptionsOptional} from "fast-xml-parser";
import {defaultDiffOptions, IDiffOptions} from "./IDiffOptions.js";

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

export const DiffConfig: IDiffOptions = defaultDiffOptions;

export const GRAMMAR: Grammar = cpeeGrammar;

export const ATTRIBUTE_GROUP_NAME = "@_";
export const TEXT_NODE_NAME = "#text";
export const ATTRIBUTE_NAME_PREFIX = ""
const xmlParseOptions: X2jOptionsOptional = {
    ignoreAttributes    : false,
    attributesGroupName : ATTRIBUTE_GROUP_NAME,
    alwaysCreateTextNode: true,
    removeNSPrefix      : true,
    trimValues          : true,
    attributeNamePrefix : ATTRIBUTE_NAME_PREFIX

};
export const XML_PARSER: Fxp.XMLParser = new Fxp.XMLParser(xmlParseOptions);

const xmlBuildOptions: XmlBuilderOptionsOptional = {
    attributesGroupName: ATTRIBUTE_GROUP_NAME,
    format             : false,
    textNodeName       : TEXT_NODE_NAME,
    attributeNamePrefix: ATTRIBUTE_NAME_PREFIX
}
export const XML_BUILDER: Fxp.XMLBuilder = new Fxp.XMLBuilder(xmlBuildOptions);

export const ChangeModel = {
    INSERTION  : {
        label : "insert",
        uri   : "http://cpee.org/ns/description/1.0/insert",
        prefix: "ins",
    },
    DELETION   : {
        label : "delete",
        uri   : "http://cpee.org/ns/description/1.0/delete",
        prefix: "del",
    },
    MOVE       : {
        label : "move",
        uri   : "http://cpee.org/ns/description/1.0/move",
        prefix: "mov",
    },
    MOVE_FROM  : {
        label : "move_from",
        uri   : "http://cpee.org/ns/description/1.0/move-from",
        prefix: "movfr",
    },
    UPDATE     : {
        label : "update",
        uri   : "http://cpee.org/ns/description/1.0/update",
        prefix: "upd",
    },
    UPDATE_FROM: {
        label : "udpate_from",
        uri   : "http://cpee.org/ns/description/1.0/update-from",
        prefix: "updfr",
    },
    NIL        : {
        label : "nil",
        uri   : "http://cpee.org/ns/description/1.0/nil",
        prefix: "nil",
    },
};