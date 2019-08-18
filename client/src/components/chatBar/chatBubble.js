import React from "react";
import "./chatBar.scss";

export default function ChatBubble(props) {
  const { message, thisPlayer } = props.msg;
  const bubbleSide = thisPlayer ? "right" : "left";
  return (
    <div className={`chatBubble ${bubbleSide}`}>
      <div className="message">{message}</div>
    </div>
  );
}
