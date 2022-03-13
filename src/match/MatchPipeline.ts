import IMatcher from './IMatcher.js';
import {FixedMatcher} from './FixedMatcher.js';
import {HashMatcher} from './HashMatcher.js';
import TNode from '../tree/TNode.js';
import {Comparator} from './Comparator.js';
import MalformedMatchingError from '../error/MalformedMatchingError.js';
import {SimilarityMatcher} from './SimilarityMatcher.js';
import {PathMatcher} from './PathMatcher.js';
import {SandwichMatcher} from './SandwichMatcher.js';
import {PropertyMatcher} from './PropertyMatcher.js';

export class MatchPipeline {

  constructor(private matchers: IMatcher[]) {
    const len = matchers.length;
    // FixedMatcher is always the first matching algorithm in the pipeline
    if (len === 0 || matchers[0].constructor !== FixedMatcher) {
      matchers.unshift(new FixedMatcher());
    }
    //TODO
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
  static fromMode() {
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
      new SimilarityMatcher(),
      new PathMatcher(),
      new SandwichMatcher(),
      new PropertyMatcher()
    ]);
  }

  /**
   * Construct a matching between the passed process trees by executing the
   * matching pipeline in order.
   */
  execute(oldTree: TNode, newTree: TNode): void {
    const comparator = new Comparator();
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
