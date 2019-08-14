import React, { Component } from "reactn";

const MainContext = React.createContext();

export default class mainConttext extends Component {
  render() {
    return <MainContext.Provider>{children}</MainContext.Provider>;
  }
}
