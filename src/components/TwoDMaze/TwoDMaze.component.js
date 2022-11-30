import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { sleep } from "../../helper/utils";

import { GoPlay } from "react-icons/go";
import { BiReset } from "react-icons/bi";
import { AiOutlineClear } from "react-icons/ai";

import TwoDArrayCell from "../TwoDArrayCell/TwoDArrayCell.component";
import {
  MazeComponentWrapper,
  MazeContainer,
  Row,
  SetMazeSizeButton,
  SelectTypesButton,
  SelectTypesButtonContainer,
  ControlGroup,
  ControlButton,
} from "./TwoDMaze.styles";
import {
  SelectSection,
  SelectGroup,
  Selector,
} from "../Selector/Selector.styles";

// create the search direction
const direction = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

// select which state types to change
const defaultSelectedTypes = {
  start: false,
  wall: false,
  gate: false,
};

// initial Start Point and Gate
const initialStartPoint = [1, 2];
const initialGate = [8, 7];

// search speed
const speeds = {
  Slow: 100,
  Normal: 50,
  Fast: 30,
  Biuu: 1,
};

// search defaultAlgorithms
const defaultAlgorithms = {
  "Breadth First Search": false,
  "Depth First Search": false,
};

const TwoDMaze = () => {
  // states
  const [mazeState, setMazeState] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState(defaultSelectedTypes);
  const [startPoint, setStartPoint] = useState(initialStartPoint);
  const [gatePoint, setGatePoint] = useState(1);
  const [matrixSize, setMatrixSize] = useState({ rows: 10, columns: 10 });
  const [searchSpeed, setSearchSpeed] = useState(speeds.Normal);
  const [searchAlgo, setSearchAlgo] = useState({
    ...defaultAlgorithms,
    "Breadth First Search": true,
  });
  const [searchTime, setSearchTime] = useState();

  /* Build a maze and find the path */
  class Cell {
    constructor() {
      this.wall = false;
      this.gate = false;
      this.start = false;
      this.value = null;
      this.path = false;
      this.row = null;
      this.col = null;
      this.id = null;
    }
  }

  // create a matrix
  const createMatrix = (rows, cols) => {
    const newMatrix = new Array(rows).fill(0).map((item) => {
      const innerArray = [];
      for (let i = 0; i < cols; i++) {
        const newCell = new Cell();
        const newId = uuidv4();
        newCell.id = newId;
        innerArray.push(newCell);
      }
      return innerArray;
    });
    return newMatrix;
  };

  // initial the maze
  const initializeMaze = (row, col) => {
    const maze = createMatrix(row, col);

    maze[initialStartPoint[0]][initialStartPoint[1]].start = true;
    maze[initialGate[0]][initialGate[1]].gate = true;
    maze[1][3].wall = true;
    maze[2][3].wall = true;
    maze[3][3].wall = true;
    maze[4][3].wall = true;
    maze[6][2].wall = true;
    maze[6][3].wall = true;
    maze[6][4].wall = true;
    maze[6][5].wall = true;
    return maze;
  };

  useEffect(() => {
    const maze = initializeMaze(10, 10);
    setMazeState(maze);
  }, []);

  // function for cleaning the path
  const cleanPath = () => {
    for (let i = 0; i < mazeState.length; i++) {
      for (let j = 0; j < mazeState[0].length; j++) {
        mazeState[i][j].value = null;
        mazeState[i][j].path = false;
        setMazeState([...mazeState]);
      }
    }
  };

  // helper function for finding startPoint by sequential traverse
  const findStart = (grid) => {
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {
        if (grid[i][j].start) {
          return [i, j];
        }
      }
    }
  };

  // the DFS recursion function for finding the shortest path after touching the gate
  const mazePathHighlightDFS = (grid, seen, row, col) => {
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
        grid[newRow][newCol].value &&
        grid[newRow][newCol].value < grid[row][col].value
      ) {
        grid[newRow][newCol].path = true;
        seen[[newRow, newCol]] = true;
        mazePathHighlightDFS(grid, seen, newRow, newCol);
        break;
      }
    }
  };

  // the main function for finding the shortest path after touching the gate
  const mazePathHighlight = (grid, gateLocation) => {
    const seen = {};
    const currentRow = gateLocation[0];
    const currentCol = gateLocation[1];
    seen[[currentRow, currentCol]] = true;
    mazePathHighlightDFS(grid, seen, currentRow, currentCol);
  };

  // the main function for searching the gate via BFS
  const mazeFindPathBFS = async (grid) => {
    const startTime = new Date().getTime();
    const q = [startPoint];
    const seen = {};
    seen[startPoint] = true;
    let level = 1;
    let count = 1;

    while (q.length) {
      await sleep(searchSpeed);
      const current = q.shift();
      const currentRow = current[0];
      const currentCol = current[1];
      grid[currentRow][currentCol].value = level;
      setMazeState([...grid]);
      if (grid[currentRow][currentCol].gate) {
        mazePathHighlight(grid, current);
        const endTime = new Date().getTime();
        const deltaTime = (endTime - startTime) / 1000;
        setSearchTime(deltaTime);
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

  // the DFS recursion function ofsearching the gate via DFS
  const mazeDFS = async (grid, row, col, count, seen) => {
    await sleep(searchSpeed);
    grid[row][col].value = count;
    setMazeState([...mazeState]);
    if (grid[row][col].gate) {
      mazePathHighlight(grid, [row, col], startPoint);
      return [row, col];
    }
    for (let i = 0; i < direction.length; i++) {
      const currentDir = direction[i];
      const currentRow = row + currentDir[0];
      const currentCol = col + currentDir[1];
      if (
        currentRow < 0 ||
        currentRow >= grid.length ||
        currentCol < 0 ||
        currentCol >= grid[0].length ||
        seen[[currentRow, currentCol]] ||
        grid[currentRow][currentCol].wall ||
        grid[currentRow][currentCol].start
      ) {
        continue;
      }
      seen[[currentRow, currentCol]] = true;
      const result = await mazeDFS(
        grid,
        currentRow,
        currentCol,
        count + 1,
        seen
      );
      if (result) return result;
    }
    return null;
  };

  // the main function for searching the gate via DFS
  const mazeFindPathDFS = async (grid) => {
    const startTime = new Date().getTime();
    const seen = {};
    const count = 1;
    const startPoint = findStart(grid);
    const row = startPoint[0];
    const col = startPoint[1];
    const gateLocation = await mazeDFS(grid, row, col, count, seen);
    const endTime = new Date().getTime();
    const deltaTime = (endTime - startTime) / 1000;
    setSearchTime(deltaTime);
    return gateLocation;
  };

  // start to find the path
  const onClickFindPath = async () => {
    cleanPath();
    const result = searchAlgo["Breadth First Search"]
      ? await mazeFindPathBFS(mazeState, searchSpeed)
      : await mazeFindPathDFS(mazeState);
    console.log(result);
  };

  // Change Maze Size
  const onChangeSelectMazeSize = (e) => {
    const name = e.target.name;
    const value = Number(e.target.value);

    setMatrixSize({ ...matrixSize, [name]: value });
  };

  // set maze size
  const onClickMazeSize = () => {
    const rows = matrixSize.rows;
    const cols = matrixSize.columns;
    const newMaze = createMatrix(rows, cols);
    newMaze[initialStartPoint[0]][initialStartPoint[1]].start = true;
    newMaze[initialGate[0]][initialGate[1]].gate = true;
    setMazeState(newMaze);
    setStartPoint(initialStartPoint);
    setGatePoint(1);
  };

  // change searching Algorithms
  const onChangeSelectAlgo = (e) => {
    const selectedAlgo = e.target.value;
    const newAlgo = { ...defaultAlgorithms, [selectedAlgo]: true };
    setSearchAlgo(newAlgo);
  };

  // change speed
  const onChangeSelectSpeed = (e) => {
    const selectedSpeed = e.target.value;
    setSearchSpeed(speeds[selectedSpeed]);
  };

  // change the current selected type
  const onCellTypesClickHandler = (e) => {
    const type = e.target.id;
    const newSelectedTypes = { ...defaultSelectedTypes };
    newSelectedTypes[type] = true;
    setSelectedTypes(newSelectedTypes);
  };

  // a function for changing the cell state by click on a cell
  const onCellClickHandler = (coordintes) => {
    const row = coordintes[0];
    const col = coordintes[1];
    if (selectedTypes.start) {
      if (!mazeState[row][col].gate) {
        mazeState[startPoint[0]][startPoint[1]].start = false;
        mazeState[row][col].start = true;
        mazeState[row][col].wall = false;
        setStartPoint([row, col]);
      }
    } else if (selectedTypes.wall) {
      if (!mazeState[row][col].start && !mazeState[row][col].gate) {
        mazeState[row][col].wall = !mazeState[row][col].wall;
      }
    } else if (selectedTypes.gate && !mazeState[row][col].start) {
      if (mazeState[row][col].gate) {
        if (gatePoint > 1) {
          mazeState[row][col].gate = false;
          setGatePoint((prev) => prev - 1);
        }
      } else {
        mazeState[row][col].gate = true;
        mazeState[row][col].wall = false;
        setGatePoint((prev) => prev + 1);
      }
    }
    setMazeState([...mazeState]);
  };

  // Reset the path, value
  const onClickClean = () => {
    cleanPath();
  };

  // Reset all
  const onClickReset = () => {
    const newMaze = initializeMaze(10, 10);
    setMazeState(newMaze);
    setStartPoint(initialStartPoint);
    setGatePoint(1);
  };

  return (
    <MazeComponentWrapper>
      <h1>Maze And Path Finding</h1>
      <SelectSection>
        <SelectGroup>
          <label>Rows: </label>
          <Selector id="rows" name="rows" onChange={onChangeSelectMazeSize}>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </Selector>
        </SelectGroup>
        <SelectGroup>
          <label>Columns: </label>
          <Selector
            id="columns"
            name="columns"
            onChange={onChangeSelectMazeSize}
          >
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </Selector>
        </SelectGroup>
        <SetMazeSizeButton onClick={onClickMazeSize}>
          Set Maze Size
        </SetMazeSizeButton>
      </SelectSection>
      <SelectSection>
        <SelectGroup>
          <label>Searching Algorithm: </label>
          <Selector
            id="algo"
            name="algo"
            defaultValue="Breadth First Search"
            onChange={onChangeSelectAlgo}
          >
            <option value="Breadth First Search">Breadth First Search</option>
            <option value="Depth First Search">Depth First Search</option>
          </Selector>
        </SelectGroup>
        <SelectGroup>
          <label>Searching Speed: </label>
          <Selector
            id="speed"
            name="speed"
            defaultValue="Normal"
            onChange={onChangeSelectSpeed}
          >
            <option value="Slow">Slow</option>
            <option value="Normal">Normal</option>
            <option value="Fast">Fast</option>
            <option value="Biuu">Biuu</option>
          </Selector>
        </SelectGroup>
      </SelectSection>
      <SelectTypesButtonContainer>
        <p>Select a type and click on a cell to set or cancel it: </p>
        <SelectTypesButton
          id="start"
          onClick={onCellTypesClickHandler}
          selected={selectedTypes.start}
        >
          Start Point
        </SelectTypesButton>
        <SelectTypesButton
          id="wall"
          onClick={onCellTypesClickHandler}
          selected={selectedTypes.wall}
        >
          Wall
        </SelectTypesButton>
        <SelectTypesButton
          id="gate"
          onClick={onCellTypesClickHandler}
          selected={selectedTypes.gate}
        >
          Gate
        </SelectTypesButton>
      </SelectTypesButtonContainer>
      <MazeContainer>
        {mazeState.map((row, rowIndex) => {
          return (
            <Row key={rowIndex}>
              {row.map((cell, colIndex) => {
                cell.row = rowIndex;
                cell.col = colIndex;
                return (
                  <TwoDArrayCell
                    key={cell.id}
                    cell={cell}
                    onCellClickHandler={onCellClickHandler}
                  />
                );
              })}
            </Row>
          );
        })}
      </MazeContainer>
      <p>{searchTime && `Searching Time: ${searchTime}s`}</p>
      <ControlGroup>
        <ControlButton onClick={onClickFindPath}>
          <GoPlay />
          Find the path
        </ControlButton>
        <ControlButton onClick={onClickClean}>
          <AiOutlineClear />
          Clean path
        </ControlButton>
        <ControlButton onClick={onClickReset}>
          <BiReset />
          Reset maze
        </ControlButton>
      </ControlGroup>
    </MazeComponentWrapper>
  );
};

export default TwoDMaze;
