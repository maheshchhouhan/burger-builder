import React from "react";

import "./Modal.css";

import BackDrop from "../Backdrop/Backdrop";

const Modal = props => {
  const { children, show, modalCLosed } = props;

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
};

export default React.memo(
  Modal,
  (prevProps, nextProps) =>
    nextProps.show === prevProps.show &&
    nextProps.children === prevProps.children
);
