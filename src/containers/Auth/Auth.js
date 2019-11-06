import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import "./Auth.css";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import * as actions from "./Auth.actions";
import Spinner from "../../components/UI/Spinner/Spinner";

const Auth = props => {
  const { onAuth, loading, error, isAuthenticated, authRedirectUrl } = props;

  const [signup, setSignUp] = useState(true);

  const [authForm, setAuthForm] = useState({
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Email"
      },
      validation: {
        required: true,
        isEmail: true
      },
      value: "",
      valid: false,
      touched: false
    },
    password: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Password"
      },
      validation: {
        required: true,
        minLength: 6
      },
      value: "",
      valid: false,
      touched: false
    }
  });

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

  const inputChangeHandler = (event, element) => {
    const updateElement = {
      value: event.target.value,
      valid: validate(event.target.value, authForm[element]["validation"]),
      touched: true
    };
    const updatedAuthForms = {
      ...authForm,
      [element]: {
        ...authForm[element],
        ...updateElement
      }
    };

    setAuthForm(updatedAuthForms);
  };

  const inputs = [];

  for (let key in authForm) {
    inputs.push(
      <Input
        key={key}
        elementType={authForm[key]["elementType"]}
        elementConfig={authForm[key]["elementConfig"]}
        value={authForm[key]["elementConfig"]["value"]}
        changed={event => inputChangeHandler(event, key)}
        isValid={authForm[key]["valid"]}
        isTouch={authForm[key]["touched"]}
      />
    );
  }

  if (isAuthenticated) {
    return <Redirect to={authRedirectUrl} />;
  }

  const submitHandler = event => {
    event.preventDefault();
    onAuth(authForm.email.value, authForm.password.value, signup);
  };

  const switchAuthMode = () => {
    setSignUp(prevSignUp => !prevSignUp);
  };

  return (
    <div className="Auth">
      {loading ? (
        <Spinner />
      ) : (
        <>
          {error ? (
            <p style={{ color: "red", fontSize: "12px" }}>{error}</p>
          ) : null}
          <form onSubmit={submitHandler}>
            {inputs}
            <Button btnType="Success">{signup ? "SIGNUP" : "SIGNIN"}</Button>
          </form>
          <Button clicked={switchAuthMode} btnType="Danger">
            SWITCH TO {signup ? "SIGNIN" : "SIGNUP"}
          </Button>
        </>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  loading: state.auth.loading,
  error: state.auth.error,
  isAuthenticated: state.auth.token !== null,
  authRedirectUrl: state.auth.authRedirectUrl
});

const mapDispatchToProps = dispatch => ({
  onAuth: (email, password, isSignup) =>
    dispatch(actions.authenticate(email, password, isSignup))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
