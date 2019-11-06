import { takeEvery, all } from "redux-saga/effects";

import {
  logoutSaga,
  checkAuthTimeoutSaga,
  authenticateSaga,
  authCheckStateSaga
} from "../containers/Auth/Auth.saga";

import * as authTypes from "../containers/Auth/Auth.types";

import { initIngredientsSaga } from "../containers/BurgerBuilder/BurgerBuilder.saga";

import * as burgerTypes from "../containers/BurgerBuilder/BurgerBuild.types";

import { saveOrderSaga } from "../containers/Checkout/Contact/Contact.saga";

import * as contactTypes from "../containers/Checkout/Contact/Contact.types";

import { initOrdersSaga } from "../containers/Orders/Orders.saga";

import * as orderTypes from "../containers/Orders/Orders.types";

export function* watchAuth() {
  yield all([
    takeEvery(authTypes.AUTH_INIT_LOGOUT, logoutSaga),
    takeEvery(authTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
    takeEvery(authTypes.AUTH_USER, authenticateSaga),
    takeEvery(authTypes.AUTH_CHECK_STATE, authCheckStateSaga)
  ]);
}

export function* watchBurger() {
  yield takeEvery(burgerTypes.INIT_INGREDIENTS, initIngredientsSaga);
}

export function* watchContact() {
  yield takeEvery(contactTypes.SAVE_ORDER, saveOrderSaga);
}

export function* watchOrder() {
  yield takeEvery(orderTypes.INIT_ORDERS, initOrdersSaga);
}
