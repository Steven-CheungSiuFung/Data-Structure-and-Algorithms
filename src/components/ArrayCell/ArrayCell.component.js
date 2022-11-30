import { ArrayCellContainer } from "./ArrayCell.styles";

const ArrayCell = ({ item }) => {
  const { value, primary, secondary, current } = item;
  return (
    <ArrayCellContainer
      value={value}
      primary={primary}
      secondary={secondary}
      current={current}
    ></ArrayCellContainer>
  );
};

export default ArrayCell;
