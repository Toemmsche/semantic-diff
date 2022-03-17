import IEditScriptOptions from '../delta/IEditScriptOptions.js';
import ICompareOptions from '../match/ICompareOptions.js';
import ISerializationOptions from '../io/ISerializationOptions.js';
import IMatchOptions from '../match/IMatchOptions.js';

export default interface ISemanticDiffOptions extends ICompareOptions, IEditScriptOptions, ISerializationOptions, IMatchOptions {

}

export const defaultDiffOptions= {
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
};