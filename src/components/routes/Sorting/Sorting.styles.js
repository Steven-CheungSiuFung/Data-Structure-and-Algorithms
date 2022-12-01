import styled from "styled-components";
import { ControlDiv } from "../../FunctionalDiv/FunctionalDiv.styles";

export const SortingContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
`;

export const ArrayContainer = styled.div`
  display: flex;
  gap: 5px;
  align-items: flex-end;
`;

export const ControlGroup = styled.div`
  display: flex;
  gap: 1.5rem;
`;

export const ControlButton = styled(ControlDiv)``;
