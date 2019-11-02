import React, { useState, useEffect } from "react";

import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import Contact from "./Contact/Contact";

const Checkout = props => {
  const [loading, setLoading] = useState(false);

  const checkoutCancelHandler = () => {
    props.history.push("/");
  };

  const checkoutContinueHandler = () => {
    props.history.replace("/checkout/contact");
  };

  useEffect(() => {
    // ComponentDidMount LifeCycle
  }, []);

  let summary = <Redirect to="/" />;

  if (props.ingredients) {
    summary = (
      <>
        <CheckoutSummary
          loading={loading}
          checkoutCancel={checkoutCancelHandler}
          checkoutContinue={checkoutContinueHandler}
          ingredients={props.ingredients}
        />
      </>
    );
  }

  return (
    <>
      {summary}
      <Route path={`${props.match.path}/contact`} component={Contact} />
    </>
  );
};

const mapStateToProps = state => {
  return {
    ingredients: state.burger.ingredients
  };
};

export default connect(mapStateToProps)(Checkout);
