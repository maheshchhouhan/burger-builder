import React from "react";

import "./Button.css";

const button = ({ children, clicked, btnType, disabled, style = null }) => (
  <button
    style={style}
    disabled={disabled}
    className={`Button ${btnType}`}
    onClick={clicked}
  >
    {children}
  </button>
);

export default button;
