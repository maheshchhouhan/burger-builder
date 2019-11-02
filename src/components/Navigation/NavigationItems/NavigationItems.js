import React from "react";

import { connect } from "react-redux";
import Button from "../../UI/Button/Button";
import NavigationItem from "./NavigationItem/NavigationItem";

import * as actions from "../../../containers/Auth/Auth.actions";

import "./NavigationItems.css";

const navigationItems = props => {
  return (
    <ul className="NavigationItems">
      <NavigationItem link="/" exact>
        Burger Builder
      </NavigationItem>
      {props.isAuthenticated ? (
        <NavigationItem link="/orders">Orders</NavigationItem>
      ) : null}
      {!props.isAuthenticated ? (
        <NavigationItem link="/login">Authenticate</NavigationItem>
      ) : (
        <NavigationItem link="/logout">Logout</NavigationItem>
      )}
    </ul>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.userId
});

export default connect(mapStateToProps)(navigationItems);
