import * as types from "./Orders.types";

import { updateObject } from "../../store/utils";

const INITIAL_STATE = {
  orders: [],
  loading: true
};

const ordersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.FETCH_ORDERS:
      return updateObject(state, { orders: action.payload, loading: false });

    default:
      return state;
  }
};

export default ordersReducer;
