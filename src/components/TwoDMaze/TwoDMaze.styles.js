import styled from "styled-components";

export const MazeComponentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
`;

export const SelectMazeSize = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const SelectGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const Selector = styled.select`
  border-radius: 5px;
  padding: 2px 5px 2px 3px;
  cursor: pointer;
`;

export const SpeedContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const SpeedSelector = styled(Selector)``;

export const FunctionalDiv = styled.div`
  border: 1px solid black;
  border-radius: 5px;
  padding: 2px 8px;
  cursor: pointer;
`;

export const SetMazeSizeButton = styled(FunctionalDiv)`
  border-color: sandybrown;
  background-color: snow;
  color: sandybrown;

  &:hover {
    background-color: bisque;
    border-color: burlywood;
  }
`;

export const MazeContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: min-content;
  box-shadow: 0 0 0 0.5px black;
`;

export const Row = styled.div`
  display: flex;
  width: min-content;
`;

export const SelectTypesButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const SelectTypesButton = styled(FunctionalDiv)`
  border-color: ${(props) => (props.selected ? "sandybrown" : "silver")};
  background-color: ${(props) => (props.selected ? "bisque" : "snow")};
  color: ${(props) => (props.selected ? "sandybrown" : "silver")};
`;

export const ControlGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

export const ControlButton = styled(FunctionalDiv)`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  padding: 3px 10px;
  font-size: 1.2rem;
`;
