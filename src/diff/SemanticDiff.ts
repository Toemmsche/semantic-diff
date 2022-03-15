import ISemanticDiffOptions from './ISemanticDiffOptions.js';
import TNode from '../tree/TNode.js';
import {MatchPipeline} from '../match/MatchPipeline.js';
import {EditScriptGenerator} from '../delta/EditScriptGenerator.js';
import {EditScript} from '../delta/EditScript.js';
import {Comparator} from '../match/Comparator.js';

export default class SemanticDiff {
  constructor(private options: ISemanticDiffOptions) {

  }

  diff(oldTree: TNode, newTree: TNode) : EditScript {
    const matchPipeline = MatchPipeline.fromMode(this.options); // TODO with options
    matchPipeline.execute(oldTree, newTree, new Comparator(this.options)); // TODO maybe move
    const editScriptGenerator = new EditScriptGenerator(this.options);
    const editScript = editScriptGenerator.generateEditScript(oldTree, newTree);
    return editScript;
  }
}