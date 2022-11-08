import React from "react";

const TwoDArray = () => {
  const TwoD = [
    [1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10],
    [11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20],
  ];

  const direaction = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];

  // DFS for 2D-Array
  const dfs = (matrix, row, col, seen, values) => {
    if (
      row < 0 ||
      row >= matrix.length ||
      col < 0 ||
      col >= matrix[0].length ||
      seen[row][col]
    )
      return;
    values.push(matrix[row][col]);
    seen[row][col] = true;
    for (let i = 0; i < direaction.length; i++) {
      const currentDir = direaction[i];
      dfs(matrix, row + currentDir[0], col + currentDir[1], seen, values);
    }
  };

  const traversalDFS = (matrix) => {
    const values = [];
    const seen = new Array(matrix.length)
      .fill(0)
      .map(() => new Array(matrix[0].length).fill(false));
    dfs(matrix, 0, 0, seen, values);
    return values;
    // T: O(n);
    // S: O(n);
  };

  // BFS for 2D-Array
  const traversalBFS = (matrix) => {
    const q = [[0, 0]];
    const values = [];
    const seen = new Array(matrix.length)
      .fill(0)
      .map(() => new Array(matrix[0].length).fill(false));
    while (q.length) {
      const currentNode = q.shift();
      const row = currentNode[0];
      const col = currentNode[1];
      if (
        row < 0 ||
        row >= matrix.length ||
        col < 0 ||
        col >= matrix[0].length ||
        seen[row][col]
      )
        continue;
      seen[row][col] = true;
      values.push(matrix[row][col]);
      for (let i = 0; i < direaction.length; i++) {
        const currentDir = direaction[i];
        q.push([row + currentDir[0], col + currentDir[1]]);
      }
    }
    return values;
    // T: O(n);
    // S: O(n);
  };

  return (
    <div>
      <h3>2D Array</h3>
      <p>Input Matrix: {JSON.stringify(TwoD)}</p>
      <h3>DFS for 2D Array</h3>
      <p>Output: {JSON.stringify(traversalDFS(TwoD))}</p>
      <h3>BFS for 2D Array</h3>
      <p>Output: {JSON.stringify(traversalBFS(TwoD))}</p>
    </div>
  );
};

export default TwoDArray;
