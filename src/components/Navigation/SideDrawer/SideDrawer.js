import React from "react";

import "./SideDrawer.css";

import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import BackDrop from "../../UI/Backdrop/Backdrop";

const sideDrawer = props => {
  const { closed, open } = props;

  let attachedClasses = "Close";

  if (open) {
    attachedClasses = "Open";
  }

  return (
    <>
      <BackDrop show={open} clicked={closed} />
      <div className={`SideDrawer ${attachedClasses}`} onClick={closed}>
        <Logo height="11%" />
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </>
  );
};

export default sideDrawer;
