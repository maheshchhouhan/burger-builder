import React, { Component } from "react";

import "./Modal.css";

import BackDrop from "../Backdrop/Backdrop";

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.show !== this.props.show ||
      nextProps.children !== this.props.children
    );
  }

  componentDidUpdate() {
    // console.log(`[Modal.js] updated`);
  }

  render() {
    const { children, show, modalCLosed } = this.props;

    return (
      <>
        <BackDrop show={show} clicked={modalCLosed} />
        <div
          style={{
            transform: show ? "translateY(0)" : "translateY(-100vh)",
            opacity: show ? "1" : "0"
          }}
          className="Modal"
        >
          {children}
        </div>
      </>
    );
  }
}

export default Modal;
