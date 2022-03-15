import Grammar from '../grammar/Grammar';

export default interface ISerializationOptions {
  ATTRIBUTE_GROUP_NAME: string;
  TEXT_NODE_NAME: string;
  ATTRIBUTE_NAME_PREFIX: string;
  GRAMMAR: Grammar;
  DELTA_TAG: string;
}