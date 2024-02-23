import { Config, Flag } from './models';

export function solver(matrixInput: number[][], configs: Config[], overlap = false): string {
  const matrix = matrixInput.map((row) => row.map((el) => ({ value: el, marked: false })));
  const elementToConfigMap = configs.reduce((acc, el) => new Map([...acc, [el.symbol, el]]), new Map<number, Config>());
  const res: string[] = [];

  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[0].length; col++) {
      const currentElement = matrix[row][col].value;

      if (!elementToConfigMap.has(currentElement)) continue;

      const currentConfig = elementToConfigMap.get(currentElement) as Config;
      const flagged: Flag = overlap ? null : { value: currentElement, marked: false };

      if (shapeFinder(row, col, currentConfig, flagged)) {
        flagged && (flagged.marked = true);
        res.push(
          `Found figure: symbol = ${currentElement}, position = (${col}, ${row}), size = (${currentConfig.width}, ${currentConfig.height})`
        );
      }
    }
  }

  return res.join('\n');

  function shapeFinder(row: number, col: number, config: Config, flagged: Flag = null): boolean {
    let recursiveResult: boolean;

    const notAbleToFindShape =
      !matrix[row] ||
      matrix[row][col] === undefined ||
      matrix[row][col].marked ||
      matrix[row][col].value !== config.symbol;

    if (notAbleToFindShape) return false;

    if (config.height === 1) {
      if (config.width === 1) {
        flagged && (matrix[row][col] = flagged);

        return true;
      }

      recursiveResult = shapeFinder(row, col + 1, { ...config, width: config.width - 1 }, flagged);
      flagged && (matrix[row][col] = flagged);

      return recursiveResult;
    }

    if (config.width === 1) {
      recursiveResult = shapeFinder(row + 1, col, { ...config, height: config.height - 1 }, flagged);
      flagged && (matrix[row][col] = flagged);

      return recursiveResult;
    }

    recursiveResult =
      shapeFinder(row, col + 1, { ...config, height: 1, width: config.width - 1 }, flagged) &&
      shapeFinder(row + 1, col, { ...config, height: config.height - 1 }, flagged);
    flagged && (matrix[row][col] = flagged);

    return recursiveResult;
  }
}
