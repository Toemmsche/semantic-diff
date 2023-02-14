export enum LayoutDirection {
  HORIZONTAL = 'HORIZONTAL',
  VERTICAL = 'VERTICAL'
}

export interface TreeLayoutOptions {
  nodeSep: number;
  rankSep: number;
  direction: LayoutDirection;
}

export const defaultTreeLayoutOptions = {
  rankSep: 100,
  nodeSep: 80,
  direction: LayoutDirection.VERTICAL
};
