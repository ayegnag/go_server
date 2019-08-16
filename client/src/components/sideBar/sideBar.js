import React, { Component } from "reactn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";
import Emo from "../emo/emo";
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
  render() {
    const { sideHidden } = this.state;
    return (
      <div className={`sideBar ${sideHidden ? "hidden" : ""}`}>
        <div className="sideButton" onClick={() => this.toggleSidebar()}>
          <FontAwesomeIcon icon={faExclamation} className="exc" />
        </div>
        <div className="emoContainer">
          <Emo
            label="beaming "
            symbol="😁"
            click={() => this.showShout("beaming")}
          />
          <Emo
            label="beaming sweat"
            symbol="😅"
            click={() => this.showShout("sweat")}
          />
          <Emo
            label="squint tongue "
            symbol="😝"
            click={() => this.showShout("tongue")}
          />
          <Emo label="what " symbol="😐" click={() => this.showShout("what")} />
          <Emo
            label="cry loud "
            symbol="😭"
            click={() => this.showShout("cry")}
          />
          <Emo
            label="confounded "
            symbol="😖"
            click={() => this.showShout("confounded")}
          />
        </div>
      </div>
    );
  }
}
