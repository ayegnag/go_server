import React from "react";
import { useSpring, animated, config } from "react-spring";
// import { Keyframes, animated } from "react-spring/renderprops";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "./star.scss";

// const Container = Keyframes.Spring(async next => {
//   while (true) {
//     await next({
//       from: { fontSize: "2em" },
//       fontSize: "4em"
//     });
//     await next({
//       from: { transform: "rotate(0)" },
//       transform: "rotate(360)"
//     });
//     // await delay(500);
//     await next({
//       from: { transform: "rotate(0)" },
//       transform: "rotate(360)",
//       fontSize: "2em"
//     });
//     // await delay(1000);
//   }
// });

export default function Star() {
  const spin = useSpring({
    from: {
      transform: "rotate(0deg)",
      fontSize: "1em"
    },
    to: {
      fontSize: "2em",
      transform: "rotate(360deg)"
    },
    config: config.slow
  });
  return (
    <animated.div style={spin}>
      <FontAwesomeIcon icon={faStar} className="star" />
    </animated.div>
  );
}
