import React, { useEffect, Suspense } from "react";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { authCheckState } from "./Auth/Auth.actions";

/*Components*/
import Layout from "../components/Layout/Layout";
import BurgerBuilder from "./BurgerBuilder/BurgerBuilder";

const Checkout = React.lazy(() => {
  return import("./Checkout/Checkout");
});

const Logout = React.lazy(() => {
  return import("./Logout/Logout");
});

const Orders = React.lazy(() => {
  return import("../containers/Orders/Orders");
});

const Auth = React.lazy(() => {
  return import("./Auth/Auth");
});

const App = props => {
  const { autoLoginUser } = props;

  useEffect(() => {
    // Component did mount lifecycle
    autoLoginUser();
  }, [autoLoginUser]);

  let routes = (
    <Switch>
      <Route path="/" exact component={BurgerBuilder} />
      <Route path="/login" render={props => <Auth {...props} />} />
      <Redirect to="" />
    </Switch>
  );

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/login" render={props => <Auth {...props} />} />
        <Route path="/logout" render={() => <Logout />} />
        <Route path="/checkout" render={props => <Checkout {...props} />} />
        <Route path="/orders" render={() => <Orders />} />
      </Switch>
    );
  }

  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
      </Layout>
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
