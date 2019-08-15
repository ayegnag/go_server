import React, { Component } from "reactn";
import "./errorBox.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

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
    const { showError, gameOver } = this.global;
    const { message, show } = showError;
    return (
      <>
        {show && (
          <div onClick={this.hideBox} className="errModal">
            {gameOver && <FontAwesomeIcon icon={faStar} className="star" />}
            {message}
          </div>
        )}
      </>
    );
  }
}
