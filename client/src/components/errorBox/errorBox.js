import React, { Component } from "reactn";
import "./errorBox.scss";

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
    const { showError } = this.global;
    const { message, show } = showError;
    return (
      <>
        {show && (
          <div onClick={this.hideBox} className="errModal">
            {message}
          </div>
        )}
      </>
    );
  }
}
