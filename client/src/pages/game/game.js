import React, { Component } from "reactn";
import Board from "../../components/board/board";
import StoneGrid from "../../components/board/stoneGrid";
import TurnBox from "../../components/turnBox/turnBox";
import ErrorBox from "../../components/errorBox/errorBox";
import SideBar from "../../components/sideBar/sideBar";
import Shouter from "../../components/shouter/shouter";

export default class Game extends Component {
  render() {
    const { sendUpdate, sendShout } = this.props;
    const { boardSize, gameOver, shout } = this.global;
    return (
      <>
        <ErrorBox />
        <SideBar sendShout={sendShout} />
        <div className="mainContainer">
          <Shouter name={shout} />
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
