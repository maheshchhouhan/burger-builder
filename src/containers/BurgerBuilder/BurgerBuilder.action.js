import * as types from "./BurgerBuild.types";

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
  return { type: types.INIT_INGREDIENTS };
};
