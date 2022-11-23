import styled from "styled-components";

export const Cell = styled.div`
  width: 20px;
  height: 20px;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  items-align: center;
  cursor: pointer;
`;

export const Seen = styled(Cell)`
  background-color: lightblue;
`;

export const Wall = styled(Cell)`
  background-color: gray;
`;

export const Gate = styled(Cell)`
  background-color: green;
`;

export const Start = styled(Cell)`
  background-color: orange;
`;

export const Path = styled(Cell)`
  background-color: yellow;
`;
