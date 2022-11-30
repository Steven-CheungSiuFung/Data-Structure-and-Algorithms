import styled from "styled-components";
import {
  FunctionalDiv,
  ControlDiv,
} from "../FunctionalDiv/FunctionalDiv.styles";

export const MazeComponentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
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

export const ControlButton = styled(ControlDiv)``;
