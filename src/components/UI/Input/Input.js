import React from "react";

import "./Input.css";

const input = props => {
  const {
    label,
    elementType,
    elementConfig,
    value,
    changed,
    isValid,
    isTouch
  } = props;

  let inputElement = null;

  switch (elementType) {
    case "input":
      inputElement = (
        <input
          className={
            !isValid && isTouch ? `InputElement error` : "InputElement"
          }
          onChange={changed}
          {...elementConfig}
          value={value}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={
            !isValid && isTouch ? `InputElement error` : "InputElement"
          }
          onChange={changed}
          {...elementConfig}
          value={value}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className={
            !isValid && isTouch ? `InputElement error` : "InputElement"
          }
          value={value}
          onChange={changed}
        >
          {elementConfig.options.map(el => (
            <option key={el.value} value={el.value}>
              {el.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className="InputElement"
          className={
            !isValid && isTouch ? `InputElement error` : "InputElement"
          }
          onChange={changed}
          {...elementConfig}
          value={value}
        />
      );
  }

  return (
    <div className="Input">
      <label className="Label">{label}</label>
      {inputElement}
    </div>
  );
};

export default input;
