export default interface ICompareOptions {
  CONTENT_WEIGHT: number;
  POSITION_WEIGHT: number;
  COMMONALITY_WEIGHT: number;
  EPSILON_PENALTY: number;
  PATH_COMPARE_RANGE: number;
  WEIGHT_BOOST_MULTIPLIER: number;
}
