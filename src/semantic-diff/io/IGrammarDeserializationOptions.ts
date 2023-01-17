export default interface IGrammarDeserializationOptions {
  ATTRIBUTE_GROUP_NAME: string;
  TEXT_NODE_NAME: string;
  ATTRIBUTE_NAME_PREFIX: string;

  GRAMMAR_INNERS_TAG: string;
  GRAMMAR_LEAVES_TAG: string;
  GRAMMAR_NODE_WEIGHTED_CV_TAG: string;
  GRAMMAR_NODE_WEIGHT_KEY: string;
  GRAMMAR_NODE_COMPARISON_TYPE_KEY: string;
  GRAMMAR_ROOT_TAG: string;
  GRAMMAR_NODE_ORDERED_KEY: string;
}
