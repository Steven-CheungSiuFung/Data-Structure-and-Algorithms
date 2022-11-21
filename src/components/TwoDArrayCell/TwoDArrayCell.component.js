import { Fragment, useEffect } from "react";
import { useState } from "react";
import { Cell, Wall, Gate, Start, Path } from "./TwoDArrayCell.styles";

const getCell = (isWall, isGate, isStart, children, isPath) => {
  if (isWall) {
    return <Wall>{children}</Wall>;
  } else if (isGate) {
    return <Gate>{children}</Gate>;
  } else if (isStart) {
    return <Start>{children}</Start>;
  } else if (isPath) {
    return <Path>{children}</Path>;
  } else {
    return <Cell>{children}</Cell>;
  }
};

const TwoDArrayCell = ({ wall, gate, start, value, path }) => {
  const [isWall, setWall] = useState(wall);
  const [isGate, setGate] = useState(gate);
  const [isStart, setStart] = useState(start);
  const [isValue, setValue] = useState(value);
  const [isPath, setPath] = useState(path);

  const onClickHandler = () => {};

  return (
    <div onClick={onClickHandler}>
      {getCell(isWall, isGate, isStart, isValue, isPath)}
    </div>
  );
};

export default TwoDArrayCell;
