import React, { Component } from "react";

import "./Layout.css";

import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    showSideDrawer: false
  };

  SideDrawerHandler = () => {
    this.setState(oldState => {
      return { showSideDrawer: !oldState.showSideDrawer };
    });
  };

  render() {
    const { children } = this.props;
    return (
      <>
        <Toolbar openSideDrawer={this.SideDrawerHandler} />
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.SideDrawerHandler}
        />
        <main className="content">{children}</main>
      </>
    );
  }
}

export default Layout;
