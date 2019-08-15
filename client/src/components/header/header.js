import React, { Component } from "reactn";
import logo from "./goLogoS.svg";
import "./header.scss";

export default class Header extends Component {
  render() {
    const svgPath = `${logo}#svgView(preserveAspectRatio(xMidYMin meet))`;
    return (
      <div className="header">
        <div className="leftContainer" />
        <div className="logoContainer">
          <div className="titleContainer">
            <img
              className="logo"
              src={svgPath}
              onClick={this.screenMain}
              alt="Go: by Gangeya"
            />
          </div>
        </div>
        <div className="rightContainer">
          <div className="menuContainer" />
        </div>
      </div>
    );
  }
}
