import { schemeTableau10 as d3Scheme } from 'd3-scale-chromatic';
import { powerSet } from '../Legend';

const COLORS: readonly string[] = d3Scheme.map((color) => color.substring(0, 7) + 'c0');

export function getColorForIndex(index: number): string {
  return COLORS[index];
}

export function getColorForSubset(subset: number[] | Set<number>, maxLength: number = 3): string {
  const arr = subset instanceof Set ? [...subset] : subset;
  if (arr.length === 0) {
    throw new Error('empty_subset_color');
  }
  const sortedString = arr.sort().join('');
  const index = powerSet(Array.from(Array(maxLength).keys()))
    .map((s) => s.sort().join(''))
    .indexOf(sortedString);
  // We never reach here with an empty subset
  return getColorForIndex(index - 1);
}
