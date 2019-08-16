import React, { Component } from "reactn";
import "./errorBox.scss";
import Star from "./spinStar/star";
import Leaf from "./fallLeaf/leaf";

export default class ErrorBox extends Component {
  hideBox = () => {
    this.setGlobal({
      showError: {
        show: false,
        message: ""
      }
    });
  };
  escFunction = event => {
    if (event.keyCode === 27) {
      this.hideBox();
      //Do whatever when esc is pressed
    }
  };
  componentDidMount() {
    document.addEventListener("keydown", this.escFunction, false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.escFunction, false);
  }
  render() {
    const { showError, gameOver, thisPlayerStone, winner } = this.global;
    const { message, show } = showError;
    return (
      <>
        {show && (
          <div onClick={this.hideBox} className="errModal">
            {gameOver && thisPlayerStone === winner && <Star />}
            {gameOver && thisPlayerStone !== winner && <Leaf />}
            {message}
          </div>
        )}
      </>
    );
  }
}
