import * as types from "./Orders.types";

import axios from "../../axios-orders";

export const fetchOrders = orders => ({
  type: types.FETCH_ORDERS,
  payload: orders
});

export const initOrders = (token, userId) => {
  const queryParams =
    "?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"';
  // console.log(queryParams);
  return dispatch => {
    axios.get(`/orders.json${queryParams}`).then(res => {
      if (!res) return;
      const fetchedOrders = [];
      for (let key in res.data) {
        fetchedOrders.push({
          ...res.data[key],
          id: key
        });
      }
      dispatch(fetchOrders(fetchedOrders));
    });
  };
};
