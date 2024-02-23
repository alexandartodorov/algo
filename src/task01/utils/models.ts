export interface Config {
  symbol: number;
  width: number;
  height: number;
}

export type Flag = FlaggedField | null;

interface FlaggedField {
  value: number;
  marked: boolean;
}
