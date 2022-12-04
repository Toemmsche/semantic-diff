import ISemanticDiffOptions from './ISemanticDiffOptions';
import TNode from '../tree/TNode';
import {MatchPipeline} from '../match/MatchPipeline';
import {EditScriptGenerator} from '../delta/EditScriptGenerator';
import {EditScript} from '../delta/EditScript';
import {Comparator} from '../match/Comparator';

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