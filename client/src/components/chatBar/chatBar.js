import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentAlt,
  faAngleDown,
  faPaperPlane
} from "@fortawesome/free-solid-svg-icons";
import ChatBubble from "./chatBubble";
import "./chatBar.scss";

export default class ChatBar extends Component {
  constructor() {
    super();
    this.state = {
      chatHidden: true,
      msgQueue: []
    };
    this.chatInput = React.createRef();
    this.msgContainer = React.createRef();
  }

  toggleChatbar = () => {
    this.setState(prevState => {
      return {
        chatHidden: prevState.chatHidden ? false : true
      };
    });
  };
  sendChat = () => {
    const msgVal = this.chatInput.current.value;
    console.log("TCL: ChatBar -> sendChat -> msgVal", msgVal);
    const { sendChat } = this.props;
    this.setState(prevState => {
      return {
        msgQueue: [...prevState.msgQueue, { message: msgVal, thisPlayer: true }]
      };
    });
    sendChat(msgVal);
    this.chatInput.current.value = "";
    this.msgContainer.current.scrollTop = this.msgContainer.current.scrollHeight;
  };
  handleKeyDown = e => {
    if (e.key === "Enter") {
      this.sendChat();
    }
  };
  render() {
    const { chatHidden, msgQueue } = this.state;
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
        <div className="msgContainer" ref={this.msgContainer}>
          {msgQueue.map(msgObj => (
            <ChatBubble msg={msgObj} />
          ))}
        </div>
        <div className="chatBox">
          <input
            ref={this.chatInput}
            maxLength={30}
            onKeyDown={this.handleKeyDown}
          />
          <button className="sendButton" onClick={() => this.sendChat()}>
            <FontAwesomeIcon icon={faPaperPlane} className="exc" />
          </button>
        </div>
      </div>
    );
  }
}
