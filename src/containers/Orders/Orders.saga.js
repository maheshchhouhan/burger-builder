import { put } from "redux-saga/effects";
import axios from "../../axios-orders";

import * as actions from "./Orders.actions";

export function* initOrdersSaga({ queryParams }) {
  const res = yield axios.get(`/orders.json${queryParams}`);
  if (!res) return;
  const fetchedOrders = [];
  for (let key in res.data) {
    fetchedOrders.push({
      ...res.data[key],
      id: key
    });
  }
  yield put(actions.fetchOrders(fetchedOrders));
}
