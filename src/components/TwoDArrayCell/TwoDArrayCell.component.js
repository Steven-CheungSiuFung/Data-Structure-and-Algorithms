import { Fragment, useEffect } from "react";
import { useState } from "react";
import { Cell, Wall, Gate, Start, Path, Seen } from "./TwoDArrayCell.styles";

const getCell = (cellState) => {
  const { wall, gate, start, value, path } = cellState;
  if (wall) {
    return <Wall>{value}</Wall>;
  } else if (gate) {
    return <Gate>{value}</Gate>;
  } else if (start) {
    return <Start>{value}</Start>;
  } else if (path) {
    return <Path>{value}</Path>;
  } else {
    return value ? <Seen>{value}</Seen> : <Cell>{value}</Cell>;
  }
};

const TwoDArrayCell = ({ cell }) => {
  const [cellState, setCellState] = useState(cell);

  const onClickHandler = () => {};

  return <div onClick={onClickHandler}>{getCell(cellState)}</div>;
};

export default TwoDArrayCell;
