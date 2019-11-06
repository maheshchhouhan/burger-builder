import React, { useState } from "react";

import "./Layout.css";

import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

const Layout = props => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const SideDrawerHandler = () => {
    setShowSideDrawer(!showSideDrawer);
  };

  const { children } = props;
  return (
    <>
      <Toolbar openSideDrawer={SideDrawerHandler} />
      <SideDrawer open={showSideDrawer} closed={SideDrawerHandler} />
      <main className="content">{children}</main>
    </>
  );
};

export default Layout;
