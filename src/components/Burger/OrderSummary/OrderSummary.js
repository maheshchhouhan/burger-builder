import React, { Component } from "react";

import Button from "../../UI/Button/Button";

class OrderSummary extends Component {
  componentDidUpdate() {
    // console.log(`[OrderSummary] updated`);
  }

  render() {
    const {
      purchaseCancelled,
      purchaseContinue,
      totalPrice,
      ingredients
    } = this.props;

    const ingredientSummary = Object.keys(ingredients).map(
      (ingredient, idx) => {
        return (
          <li key={idx}>
            <span style={{ textTransform: "capitalize" }}>{ingredient}</span>:{" "}
            {ingredients[ingredient]}
          </li>
        );
      }
    );

    return (
      <>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>{ingredientSummary}</ul>
        <p>
          <strong>Total Price: ${totalPrice.toFixed(2)}</strong>
        </p>
        <p>Continue to Checkout?</p>
        <Button clicked={purchaseCancelled} btnType="Danger">
          CANCEL
        </Button>
        <Button clicked={purchaseContinue} btnType="Success">
          CONTINUE
        </Button>
      </>
    );
  }
}

export default OrderSummary;
