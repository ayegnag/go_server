import React from "react";
import { useSpring, animated, config } from "react-spring";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeaf } from "@fortawesome/free-solid-svg-icons";
import "./leaf.scss";

export default function Leaf() {
  const fall = useSpring({
    from: {
      transform: "rotate(90deg)",
      fontSize: "3em"
    },
    to: {
      fontSize: "2em",
      transform: "rotate(30deg)"
    },
    config: config.slow
  });
  return (
    <animated.div style={fall}>
      <FontAwesomeIcon icon={faLeaf} className="leaf" />
    </animated.div>
  );
}
