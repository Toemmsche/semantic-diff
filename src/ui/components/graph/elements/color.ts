import { schemeTableau10 as d3Scheme } from 'd3-scale-chromatic';
import { scaleLinear as d3ScaleLinear } from 'd3';

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

// Color scales for results that are better / worse
export const diffColorScale = d3ScaleLinear<string>()
  .domain([-1, 0, 1])
  .range(['#ff0000', '#808080', '#00bb00']); // green
export const similarityColorScale = d3ScaleLinear<string>()
  .domain([0, 1])
  .range(['#000000', '#F6BE00']); // black to gold
