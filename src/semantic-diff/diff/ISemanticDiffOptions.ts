import IEditScriptOptions from '../delta/IEditScriptOptions';
import ICompareOptions from '../compare/ICompareOptions';
import IMatchOptions from '../match/IMatchOptions';
import ISerDesOptions from '../io/options/ISerDesOptions';

export default interface ISemanticDiffOptions
  extends ICompareOptions,
    IEditScriptOptions,
    ISerDesOptions,
    IMatchOptions {}

// TODO move default diff options into interface diff classes
export const defaultDiffOptions: ISemanticDiffOptions = {
  COMPARISON_THRESHOLD: 0.4,
  CONTENT_WEIGHT: 5,
  POSITION_WEIGHT: 1,
  COMMONALITY_WEIGHT: 4,
  EPSILON_PENALTY: 0.01,
  PATH_COMPARE_RANGE: 5,
  WEIGHT_BOOST_MULTIPLIER: 1,
  USE_CONTENT_HASH_FOR_PATH_COMPARISON: true,
  EXACT_EDIT_SCRIPT: true,
  ATTRIBUTE_GROUP_NAME: '@',
  TEXT_NODE_NAME: 'text()',
  ATTRIBUTE_NAME_PREFIX: '',
  DELTA_TAG: 'delta',
  PRETTY_XML: true,

  JX_ATTRS_KEY: '_attrs',
  JX_CHILDREN_KEY: '_children',
  JX_TEXT_KEY: '_text',
  JX_LABEL_KEY: '_label'
};
