import IMatcher from './IMatcher';
import {FixedMatcher} from './FixedMatcher';
import {HashMatcher} from './HashMatcher';
import TNode from '../tree/TNode';
import {Comparator} from './Comparator';
import MalformedMatchingError from '../error/MalformedMatchingError';
import {SimilarityMatcher} from './SimilarityMatcher';
import {PathMatcher} from './PathMatcher';
import {SandwichMatcher} from './SandwichMatcher';
import {PropertyMatcher} from './PropertyMatcher';
import IComparator from './IComparator';
import IMatchOptions from './IMatchOptions';

export class MatchPipeline {

  constructor(private matchers: IMatcher[]) {
    const len = matchers.length;
    // FixedMatcher is always the first matching algorithm in the pipeline
    if (len === 0 || matchers[0].constructor !== FixedMatcher) {
      matchers.unshift(new FixedMatcher());
    }
    //TODO optoins
    /*
     // PropertyMatcher is always the last matching algorithm in the pipeline
     if (len === 0 || matchers[len - 1].constructor !== PropertyMatcher) {
     matchers.push(new PropertyMatcher());
     }
     */
  }

  /**
   * Construct a matching pipeline based on the selected matching mode.
   * @return {MatchPipeline}
   */
  static fromMode(options: IMatchOptions) {
    /*
     return new MatchPipeline(
     [
     new FixedMatcher(),
     new HashMatcher(),
     new SimilarityMatcher(
     DiffConfig.MATCH_MODE === MatchPipeline.MATCH_MODES.FAST),
     new PathMatcher(
     DiffConfig.MATCH_MODE === MatchPipeline.MATCH_MODES.QUALITY),
     new PathMatcher(false),
     new SandwichMatcher(),
     new PropertyMatcher(),
     ]);

     */
    return new MatchPipeline([
      new FixedMatcher(),
      new HashMatcher(),
      new SimilarityMatcher(options),
      new PathMatcher({...options, WITH_COMMONALITY: true}),
      new SandwichMatcher(),
      new PropertyMatcher()
    ]);
  }

  /**
   * Construct a matching between the passed process trees by executing the
   * matching pipeline in order.
   */
  execute(oldTree: TNode, newTree: TNode, comparator: IComparator): void {
    for (const matcher of this.matchers) {
      matcher.match(oldTree, newTree, comparator);
      if (!this.verifyMatching(oldTree, newTree)) {
        throw new MalformedMatchingError(`${matcher.constructor.name} produced invalid matching`);
      }
    }
    // TODO matching type
  }

  private verifyMatching(oldTree: TNode, newTree: TNode): boolean {
    const oldNodeSet = new Set(oldTree.toPreOrderArray());
    const newNodeSet = new Set(newTree.toPreOrderArray());

    for (const oldNode of oldNodeSet) {
      if (!oldNode.verifyMatching()) return false;
      if (oldNode.isMatched()) {
        if (!newNodeSet.has(oldNode.getMatch())) return false;
      }
    }
    for (const newNode of newNodeSet) {
      if (!newNode.verifyMatching()) return false;
      if (newNode.isMatched()) {
        if (!oldNodeSet.has(newNode.getMatch())) return false;
      }
    }
    return true;
  }
}
