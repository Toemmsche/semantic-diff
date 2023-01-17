import ComparisonType from './ComparisonType';

export default class WeightedCV {
  constructor(
    public path: string,
    public weight: number = 1,
    public comparisonType: ComparisonType = ComparisonType.ALL_OR_NOTHING
  ) {}
}
