import React, { Component } from "reactn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Emo from "../emo/emo";
import { emojiList } from "../emo/emoList";
import "./sideBar.scss";

export default class SideBar extends Component {
  state = {
    sideHidden: true
  };
  showShout = name => {
    const { sendShout } = this.props;
    console.log("TCL: SideBar -> name", name);
    this.setGlobal({
      shout: name
    });
    sendShout(name);
  };
  toggleSidebar = () => {
    this.setState(prevState => {
      return {
        sideHidden: prevState.sideHidden ? false : true
      };
    });
  };
  emojiGen = () => {
    const emojis = emojiList;
    const list = emojis.map((emoObj, i) => (
      <Emo
        key={i}
        label={emoObj.label}
        symbol={emoObj.symbol}
        click={() => this.showShout(`${emoObj.label}`)}
      />
    ));

    return list;
  };
  render() {
    const { sideHidden } = this.state;
    const list = this.emojiGen();
    return (
      <div className={`sideBar ${sideHidden ? "hidden" : ""}`}>
        <div className="sideButton" onClick={() => this.toggleSidebar()}>
          {sideHidden && (
            <FontAwesomeIcon icon={faExclamation} className="exc" />
          )}
          {!sideHidden && (
            <FontAwesomeIcon icon={faAngleRight} className="exc" />
          )}
        </div>
        <div className="emoContainer">{list}</div>
      </div>
    );
  }
}
