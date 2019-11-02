import React from "react";

import { NavLink } from "react-router-dom";

const NavigationItem = props => {
  const { link, children, exact } = props;
  return (
    <>
      <li className="NavigationItem">
        <NavLink exact={exact} to={link}>
          {children}
        </NavLink>
      </li>
    </>
  );
};

export default NavigationItem;
