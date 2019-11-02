import * as types from "./BurgerBuild.types";

import { updateObject, calculateTotalPrice } from "../../store/utils";

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 2,
  cheese: 1,
  meat: 1.3
};

const INITIAL_STATE = {
  ingredients: null,
  totalPrice: 0,
  error: false
};

const burgerBuilderReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.ADD_INGREDIENT:
      const updatedIngredient = {
        [action.payload.ingredientName]:
          state.ingredients[action.payload.ingredientName] + 1
      };

      const updatedIngredients = updateObject(
        state.ingredients,
        updatedIngredient
      );

      const updatedState = {
        ingredients: updatedIngredients,
        totalPrice:
          state.totalPrice + INGREDIENT_PRICES[action.payload.ingredientName]
      };

      return updateObject(state, updatedState);
    case types.REMOVE_INGREDIENT:
      const updatedIngredientRemove = {
        [action.payload.ingredientName]:
          state.ingredients[action.payload.ingredientName] - 1
      };

      const updatedIngredientsRemove = updateObject(
        state.ingredients,
        updatedIngredientRemove
      );

      const updatedStateRemove = {
        ingredients: updatedIngredientsRemove,
        totalPrice:
          state.totalPrice - INGREDIENT_PRICES[action.payload.ingredientName]
      };

      return updateObject(state, updatedStateRemove);

    case types.FETCH_INGREDIENT:
      const totalPrice = calculateTotalPrice(action.payload, INGREDIENT_PRICES);

      return updateObject(state, {
        ingredients: action.payload,
        totalPrice: totalPrice
      });

    case types.SET_ERROR:
      return updateObject(state, { error: action.payload });
    default:
      return state;
  }
};

export default burgerBuilderReducer;
