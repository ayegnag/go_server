import React, { useGlobal } from "reactn";
import StonePit from "./stone";
import "./board.scss";

const GenerateStones = ({ boardData, size }, sendUpdate) => {
  let grid = [];
  for (let rows = 0; rows < size; rows++) {
    let stones = [];
    for (let column = 0; column < size; column++) {
      const xy = column + "_" + rows;
      const { type, key, mark } = boardData[xy];
      // console.log("TCL: GenerateStones -> xy", xy);
      stones.push(
        <StonePit
          stone={type}
          key={key}
          xy={xy}
          row={rows}
          col={column}
          mark={mark}
          sendUpdate={sendUpdate}
        />
      );
    }
    // stones.push(<div className="pit">{String.fromCharCode(65 + column)}</div>);

    grid.push(
      <div className="row" key={"r" + rows}>
        {stones}
      </div>
    );
  }
  return grid;
};

export default function StoneGrid(props) {
  const [boardData] = useGlobal("boardData");
  const { size, sendUpdate } = props;
  return (
    <div className={`grid sizeg${size}`}>
      {GenerateStones({ boardData, size }, sendUpdate)}
    </div>
  );
}
