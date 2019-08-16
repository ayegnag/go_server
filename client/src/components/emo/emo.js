import React from "react";

export default function Emo(props) {
  const { label, symbol, click } = props;
  return (
    <span
      className="emoji"
      role="img"
      aria-label={label}
      aria-hidden={label ? false : true}
      onClick={() => click()}
    >
      {symbol}
    </span>
  );
}
