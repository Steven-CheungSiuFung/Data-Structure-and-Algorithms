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

  /* Number of Islands */
  const grid = [
    ["1", "1", "1", "1", "0"],
    ["1", "1", "0", "1", "0"],
    ["1", "1", "0", "0", "1"],
    ["1", "0", "0", "1", "1"],
    ["0", "0", "1", "1", "1"],
  ];
  const islandDFS = (grid, row, col) => {
    if (
      row < 0 ||
      row >= grid.length ||
      col < 0 ||
      col >= grid[0].length ||
      grid[row][col] === "0"
    )
      return;
    const direction = [
      [-1, 0],
      [0, 1],
      [1, 0],
      [0, -1],
    ];
    if (grid[row][col] === "1") {
      grid[row][col] = "0";
    }
    for (let i = 0; i < direction.length; i++) {
      const currentDir = direction[i];
      islandDFS(grid, row + currentDir[0], col + currentDir[1]);
    }
  };

  const numIslands = (grid) => {
    let count = 0;
    // sequential traverse
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {
        if (grid[i][j] === "1") {
          // count++
          count++;
          islandDFS(grid, i, j);
          // DFS turn island to "0"
        }
      }
    }
    return count;
    // T: O(m*n);
    // S: O(m*n);
  };

  /* Rotting Oranges */
  const orangesRotting = (grid) => {
    // get all initial rotten oranges
    // get all fresh oranges
    // BFS
    // keep track of time by counting level
    const direction = [
      [-1, 0],
      [0, 1],
      [1, 0],
      [0, -1],
    ];
    let time = 0;
    const q = [];
    let fresh = 0;
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {
        if (grid[i][j] === 2) {
          const newRotten = [i, j];
          q.push(newRotten);
        } else if (grid[i][j] === 1) {
          fresh++;
        }
      }
    }
    if (fresh === 0) return 0;
    let count = q.length;
    let currentNum = 0;
    while (q.length) {
      const currentRotten = q.shift();
      currentNum++;
      for (let i = 0; i < direction.length; i++) {
        const currentDir = direction[i];
        const row = currentRotten[0] + currentDir[0];
        const col = currentRotten[1] + currentDir[1];
        if (
          row < 0 ||
          row >= grid.length ||
          col < 0 ||
          col >= grid[0].length ||
          grid[row][col] === 0 ||
          grid[row][col] === 2
        )
          continue;
        if (grid[row][col] === 1) {
          grid[row][col] = 2;
          q.push([row, col]);
          fresh--;
        }
      }
      if (currentNum === count) {
        time++;
        currentNum = 0;
        count = q.length;
      }
    }
    if (fresh > 0) return -1;
    return time - 1;
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
