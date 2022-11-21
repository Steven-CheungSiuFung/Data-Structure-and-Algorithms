import TwoDArrayCell from "../TwoDArrayCell/TwoDArrayCell.component";
import { Row } from "./TwoDArrayRow.styles";

const TwoDArrayRow = ({ item }) => {
  return (
    <Row>
      {item.map((cell) => {
        const { wall, gate, start, value, path } = cell;
        return (
          <TwoDArrayCell
            wall={wall}
            gate={gate}
            start={start}
            value={value}
            path={path}
          />
        );
      })}
    </Row>
  );
};

export default TwoDArrayRow;
