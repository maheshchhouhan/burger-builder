import * as types from "./BurgerBuild.types";

import axios from "../../axios-orders";

export const addIngredient = ingredientName => ({
  type: types.ADD_INGREDIENT,
  payload: { ingredientName }
});

export const removeIngredient = ingredientName => ({
  type: types.REMOVE_INGREDIENT,
  payload: { ingredientName }
});

export const fetchIngredient = ingredients => ({
  type: types.FETCH_INGREDIENT,
  payload: ingredients
});

export const setError = error => ({
  type: types.SET_ERROR,
  payload: error
});

export const initIngredients = () => {
  return dispatch => {
    axios
      .get("https://burger-builder-4cf83.firebaseio.com/ingredients.json")
      .then(res => {
        dispatch(fetchIngredient(res.data));
      })
      .catch(error => {
        dispatch(setError(error));
      });
  };
};
