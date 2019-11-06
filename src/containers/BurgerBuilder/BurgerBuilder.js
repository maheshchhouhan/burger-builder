import React, { useState, useEffect, useCallback } from "react";

import { useDispatch, useSelector } from "react-redux";

import axios from "../../axios-orders";
import * as actions from "./BurgerBuilder.action";
import { setAuthRedirectUrl } from "../Auth/Auth.actions";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Modal from "../../components/UI/Modal/Modal";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const BurgerBuilder = props => {
  const [purchasing, setPurchasing] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const fetchIngredients = useCallback(() => {
    dispatch(actions.initIngredients());
  }, [dispatch]);

  const ingredients = useSelector(state => state.burger.ingredients);

  const price = useSelector(state => state.burger.totalPrice);

  const error = useSelector(state => state.burger.error);

  const isAuthenticated = useSelector(state => state.auth.token !== null);

  const onAddIngredient = ingredientName =>
    dispatch(actions.addIngredient(ingredientName));
  const onRemoveIngredient = ingredientName =>
    dispatch(actions.removeIngredient(ingredientName));

  const setAuthUrl = url => dispatch(setAuthRedirectUrl(url));

  const purchaseHandler = () => {
    if (isAuthenticated) {
      setPurchasing(true);
    } else {
      setAuthUrl("/checkout");
      props.history.push("/login");
    }
  };

  const purchaseCancelledHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    props.history.push("/checkout");
  };

  useEffect(() => {
    fetchIngredients();
  }, [fetchIngredients]);

  const updatePurchaseState = () => {
    const sum = Object.keys(ingredients)
      .map(ingredient => ingredients[ingredient])
      .reduce((acc, el) => {
        return acc + el;
      }, 0);

    return sum > 0;
  };

  const disabledInfo = {
    ...ingredients
  };

  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

  let orderSummary = null;

  let burger = props.error ? <p>{props.error}</p> : <Spinner />;

  if (ingredients) {
    burger = (
      <div>
        <Burger ingredients={ingredients} />
        <BuildControls
          isAuth={isAuthenticated}
          ingredientAdded={onAddIngredient}
          ingredientRemoved={onRemoveIngredient}
          disabled={disabledInfo}
          price={price}
          purchaseable={updatePurchaseState()}
          ordered={purchaseHandler}
        />
      </div>
    );

    if (!loading) {
      orderSummary = (
        <OrderSummary
          ingredients={ingredients}
          purchaseCancelled={purchaseCancelledHandler}
          purchaseContinue={purchaseContinueHandler}
          totalPrice={price}
        />
      );
    }
  }

  return (
    <>
      <Modal modalCLosed={purchaseCancelledHandler} show={purchasing}>
        {orderSummary}
      </Modal>
      {burger}
    </>
  );
};

export default withErrorHandler(BurgerBuilder, axios);
