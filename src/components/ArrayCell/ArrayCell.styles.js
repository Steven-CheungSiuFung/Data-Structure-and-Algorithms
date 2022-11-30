import styled from "styled-components";

export const ArrayCellContainer = styled.div`
  width: 10px;
  height: ${(props) => props.value * 10}px;
  background-color: ${(props) => {
    let currentColor = "silver";
    if (props.current) {
      currentColor = "green";
    } else if (props.primary) {
      currentColor = "yellow";
    } else if (props.secondary) {
      currentColor = "orange";
    }
    return currentColor;
  }};
`;
