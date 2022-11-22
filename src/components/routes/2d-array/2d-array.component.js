import React, { useState } from "react";
import TwoDArrayCell from "../../TwoDArrayCell/TwoDArrayCell.component";

import { Row } from "./2d-array.styles";

const TwoDArray = () => {
  const TwoD = [
    [1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10],
    [11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20],
  ];

  const direction = [
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
    for (let i = 0; i < direction.length; i++) {
      const currentDir = direction[i];
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
      for (let i = 0; i < direction.length; i++) {
        const currentDir = direction[i];
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

  /* Build a maze and find the path */
  class Cell {
    constructor() {
      this.wall = false;
      this.gate = false;
      this.start = false;
      this.value = null;
      this.path = false;
    }
  }

  const maze = new Array(10).fill(0).map((item) => {
    const innerArray = [];
    for (let i = 0; i < 10; i++) {
      const newCell = new Cell();
      innerArray.push(newCell);
    }
    return innerArray;
  });

  maze[1][2].start = true;
  maze[8][7].gate = true;
  maze[1][3].wall = true;
  maze[2][3].wall = true;
  maze[3][3].wall = true;
  maze[4][3].wall = true;
  maze[6][2].wall = true;
  maze[6][3].wall = true;
  maze[6][4].wall = true;
  maze[6][5].wall = true;

  const findStart = (grid) => {
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {
        if (grid[i][j].start) {
          return [i, j];
        }
      }
    }
  };

  const mazePathHighlightDFS = (grid, seen, row, col, startPoint) => {
    if ([row, col] === startPoint) {
      return;
    }
    for (let i = 0; i < direction.length; i++) {
      const currentDir = direction[i];
      const newRow = row + currentDir[0];
      const newCol = col + currentDir[1];
      if (
        newRow < 0 ||
        newRow >= grid.length ||
        newCol < 0 ||
        newCol >= grid[0].length ||
        seen[[newRow, newCol]]
      ) {
        continue;
      }
      if (
        [newRow, newCol] !== startPoint &&
        grid[newRow][newCol].value === grid[row][col].value - 1
      ) {
        grid[newRow][newCol].path = true;
        seen[[newRow, newCol]] = true;
        mazePathHighlightDFS(grid, seen, newRow, newCol, startPoint);
        break;
      }
    }
  };

  const mazePathHighlight = (grid, gateLocation, startPoint) => {
    const seen = {};
    const currentRow = gateLocation[0];
    const currentCol = gateLocation[1];
    seen[[currentRow, currentCol]] = true;
    mazePathHighlightDFS(grid, seen, currentRow, currentCol, startPoint);
  };

  const sleep = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time));
  };

  const mazeFindPathBFS = async (grid) => {
    const startPoint = findStart(grid);
    const q = [startPoint];
    const seen = {};
    seen[startPoint] = true;
    let level = 0;
    let count = 1;

    while (q.length) {
      await sleep(50);
      const current = q.shift();
      const currentRow = current[0];
      const currentCol = current[1];
      grid[currentRow][currentCol].value = level;
      setMazeState([...grid]);
      if (grid[currentRow][currentCol].gate) {
        mazePathHighlight(grid, current, startPoint);
        return current;
      }
      for (let i = 0; i < direction.length; i++) {
        const row = current[0] + direction[i][0];
        const col = current[1] + direction[i][1];
        if (
          row < 0 ||
          row >= grid.length ||
          col < 0 ||
          col >= grid[0].length ||
          grid[row][col].wall ||
          seen[[row, col]]
        ) {
          continue;
        }
        q.push([row, col]);
        seen[[row, col]] = true;
      }
      count--;
      if (count === 0) {
        level++;
        count = q.length;
      }
    }
  };

  const [mazeState, setMazeState] = useState(maze);

  const findPath = async () => {
    const result = await mazeFindPathBFS(mazeState);
    console.log(result);
  };

  return (
    <div>
      <h3>2D Array</h3>
      <p>Input Matrix: {JSON.stringify(TwoD)}</p>
      <h3>DFS for 2D Array</h3>
      <p>Output: {JSON.stringify(traversalDFS(TwoD))}</p>
      <h3>BFS for 2D Array</h3>
      <p>Output: {JSON.stringify(traversalBFS(TwoD))}</p>
      {mazeState.map((row, index) => {
        return (
          <Row key={index}>
            {row.map((cell, index) => (
              <TwoDArrayCell key={index} cell={cell} />
            ))}
          </Row>
        );
      })}
      <div onClick={findPath}>Find the path</div>
    </div>
  );
};

export default TwoDArray;
