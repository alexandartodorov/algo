import { solver } from './solver';

describe('Task 01', () => {
  it('should handle correctly the given task input', () => {
    const matrix = [
      [3, 3, 7, 7, 7, 7, 6, 6, 7, 7],
      [3, 3, 7, 7, 4, 4, 4, 4, 6, 3],
      [3, 3, 2, 7, 2, 2, 1, 1, 4, 3],
      [8, 2, 5, 5, 2, 1, 1, 3, 4, 3],
      [8, 9, 5, 1, 1, 1, 3, 3, 4, 3],
      [9, 2, 8, 9, 1, 1, 2, 2, 2, 7],
      [8, 1, 9, 1, 1, 9, 2, 5, 5, 4],
      [9, 8, 2, 8, 1, 1, 9, 8, 4, 7],
    ];

    const config = [
      { symbol: 1, width: 2, height: 2 },
      { symbol: 2, width: 1, height: 2 },
      { symbol: 3, width: 2, height: 3 },
      { symbol: 7, width: 3, height: 1 },
    ];

    const expectedOutput =
      'Found figure: symbol = 3, position = (0, 0), size = (2, 3)\n' +
      'Found figure: symbol = 7, position = (2, 0), size = (3, 1)\n' +
      'Found figure: symbol = 2, position = (4, 2), size = (1, 2)\n' +
      'Found figure: symbol = 1, position = (4, 4), size = (2, 2)\n' +
      'Found figure: symbol = 2, position = (6, 5), size = (1, 2)';

    const result = solver(matrix, config);

    expect(result).toEqual(expectedOutput);
  });

  it('should exclude overlapping figures when overlap is not explicitly set to true', () => {
    const matrix = [
      [3, 0],
      [3, 3],
      [3, 3],
    ];

    const config = [{ symbol: 3, width: 1, height: 2 }];

    const expectedOutput =
      'Found figure: symbol = 3, position = (0, 0), size = (1, 2)\n' +
      'Found figure: symbol = 3, position = (1, 1), size = (1, 2)';

    const result = solver(matrix, config);

    expect(result).toEqual(expectedOutput);
  });

  it('should include overlapping figures when overlap is set to true', () => {
    const matrix = [
      [3, 0],
      [3, 3],
      [3, 3],
    ];

    const config = [{ symbol: 3, width: 1, height: 2 }];

    const expectedOutput =
      'Found figure: symbol = 3, position = (0, 0), size = (1, 2)\n' +
      'Found figure: symbol = 3, position = (0, 1), size = (1, 2)\n' +
      'Found figure: symbol = 3, position = (1, 1), size = (1, 2)';

    const result = solver(matrix, config, true);

    expect(result).toEqual(expectedOutput);
  });
});
