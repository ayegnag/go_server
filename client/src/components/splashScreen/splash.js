import React, { Component } from "reactn";
import "./splash.scss";

export default class Splash extends Component {
  setBoardSize = size => {
    console.log("TCL: Splash -> size", size);
    this.setGlobal({
      boardSize: size,
      splash: false
    });
  };
  render() {
    // const { splash } = this.global;
    return (
      <div className="Splash">
        <div className="container">
          <div className="title">
            <h2>Go</h2>
            <span>by Gangeya</span>
          </div>
          <div className="text">Choose game board size:</div>
          <div className="gameOptions">
            <div className="gBox" onClick={() => this.setBoardSize(9)}>
              <span>9x9</span>
            </div>
            <div className="gBox" onClick={() => this.setBoardSize(13)}>
              <span>13x13</span>
            </div>
            <div className="gBox" onClick={() => this.setBoardSize(19)}>
              <span>19x19</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
