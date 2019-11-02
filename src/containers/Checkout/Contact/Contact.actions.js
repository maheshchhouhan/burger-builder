import * as types from "./Contact.types";

import axios from "../../../axios-orders";

export const setLoading = () => ({
  type: types.SET_LOADING
});

export const resetOrder = () => ({
  type: types.RESET_ORDER
});

export const saveOrder = (order, history, token) => {
  return dispatch => {
    dispatch(setLoading());
    axios
      .post(`/orders.json?auth=${token}`, order)
      .then(response => {
        dispatch(setLoading());
        dispatch(resetOrder());
        history.replace("/");
      })
      .catch(error => {
        dispatch(setLoading());
      });
  };
};
