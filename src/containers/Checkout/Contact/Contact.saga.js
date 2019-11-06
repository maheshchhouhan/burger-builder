import { put } from "redux-saga/effects";
import axios from "../../../axios-orders";

import * as actions from "./Contact.actions";

export function* saveOrderSaga({ token, order, history }) {
  yield put(actions.setLoading());
  try {
    yield axios.post(`/orders.json?auth=${token}`, order);
    yield put(actions.setLoading());
    yield put(actions.resetOrder());
    yield history.replace("/");
  } catch (error) {
    yield put(actions.setLoading());
  }
}
