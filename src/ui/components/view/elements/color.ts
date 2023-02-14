import { schemeTableau10 as d3Scheme } from 'd3-scale-chromatic';

const COLORS: readonly string[] = d3Scheme.map((color) => color.substring(0, 7) + 'c0');

export function getColorForIndex(index: number): string {
  return COLORS[index];
}

export function getTextColorForIndex(index: number) {
  const color = getColorForIndex(index);
  return color.substring(0, 7);
}

export function getGradientForIndexGroup(indices: number[]): string {
  const groupSize = indices.length;
  return (
    'linear-gradient(to right, ' +
    indices
      .map((i, j) => {
        const color = getColorForIndex(i);
        // apply minimal smnoothing
        const start = Math.floor((j * 100) / groupSize) + 1;
        const end = Math.floor(((j + 1) * 100) / groupSize) - 1;
        return `${color} ${start}%, ${color} ${end}%`;
      })
      .join(', ') +
    ')'
  );
}
