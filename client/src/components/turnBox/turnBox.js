import React, { Component } from "reactn";
import { getScores } from "../board/rules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRedoAlt,
  faSave,
  faFolderOpen,
  faStepForward,
  faStepBackward
} from "@fortawesome/free-solid-svg-icons";

import "./turn.scss";
import "../../styles/stone.scss";

export default class TurnBox extends Component {
  state = {
    stepCount: 0
  };
  passTurnRemote = turn => {
    const { passed } = this.global;
    const { sendUpdate } = this.props;
    if (passed) {
      this.setGlobal({ gameOver: true });
      this.endGame();
    }
    this.setGlobal({ turn: turn === 1 ? 2 : 1, passed: true }, () => {
      console.log("TCL: TurnBox -> sendUpdate Pass");
      sendUpdate();
    });
  };
  passTurn = turn => {
    const { passed } = this.global;
    if (passed) {
      this.setGlobal({ gameOver: true });
      this.endGame();
    }
    this.setGlobal({ turn: turn === 1 ? 2 : 1, passed: true });
  };

  endGame() {
    const { boardData, boardSize } = this.global;
    console.log("TCL: TurnBox -> endGame -> boardState", boardData);
    // Do the calculation and find winner.
    const { message } = getScores(boardData, boardSize);
    this.setGlobal({
      // boardData: board,
      showError: { show: true, message }
    });
    console.log("GameOver");
  }
  saveGame() {
    const { boardData, boardHistory, turn, moveCount } = this.global;
    const dataString = JSON.stringify(boardData);
    const backupString = JSON.stringify(boardHistory);
    localStorage.setItem("board", dataString);
    localStorage.setItem("history", backupString);
    localStorage.setItem("moveCount", moveCount);
    localStorage.setItem("turn", turn);
    console.log("Game Saved");
  }
  loadGame() {
    const boardState = localStorage.getItem("board");
    if (boardState) {
      console.log("TCL: TurnBox -> loadGame -> boardState", boardState);
      const board = JSON.parse(boardState);
      const history = JSON.parse(localStorage.getItem("history"));
      const turn = JSON.parse(localStorage.getItem("turn"));
      const moveCount = JSON.parse(localStorage.getItem("moveCount"));
      this.setGlobal({
        boardData: board,
        boardHistory: history,
        turn,
        moveCount
      });
      console.log("Game Loaded");
    }
    console.log("No previoud saved game found");
  }

  backwardGame = () => {
    const { boardHistory, moveCount } = this.global;
    console.log("TCL: TurnBox -> backwardGame -> moveCount", moveCount);
    const stepBack = moveCount - 1;
    if (stepBack >= 0) {
      const lastState = boardHistory[stepBack];
      this.setGlobal({
        boardData: lastState,
        moveCount: stepBack
      });
    }
    console.log("Game Stepped Back");
  };
  forwardGame = () => {
    const { boardHistory, moveCount } = this.global;
    const stepForward = moveCount + 1;
    if (stepForward < boardHistory.length) {
      const lastState = boardHistory[stepForward];
      this.setGlobal({
        boardData: lastState,
        moveCount: stepForward
      });
    }
    console.log("Game Stepped Forward");
  };

  resetGame = () => {
    const { boardHistory } = this.global;
    const firstState = boardHistory[0];
    console.log("TCL: TurnBox -> resetGame -> boardHistory", boardHistory[0]);
    this.setGlobal({
      moveCount: 0,
      turn: 2,
      boardData: firstState,
      boardHistory: [{ ...firstState }]
    });
    console.log("Game Resetted");
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.global.remoteGame && this.global.gameOver) {
      this.endGame();
    }
  }
  render() {
    const {
      turn,
      position,
      gameCode,
      remoteGame,
      thisPlayerStone
    } = this.global;

    return (
      <div className="Turn">
        <div className="infoContainer">
          <span className="title">Next Turn</span>
          <div className="big">
            {turn === 1 && <div className="big stone white" />}
            {turn === 2 && <div className="big stone black" />}
          </div>
          <button
            className="button"
            onClick={
              remoteGame
                ? thisPlayerStone === turn
                  ? () => this.passTurnRemote(turn)
                  : null
                : () => this.passTurn(turn)
            }
          >
            Pass Turn
          </button>
          <span className="info">
            {position.row}, {position.col}
          </span>
        </div>
        <div className="toolsContainer">
          {remoteGame && (
            <div className="topTools">
              Your colour: {thisPlayerStone === 1 ? "White" : "Black"}
            </div>
          )}
          {gameCode && (
            <div className="bottomTools">
              <span className="gCode">Code: {gameCode}</span>
            </div>
          )}
          {!gameCode && (
            <>
              <div className="topTools">
                <div className="toolDiv">
                  <FontAwesomeIcon
                    icon={faSave}
                    className="tools"
                    onClick={() => this.saveGame()}
                  />
                  <div className="tooltip top">Save Game</div>
                </div>
                <div className="toolDiv">
                  <FontAwesomeIcon
                    icon={faFolderOpen}
                    className="tools"
                    onClick={() => this.loadGame()}
                  />
                  <div className="tooltip top">Load Game</div>
                </div>
              </div>
              <div className="bottomTools">
                <div className="toolDiv">
                  <FontAwesomeIcon
                    icon={faStepBackward}
                    className="tools"
                    onClick={() => this.backwardGame()}
                  />
                  <div className="tooltip bottom">Reverse Move</div>
                </div>
                <div className="toolDiv">
                  <FontAwesomeIcon
                    icon={faStepForward}
                    className="tools"
                    onClick={() => this.forwardGame()}
                  />
                  <div className="tooltip bottom">Forward Move</div>
                </div>
                <div className="toolDiv">
                  <FontAwesomeIcon
                    icon={faRedoAlt}
                    className="tools"
                    onClick={() => this.resetGame()}
                  />
                  <div className="tooltip bottom">Reset Game</div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
}
