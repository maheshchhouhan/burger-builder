import React from "react";

import Modal from "../../components/UI/Modal/Modal";

import useHttpErrorHandlerHook from "../../hooks/httpErrorHandlerHook";

const withErrorHandler = (WrappedComponent, axios) => {
  return props => {
    const [error, clearError] = useHttpErrorHandlerHook(axios);

    return (
      <>
        <Modal clicked={clearError} show={error}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </>
    );
  };
};

export default withErrorHandler;
