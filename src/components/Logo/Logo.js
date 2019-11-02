import React from "react";

import burgerLogo from "../../assets/images/burger-logo.png";

import "./Logo.css";

const logo = ({ height }) => (
  <div className="Logo" style={{ height: height }}>
    <img src={burgerLogo} alt="Burger Builder" />
  </div>
);

export default logo;
