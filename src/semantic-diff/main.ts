import yargs from 'yargs';
import {hideBin} from 'yargs/helpers';
import * as fs from 'fs';
import {defaultDiffOptions} from './diff/ISemanticDiffOptions';
import GrammarXmlDomSerDes from './io/node/GrammarXmlDomSerDes';
import IGrammarDeserializationOptions
    from './io/IGrammarDeserializationOptions';
import TNodeXMLDomSerDes from './io/node/TNodeXMLDomSerDes';
import ISerDesOptions from './io/ISerDesOptions';
import SemanticDiff from './diff/SemanticDiff';
import {EditScript} from './delta/EditScript';
import EditScriptXmlDomSerDes from './io/node/EditScriptXmlDomSerDes';
import TNodeJsonSerDes from "./io/TNodeJsonSerDes";
import Grammar from "./grammar/Grammar";
import XmlData from "./data/XmlData";

const argv = yargs(hideBin(process.argv))
    .command(
        'transform <json>',
        'Transform a JSON document to XML',
        (yargs) => yargs, // no builder
        (argv) => {
            const dummyGrammar = new Grammar([], [])
            const jsonSerDes = new TNodeJsonSerDes(dummyGrammar, defaultDiffOptions);
            const root = jsonSerDes.parseFromString(fs.readFileSync(argv.json as string).toString());
            const SerDes = new TNodeXMLDomSerDes(dummyGrammar, defaultDiffOptions);
            console.log(SerDes.buildString(root));
        }
    )
    .command(
        'diff <grammar> <old> <new>',
        'Calculate and show the difference between two XML documents',
        (yargs) => {
            yargs
                .positional('grammar', {
                    description: 'Path to the grammar document',
                    type: 'string',
                })
                .positional('old', {
                    description: 'Path to the original document',
                    type: 'string',
                })
                .positional('new', {
                    description: 'Path to the changed document',
                    type: 'string',
                })
                .option('json', {
                    description: 'Use JSON instead of XML',
                    alias: 'j',
                    type: 'boolean',
                    default: false,
                })
                .option('threshold', {
                    description: 'Define the threshold for matching nodes',
                    alias: 't',
                    type: 'number',
                    default: 0.4,
                })
                .option('format', {
                    description: 'Select the output format',
                    alias: 'f',
                    type: 'string',
                    choices: [
                        'editScript',
                    ],
                    default: 'editScript',
                })
                .option('pretty', {
                    description: 'Pretty-print the output XML document',
                    alias: 'p',
                    type: 'boolean',
                    default: false,
                })
                .check((argv) => {
                    if (argv.grammar == null || !fs.existsSync(argv.grammar)) {
                        throw new Error(argv.grammar + ' ist not a valid file path');
                    }
                    if (argv.old == null || !fs.existsSync(argv.old)) {
                        throw new Error(argv.old + ' ist not a valid file path');
                    }
                    if (argv.new == null || !fs.existsSync(argv.new)) {
                        throw new Error(argv.new + ' ist not a valid file path');
                    }
                    if (argv.threshold < 0 || argv.threshold > 1) {
                        throw new Error('threshold must be in [0,1]');
                    }
                    return true;
                });
        },
        (argv) => {
            const grammarDesOptions: IGrammarDeserializationOptions = {
                ...defaultDiffOptions,
            };
            const tNodeDesOptions: ISerDesOptions = {
                ...defaultDiffOptions
            };
            const diffOptions = {
                ...grammarDesOptions,
                ...tNodeDesOptions,
                ...defaultDiffOptions,
            }

            const grammarSerDes = new GrammarXmlDomSerDes(diffOptions);
            const grammar = grammarSerDes.parseFromString(fs.readFileSync(argv.grammar as string).toString());

            let tNodeSerDes;
            if (argv.json) {
                tNodeSerDes = new TNodeJsonSerDes(grammar, diffOptions);
            } else {
                tNodeSerDes = new TNodeXMLDomSerDes(grammar, diffOptions);
            }
            const oldTree = tNodeSerDes.parseFromString(fs.readFileSync(argv.old as string).toString());
            const newTree = tNodeSerDes.parseFromString(fs.readFileSync(argv.new as string).toString());

            const editScript: EditScript<XmlData> = new SemanticDiff<XmlData>(diffOptions).diff(oldTree, newTree);

            const editScriptSerDes = new EditScriptXmlDomSerDes(grammar, diffOptions);
            switch (argv.format) {
                case 'editScript': {
                    console.log(editScriptSerDes.buildString(editScript))
                    break;
                }
            }
        },
    )
    .help()
    .version()
    .demandCommand()
    .strictCommands()
    .argv;