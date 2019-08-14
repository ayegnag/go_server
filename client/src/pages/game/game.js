import React, { Component } from "reactn";
import Board from "../../components/board/board";
import StoneGrid from "../../components/board/stoneGrid";
import TurnBox from "../../components/turnBox/turnBox";
import ErrorBox from "../../components/errorBox/errorBox";

export default class Game extends Component {
  render() {
    const { sendUpdate } = this.props;
    const { boardSize, gameOver } = this.global;
    return (
      <>
        <ErrorBox />
        <div className="mainContainer">
          <div className={`container size${boardSize}`}>
            <Board size={boardSize} />
            <StoneGrid stoneData={1} size={boardSize} sendUpdate={sendUpdate} />
          </div>
          <TurnBox sendUpdate={sendUpdate} gameOver={gameOver} />
        </div>
      </>
    );
  }
}
