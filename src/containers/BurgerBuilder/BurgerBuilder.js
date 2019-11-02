import React, { Component } from "react";

import { connect } from "react-redux";

import axios from "../../axios-orders";
import * as actions from "./BurgerBuilder.action";
import { setAuthRedirectUrl } from "../Auth/Auth.actions";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Modal from "../../components/UI/Modal/Modal";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

export class BurgerBuilder extends Component {
  state = {
    purchasing: false
  };

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      this.props.setAuthUrl("/checkout");
      this.props.history.push("/login");
    }
  };

  purchaseCancelledHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.history.push("/checkout");
  };

  componentDidMount() {
    this.props.fetchIngredients();
  }

  updatePurchaseState = () => {
    const ingredients = {
      ...this.props.ingredients
    };

    const sum = Object.keys(ingredients)
      .map(ingredient => ingredients[ingredient])
      .reduce((acc, el) => {
        return acc + el;
      }, 0);

    return sum > 0;
  };

  render() {
    const disabledInfo = {
      ...this.props.ingredients
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;

    let burger = this.props.error ? <p>{this.state.error}</p> : <Spinner />;

    if (this.props.ingredients) {
      burger = (
        <div>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            isAuth={this.props.isAuthenticated}
            ingredientAdded={this.props.onAddIngredient}
            ingredientRemoved={this.props.onRemoveIngredient}
            disabled={disabledInfo}
            price={this.props.price}
            purchaseable={this.updatePurchaseState()}
            ordered={this.purchaseHandler}
          />
        </div>
      );

      if (!this.state.loading) {
        orderSummary = (
          <OrderSummary
            ingredients={this.props.ingredients}
            purchaseCancelled={this.purchaseCancelledHandler}
            purchaseContinue={this.purchaseContinueHandler}
            totalPrice={this.props.price}
          />
        );
      }
    }

    return (
      <>
        <Modal
          modalCLosed={this.purchaseCancelledHandler}
          show={this.state.purchasing}
        >
          {orderSummary}
        </Modal>
        {burger}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burger.ingredients,
    price: state.burger.totalPrice,
    error: state.burger.error,
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddIngredient: ingredientName =>
      dispatch(actions.addIngredient(ingredientName)),
    onRemoveIngredient: ingredientName =>
      dispatch(actions.removeIngredient(ingredientName)),
    fetchIngredients: () => dispatch(actions.initIngredients()),
    setAuthUrl: url => dispatch(setAuthRedirectUrl(url))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
