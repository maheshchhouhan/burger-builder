import React, { useState } from "react";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import "./Contact.css";

import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import * as actions from "./Contact.actions";

const ContactData = props => {
  const { ingredients, price, loading, saveOrder, token, userId } = props;

  const [formIsValid, setFormIsValid] = useState(false);

  const validate = (value, rules) => {
    let isValid = false;
    // debugger;
    if (rules.required) {
      isValid = value.trim() !== "";
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength;
    }

    if (rules.maxLength) {
      isValid =
        value.length <= rules.maxLength && value.length >= rules.minLength;
    }

    return isValid;
  };

  const inputChangeHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...orderForm
    };

    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier]
    };

    const updatedFormConfig = {
      ...updatedFormElement["elementConfig"]
    };

    updatedFormConfig.value = event.target.value;
    updatedOrderForm[inputIdentifier]["elementConfig"] = updatedFormConfig;
    updatedOrderForm[inputIdentifier]["valid"] = validate(
      event.target.value,
      updatedOrderForm[inputIdentifier]["validation"]
    );
    updatedOrderForm[inputIdentifier]["touched"] = true;

    let formValid = true;
    for (let key in updatedOrderForm) {
      if (!updatedOrderForm[key]["valid"]) {
        formValid = false;
      }
    }
    setFormIsValid(formValid);
    setOrderForm(updatedOrderForm);
  };

  const [orderForm, setOrderForm] = useState({
    name: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your Name",
        value: ""
      },
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    email: {
      elementType: "email",
      elementConfig: {
        type: "text",
        placeholder: "Your Email",
        value: ""
      },
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    street: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Street",
        value: ""
      },
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    zipCode: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Zip Code",
        value: ""
      },
      validation: {
        required: true,
        minLength: 5,
        maxLength: 5
      },
      valid: false,
      touched: false
    },
    country: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Country",
        value: ""
      },
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    deliveryMethod: {
      elementType: "select",
      elementConfig: {
        options: [
          { value: "fastest", displayValue: "Fastet" },
          { value: "cheapest", displayValue: "Cheapest" }
        ],
        value: "fastest"
      },
      valid: true,
      touched: false,
      validation: {
        required: true
      }
    }
  });

  const orderHandler = e => {
    e.preventDefault();
    const formData = {};

    for (let key in orderForm) {
      formData[key] = orderForm[key]["elementConfig"]["value"];
    }

    const order = {
      ingredients: ingredients,
      price: price,
      customer: formData,
      userId: userId
    };
    // setLoading(true);
    saveOrder(order, props.history, token);
  };

  const inputs = [];

  for (let el in orderForm) {
    inputs.push(
      <Input
        key={el}
        elementType={orderForm[el]["elementType"]}
        elementConfig={orderForm[el]["elementConfig"]}
        value={orderForm[el]["elementConfig"]["value"]}
        changed={event => inputChangeHandler(event, el)}
        isValid={orderForm[el]["valid"]}
        isTouch={orderForm[el]["touched"]}
      />
    );
  }

  let form = (
    <form onSubmit={orderHandler}>
      {inputs}
      <Button disabled={!formIsValid} btnType="Success">
        ORDER
      </Button>
    </form>
  );

  if (loading) {
    form = <Spinner />;
  }

  return (
    <div className="Contact">
      <h4>Enter your Contact Data</h4>
      {form}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    ingredients: state.burger.ingredients,
    price: state.burger.totalPrice,
    loading: state.contact.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => ({
  saveOrder: (order, history, token) =>
    dispatch(actions.saveOrder(order, history, token))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ContactData));
