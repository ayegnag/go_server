import React, { Component } from "reactn";
import { useTransition, animated } from "react-spring";
import Emo from "../emo/emo";
import "./shouter.scss";
// import delay from "delay";

function Shaker(props) {
  const { emoName, emoji } = props;
  const transitions = useTransition(emoName, null, {
    from: { position: "absolute", opacity: 0, fontSize: "2em" },
    enter: { opacity: 1, fontSize: "3em" },
    leave: { opacity: 0, fontSize: "4em" }
  });

  return transitions.map(
    ({ item, key, style }) =>
      item && (
        <animated.div key={key} style={style}>
          <Emo styleProp={style} label={emoName} symbol={emoji} />
        </animated.div>
      )
  );
}

export default class Shouter extends Component {
  // state = {
  //   show: false
  // };
  emoList = emoName => {
    const list = {
      beaming: "😁",
      sweat: "😅",
      what: "😐",
      tongue: "😝",
      cry: "😭",
      confounded: "😖"
    };
    return list[emoName];
  };

  // on prop update, add emo to the list, and after a period, remove the element
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.name !== this.props.name) {
      this.setState({ show: true });
      if (this.showTimer) clearTimeout(this.showTimer);
      this.showTimer = setTimeout(() => {
        this.setState({ show: false });
        this.setGlobal({ shout: false });
      }, 2500);
    }
  }
  render() {
    // const { show } = this.state;
    const { name } = this.props;
    const emo = this.emoList(name);
    return (
      <div className="shouter">
        <Shaker emoName={name} emoji={emo} />
      </div>
    );
  }
}
