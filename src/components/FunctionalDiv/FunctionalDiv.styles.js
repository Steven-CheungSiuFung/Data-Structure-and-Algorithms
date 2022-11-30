import styled from "styled-components";

export const FunctionalDiv = styled.div`
  border: 1px solid black;
  border-radius: 5px;
  padding: 2px 8px;
  cursor: pointer;
`;

export const ControlDiv = styled(FunctionalDiv)`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  padding: 3px 10px;
  font-size: 1.2rem;
`;
