import ISemanticDiffOptions from './ISemanticDiffOptions';
import TNode from '../tree/TNode';
import {MatchPipeline} from '../match/MatchPipeline';
import {EditScriptGenerator} from '../delta/EditScriptGenerator';
import {EditScript} from '../delta/EditScript';
import {Comparator} from '../compare/Comparator';

export default class SemanticDiff<T> {
  constructor(private options: ISemanticDiffOptions) {

  }

  diff(oldTree: TNode<T>, newTree: TNode<T>) : EditScript<T> {
    const matchPipeline = MatchPipeline.fromMode(this.options); // TODO with options
    matchPipeline.execute(oldTree, newTree, new Comparator(this.options)); // TODO maybe move
    const editScriptGenerator = new EditScriptGenerator<T>(this.options);
    const editScript = editScriptGenerator.generateEditScript(oldTree, newTree);
    return editScript;
  }
}