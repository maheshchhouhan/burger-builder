import React from "react";

import "./CheckoutSummary.css";

import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import Spinner from "../../UI/Spinner/Spinner";

const CheckoutSummary = props => {
  const { ingredients, checkoutCancel, checkoutContinue, loading } = props;

  let checkoutSummary = <Spinner />;

  if (!loading) {
    checkoutSummary = (
      <div className="CheckoutSummary">
        <h1>We hope it tastes well!</h1>
        <div style={{ width: "100%", margin: "auto" }}>
          <Burger ingredients={ingredients} />
        </div>
        <Button clicked={checkoutCancel} btnType="Danger">
          CANCEL
        </Button>
        <Button clicked={checkoutContinue} btnType="Success">
          CONTINUE
        </Button>
      </div>
    );
  }

  return checkoutSummary;
};

export default CheckoutSummary;
