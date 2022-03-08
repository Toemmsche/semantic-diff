export interface IParameters {
    CONTENT_WEIGHT: Number;
    POSITION_WEIGHT: Number;
    COMMONALITY_WEIGHT: Number;
    EPSILON_PENALTY: Number;
    PATH_COMPARE_RANGE: Number;
    WEIGHT_BOOST_MULTIPLIER: Number;
}


export const defaultParameters: IParameters = {
    CONTENT_WEIGHT         : 5,
    POSITION_WEIGHT        : 1,
    COMMONALITY_WEIGHT     : 6,
    EPSILON_PENALTY        : 0.01,
    PATH_COMPARE_RANGE     : 5,
    WEIGHT_BOOST_MULTIPLIER: 1,
}