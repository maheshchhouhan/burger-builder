import * as types from "./Contact.types";

import { updateObject } from "../../../store/utils";

const INITIAL_STATE = {
  loading: false
};

const contactReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SET_LOADING:
      return updateObject(state, { loading: !state.loading });
    case types.RESET_ORDER:
      return updateObject(state, { ingredients: [], totalPrice: 0 });
    default:
      return state;
  }
};

export default contactReducer;
