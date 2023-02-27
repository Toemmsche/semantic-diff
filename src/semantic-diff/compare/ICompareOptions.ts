export default interface ICompareOptions {
  BASE_WEIGHT: number;
  CONTENT_WEIGHT: number;
  POSITION_WEIGHT: number;
  COMMONALITY_WEIGHT: number;
  EPSILON_PENALTY: number;
  PATH_COMPARE_RANGE: number;
  WEIGHT_BOOST_MULTIPLIER: number;

  USE_CONTENT_HASH_FOR_PATH_COMPARISON: boolean;
}
