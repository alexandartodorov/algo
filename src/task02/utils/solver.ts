import { Cluster, Clusters, Coords } from './models';

export function solver(matrixInput: number[][]): string {
  const matrix = matrixInput.map((row) => row.map((el) => ({ value: el, marked: false })));
  const symbolToClusterMap = new Map<number, Clusters>();

  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[0].length; col++) {
      const currentElement = matrix[row][col];
      if (currentElement.marked) continue;

      const cluster = clusterFinder(row, col, currentElement.value);

      if (cluster.length > 1) {
        const prevClusters = symbolToClusterMap.has(currentElement.value)
          ? (symbolToClusterMap.get(currentElement.value) as Clusters)
          : [];

        symbolToClusterMap.set(currentElement.value, [...prevClusters, cluster]);
      }
    }
  }

  const res = stringifySymbolToClusterMap(symbolToClusterMap);

  return res ? res : 'No clusters found';

  function clusterFinder(row: number, col: number, symbol: number): Cluster {
    if (!matrix[row] || !matrix[row][col] || matrix[row][col].value !== symbol || matrix[row][col].marked) {
      return [];
    }

    matrix[row][col].marked = true;

    return [
      [col, row],
      ...clusterFinder(row + 1, col, symbol),
      ...clusterFinder(row + 1, col, symbol),
      ...clusterFinder(row, col - 1, symbol),
      ...clusterFinder(row, col + 1, symbol),
    ];
  }

  function stringifySymbolToClusterMap(map: Map<number, Clusters>): string {
    let res = '';

    map.forEach((clusters, symbol) => {
      res += stringifyClusters(symbol, clusters);
    });

    return res;
  }

  function stringifyClusters(symbol: number, clusters: Clusters): string {
    return clusters.reduce((str, cluster) => (str += stringifyCluster(symbol, cluster)), '');
  }

  function stringifyCluster(symbol: number, cluster: Cluster): string {
    return `Found cluster: symbol = ${symbol}, size = ${cluster.length}, positions = ${stringifyPositions(cluster)}\n`;
  }

  function stringifyPositions(cluster: Cluster): string {
    return `${cluster.map((c) => stringifyCoords(c))}`;
  }

  function stringifyCoords(coords: Coords): string {
    return `(${coords.join(',')})`;
  }
}
