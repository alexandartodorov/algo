import { solver } from './solver';

describe('Task 01', () => {
  it('should print "No clusters found" when no clusters are detected', () => {
    const matrix = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];

    const expectedOutput = 'No clusters found';

    const result = solver(matrix);

    expect(result).toEqual(expectedOutput);
  });

  it('should correctly handle border cluster', () => {
    const matrix = [
      [1, 1, 1],
      [1, 5, 1],
      [1, 1, 1],
    ];

    const expectedOutput =
      'Found cluster: symbol = 1, size = 8, positions = (0,0),(0,1),(0,2),(1,2),(2,2),(1,0),(2,0),(2,1)\n';

    const result = solver(matrix);

    expect(result).toEqual(expectedOutput);
  });

  it('should ignore diagonals', () => {
    const matrix = [
      [1, 2, 1],
      [2, 1, 2],
      [1, 2, 1],
    ];

    const expectedOutput = 'No clusters found';

    const result = solver(matrix);

    expect(result).toEqual(expectedOutput);
  });

  it('should correctly handle cross-shaped cluster', () => {
    const matrix = [
      [1, 5, 1],
      [5, 5, 5],
      [1, 5, 1],
    ];

    const expectedOutput = 'Found cluster: symbol = 5, size = 5, positions = (1,0),(1,1),(1,2),(0,1),(2,1)\n';

    const result = solver(matrix);

    expect(result).toEqual(expectedOutput);
  });

  it('should handle various clusters', () => {
    const matrix = [
      [1, 1, 2, 2],
      [5, 5, 2, 3],
      [2, 2, 2, 3],
      [2, 3, 3, 3],
    ];

    const expectedOutput =
      'Found cluster: symbol = 1, size = 2, positions = (0,0),(1,0)\n' +
      'Found cluster: symbol = 2, size = 7, positions = (2,0),(2,1),(2,2),(1,2),(0,2),(0,3),(3,0)\n' +
      'Found cluster: symbol = 5, size = 2, positions = (0,1),(1,1)\n' +
      'Found cluster: symbol = 3, size = 5, positions = (3,1),(3,2),(3,3),(2,3),(1,3)\n';

    const result = solver(matrix);

    expect(result).toEqual(expectedOutput);
  });

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

    const expectedOutput =
      'Found cluster: symbol = 3, size = 6, positions = (0,0),(0,1),(0,2),(1,2),(1,1),(1,0)\n' +
      'Found cluster: symbol = 3, size = 4, positions = (9,1),(9,2),(9,3),(9,4)\n' +
      'Found cluster: symbol = 3, size = 3, positions = (7,3),(7,4),(6,4)\n' +
      'Found cluster: symbol = 7, size = 7, positions = (2,0),(2,1),(3,1),(3,2),(3,0),(4,0),(5,0)\n' +
      'Found cluster: symbol = 7, size = 2, positions = (8,0),(9,0)\n' +
      'Found cluster: symbol = 6, size = 2, positions = (6,0),(7,0)\n' +
      'Found cluster: symbol = 4, size = 4, positions = (4,1),(5,1),(6,1),(7,1)\n' +
      'Found cluster: symbol = 4, size = 3, positions = (8,2),(8,3),(8,4)\n' +
      'Found cluster: symbol = 2, size = 3, positions = (4,2),(4,3),(5,2)\n' +
      'Found cluster: symbol = 2, size = 4, positions = (6,5),(6,6),(7,5),(8,5)\n' +
      'Found cluster: symbol = 1, size = 13, positions = (6,2),(6,3),(5,3),(5,4),(5,5),(4,5),(4,6),(4,7),(5,7),(3,6),(4,4),(3,4),(7,2)\n' +
      'Found cluster: symbol = 8, size = 2, positions = (0,3),(0,4)\n' +
      'Found cluster: symbol = 5, size = 3, positions = (2,3),(2,4),(3,3)\n' +
      'Found cluster: symbol = 5, size = 2, positions = (7,6),(8,6)\n';

    const result = solver(matrix);

    expect(result).toEqual(expectedOutput);
  });
});
