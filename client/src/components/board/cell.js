import React, { Component } from "react";

export default class Cell extends Component {
  render() {
    const { styleName } = this.props;
    return (
      <div className="cell">
        <div className={styleName} />
      </div>
    );
  }
}
