export interface IParameters {
    CONTENT_WEIGHT: number;
    POSITION_WEIGHT: number;
    COMMONALITY_WEIGHT: number;
    EPSILON_PENALTY: number;
    PATH_COMPARE_RANGE: number;
    WEIGHT_BOOST_MULTIPLIER: number;
}


export const defaultParameters: IParameters = {
    CONTENT_WEIGHT         : 5,
    POSITION_WEIGHT        : 1,
    COMMONALITY_WEIGHT     : 6,
    EPSILON_PENALTY        : 0.01,
    PATH_COMPARE_RANGE     : 5,
    WEIGHT_BOOST_MULTIPLIER: 1,
}