import React, { useEffect } from "react";
import { connect } from "react-redux";

import { Redirect } from "react-router-dom";
import * as actions from "../../containers/Auth/Auth.actions";

const Logout = props => {
  useEffect(() => {
    props.onLogout();
  }, []);

  return <Redirect to="/" />;
};

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(actions.logout())
});

export default connect(
  null,
  mapDispatchToProps
)(Logout);
