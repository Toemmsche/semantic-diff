import ComparisonType from './ComparisonType.js';

export default class WeightedCV {
  constructor(public path: string, public weight: number, public comparisonType: ComparisonType = ComparisonType.ALL_OR_NOTHING) {
  }
}