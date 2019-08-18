import React from "react";
import "./chatBar.scss";

// const timeAgo = previous => {
//   const msPerMinute = 60 * 1000;
//   const msPerHour = msPerMinute * 60;
//   const msPerDay = msPerHour * 24;
//   const msPerMonth = msPerDay * 30;
//   const msPerYear = msPerDay * 365;

//   const elapsed = new Date().getTime() - previous;

//   if (elapsed < msPerMinute) {
//     return Math.round(elapsed / 1000) + " seconds ago";
//   } else if (elapsed < msPerHour) {
//     return Math.round(elapsed / msPerMinute) + " minutes ago";
//   } else if (elapsed < msPerDay) {
//     return Math.round(elapsed / msPerHour) + " hours ago";
//   } else if (elapsed < msPerMonth) {
//     return "approximately " + Math.round(elapsed / msPerDay) + " days ago";
//   } else if (elapsed < msPerYear) {
//     return "approximately " + Math.round(elapsed / msPerMonth) + " months ago";
//   } else {
//     return "approximately " + Math.round(elapsed / msPerYear) + " years ago";
//   }
// };

export default function ChatBubble(props) {
  const { message, thisPlayer, timeStamp } = props.msg;
  const bubbleSide = thisPlayer ? "right" : "left";
  return (
    <div className={`chatBubble ${bubbleSide}`}>
      <div className="message">{message}</div>
      <span className="ts">{new Date(timeStamp).toLocaleTimeString()}</span>
    </div>
  );
}
