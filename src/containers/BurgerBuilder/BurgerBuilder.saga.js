import axios from "../../axios-orders";
import { put } from "redux-saga/effects";

import * as actions from "./BurgerBuilder.action";

export function* initIngredientsSaga() {
  try {
    const res = yield axios.get(
      "https://burger-builder-4cf83.firebaseio.com/ingredients.json"
    );
    yield put(actions.fetchIngredient(res.data));
  } catch (error) {
    yield put(actions.setError(error));
  }
}
