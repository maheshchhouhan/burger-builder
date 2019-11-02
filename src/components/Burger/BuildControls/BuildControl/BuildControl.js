import React from "react";

import "./BuildControl.css";

const buildControl = props => {
  const { label, added, removed, disabled } = props;
  return (
    <div className="BuildControl">
      <div>{label}</div>
      <button className="Less" disabled={disabled} onClick={removed}>
        Less
      </button>
      <button className="More" onClick={added}>
        More
      </button>
    </div>
  );
};

export default buildControl;
