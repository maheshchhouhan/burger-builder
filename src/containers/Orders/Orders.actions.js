import * as types from "./Orders.types";

export const fetchOrders = orders => ({
  type: types.FETCH_ORDERS,
  payload: orders
});

export const initOrders = (token, userId) => {
  const queryParams =
    "?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"';
  return { type: types.INIT_ORDERS, queryParams };
};
