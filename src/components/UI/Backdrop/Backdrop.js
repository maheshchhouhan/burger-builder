import React from "react";

import "./BackDrop.css";

const backDrop = ({ show, clicked }) =>
  show ? <div className="BackDrop" onClick={clicked}></div> : null;

export default backDrop;
