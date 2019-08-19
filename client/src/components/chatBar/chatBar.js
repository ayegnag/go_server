import React, { Component } from "reactn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentAlt,
  faAngleDown,
  faEnvelope
} from "@fortawesome/free-solid-svg-icons";
import ChatBubble from "./chatBubble";
import "./chatBar.scss";

export default class ChatBar extends Component {
  constructor() {
    super();
    this.state = {
      chatHidden: true
    };
    this.chatInput = React.createRef();
    this.msgContainer = React.createRef();
  }

  toggleChatbar = () => {
    if (this.state.chatHidden) {
      this.setGlobal({
        newMsg: false
      });
    }
    this.setState(prevState => {
      return {
        chatHidden: prevState.chatHidden ? false : true
      };
    });
  };
  scrollToBottom = () => {
    const scrollHeight = this.msgContainer.current.scrollHeight;
    const height = this.msgContainer.current.clientHeight;
    const maxScrollTop = scrollHeight - height;
    this.msgContainer.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  };
  sendChat = () => {
    const msgVal = this.chatInput.current.value;
    console.log("TCL: ChatBar -> sendChat -> msgVal", msgVal);
    const { sendChat } = this.props;
    const ts = new Date().getTime();
    this.setGlobal(prevState => {
      return {
        msgQueue: [
          ...prevState.msgQueue,
          { message: msgVal, thisPlayer: true, timeStamp: ts }
        ]
      };
    });
    sendChat({ msg: msgVal, timeStamp: ts });
    this.chatInput.current.value = "";
  };
  handleKeyDown = e => {
    if (e.key === "Enter") {
      this.sendChat();
    }
  };
  componentDidUpdate() {
    if (this.global.newMsg && !this.state.chatHidden) {
      this.setGlobal({
        newMsg: false
      });
    }
    this.scrollToBottom();
  }
  render() {
    const { chatHidden } = this.state;
    const { msgQueue, newMsg } = this.global;
    return (
      <div className={`chatBar ${chatHidden ? "hidden" : ""}`}>
        <div
          className={`chatButton ${chatHidden && newMsg ? "new" : ""}`}
          onClick={() => this.toggleChatbar()}
        >
          {chatHidden && (
            <FontAwesomeIcon icon={faCommentAlt} className="exc" />
          )}
          {!chatHidden && (
            <FontAwesomeIcon icon={faAngleDown} className="exc" />
          )}
        </div>
        <div className="msgContainer" ref={this.msgContainer}>
          {msgQueue.map(msgObj => (
            <ChatBubble key={msgObj.timeStamp} msg={msgObj} />
          ))}
        </div>
        <div className="chatBox">
          <input
            ref={this.chatInput}
            maxLength={90}
            onKeyDown={this.handleKeyDown}
          />
          <button className="sendButton" onClick={() => this.sendChat()}>
            <FontAwesomeIcon icon={faEnvelope} className="exc" />
          </button>
        </div>
      </div>
    );
  }
}
