import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentAlt, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import "./chatBar.scss";
export default class ChatBar extends Component {
  state = {
    chatHidden: true
  };
  toggleChatbar = () => {
    this.setState(prevState => {
      return {
        chatHidden: prevState.chatHidden ? false : true
      };
    });
  };
  render() {
    const { chatHidden } = this.state;
    return (
      <div className={`chatBar ${chatHidden ? "hidden" : ""}`}>
        <div className="chatButton" onClick={() => this.toggleChatbar()}>
          {chatHidden && (
            <FontAwesomeIcon icon={faCommentAlt} className="exc" />
          )}
          {!chatHidden && (
            <FontAwesomeIcon icon={faAngleDown} className="exc" />
          )}
        </div>
        <div className="chatBox">
          <input />
        </div>
      </div>
    );
  }
}
