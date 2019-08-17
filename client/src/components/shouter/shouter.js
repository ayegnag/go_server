import React, { Component, useEffect, useState } from "reactn";
import { useTransition, animated } from "react-spring";
import Emo from "../emo/emo";
import { emojiList } from "../emo/emoList";
import "./shouter.scss";

function Shaker(props) {
  const { emoji } = props;
  const [emo, setEmo] = useState([]);
  const transitions = useTransition([emo], null, {
    from: { opacity: 0, fontSize: "0.8em" },
    enter: [
      { opacity: 1, fontSize: "1em" },
      { fontSize: "1.1em" },
      { fontSize: "1em" },
      { fontSize: "1.1em" },
      { fontSize: "1em" },
      { fontSize: "1.1em" },
      { fontSize: "1em" }
    ],
    leave: { opacity: 0, fontSize: "1.2em" },
    config: { duration: 200 }
  });

  // useCallback(() => {
  //   setEmo([emoji]);
  // }, [emoji]);
  useEffect(() => setEmo([emoji]), [emoji]);

  return transitions.map(({ item, key, props }) => {
    console.log(item, key, props);
    return (
      item[0] && (
        <animated.div key={key} style={{ ...props }}>
          <Emo label={item[0].label} symbol={item[0].symbol} />
        </animated.div>
      )
    );
  });
}

export default class Shouter extends Component {
  emoList = emoName => {
    if (!emoName) return null;
    return emojiList.find(o => o.label === emoName);
  };

  // on prop update, add emo to the list, and after a period, remove the element
  componentDidUpdate(prevProps, prevState) {
    if (this.props.name && prevProps.name !== this.props.name) {
      this.setState({ show: true });
      if (this.showTimer) clearTimeout(this.showTimer);
      this.showTimer = setTimeout(() => {
        this.setState({ show: false });
        this.setGlobal({ shout: false });
      }, 2000);
    }
  }
  render() {
    const { name } = this.props;
    const emoji = this.emoList(name);
    return (
      <div className="shouter">
        <Shaker emoji={emoji} />
      </div>
    );
  }
}
