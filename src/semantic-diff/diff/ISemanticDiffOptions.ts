import IEditScriptOptions from '../delta/IEditScriptOptions';
import ICompareOptions from '../compare/ICompareOptions';
import IMatchOptions from '../match/IMatchOptions';
import ISerDesOptions from '../io/ISerDesOptions';

export default interface ISemanticDiffOptions extends ICompareOptions, IEditScriptOptions, ISerDesOptions, IMatchOptions {
}

// TODO move default diff options into interface diff classes
export const defaultDiffOptions = {
  COMPARISON_THRESHOLD: 0.4,
  CONTENT_WEIGHT: 5,
  POSITION_WEIGHT: 1,
  COMMONALITY_WEIGHT: 6,
  EPSILON_PENALTY: 0.01,
  PATH_COMPARE_RANGE: 5,
  WEIGHT_BOOST_MULTIPLIER: 1,
  EXACT_EDIT_SCRIPT: true,
  ATTRIBUTE_GROUP_NAME: '@_',
  TEXT_NODE_NAME: '#text',
  ATTRIBUTE_NAME_PREFIX: '',
  DELTA_TAG: 'delta',
  PRETTY_XML: true,
  GRAMMAR_INNERS_TAG: 'inners',
  GRAMMAR_LEAVES_TAG: 'leaves',
  GRAMMAR_NODE_WEIGHT_KEY: 'weight',
  GRAMMAR_NODE_WEIGHTED_CV_TAG: 'comparisonValue',
  GRAMMAR_NODE_COMPARISON_TYPE_KEY: 'comparisonType',
  GRAMMAR_ROOT_TAG: 'grammar',
  GRAMMAR_NODE_ORDERED_KEY: 'ordered',
  JSON_ATTRIBUTE_PREFIX: "@_",
  JSON_CHILDREN_KEY: "children",
  JSON_TEXT_KEY: "_text",
  JSON_TAG_KEY: "_tag"
};