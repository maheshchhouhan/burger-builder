import React, { useEffect } from "react";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import asynComponent from "../hoc/asyncComponent/asyncComponent";

import { authCheckState } from "./Auth/Auth.actions";

/*Components*/
import Layout from "../components/Layout/Layout";
import BurgerBuilder from "./BurgerBuilder/BurgerBuilder";

const asynCheckout = asynComponent(() => {
  return import("./Checkout/Checkout");
});

const asynLogout = asynComponent(() => {
  return import("./Logout/Logout");
});

const asynOrders = asynComponent(() => {
  return import("../containers/Orders/Orders");
});

const asynAuth = asynComponent(() => {
  return import("./Auth/Auth");
});

const App = props => {
  useEffect(() => {
    // Component did mount lifecycle
    props.autoLoginUser();
  }, []);

  let routes = (
    <Switch>
      <Route path="/" exact component={BurgerBuilder} />
      <Route path="/login" component={asynAuth} />
      <Redirect to="" />
    </Switch>
  );

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/login" component={asynAuth} />
        <Route path="/logout" component={asynLogout} />
        <Route path="/checkout" component={asynCheckout} />
        <Route path="/orders" component={asynOrders} />
      </Switch>
    );
  }

  return (
    <BrowserRouter>
      <Layout>{routes}</Layout>
    </BrowserRouter>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null
});

const mapDispatchToProps = dispatch => ({
  autoLoginUser: () => dispatch(authCheckState())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
