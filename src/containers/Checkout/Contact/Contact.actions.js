import * as types from "./Contact.types";

export const setLoading = () => ({
  type: types.SET_LOADING
});

export const resetOrder = () => ({
  type: types.RESET_ORDER
});

export const saveOrder = (order, history, token) => {
  return { type: types.SAVE_ORDER, order, history, token };
};
