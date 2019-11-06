import * as types from "./Auth.types";

import { updateObject } from "../../store/utils";

const initialState = {
  loading: false,
  error: null,
  token: null,
  userId: null,
  authRedirectUrl: "/"
};

const authStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    userId: action.payload.localId,
    token: "z8jkDpmU6uqlgSV7561QTNvjjoXZiWqRQoqec0Hs",
    error: null,
    loading: false
  });
};

const authFail = (state, action) => {
  return updateObject(state, { error: action.payload.message, loading: false });
};

const authLogout = (state, action) => {
  return updateObject(state, { userId: null, token: null });
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.AUTH_START:
      return authStart(state, action);
    case types.AUTH_SUCCESS:
      return authSuccess(state, action);
    case types.AUTH_FAIL:
      return authFail(state, action);
    case types.AUTH_LOGOUT:
      return authLogout(state, action);
    case types.SET_AUTH_REDIRECT_URL:
      return updateObject(state, { authRedirectUrl: action.payload });
    case types.AUTH_INIT_LOGOUT:
      return updateObject(state, { authRedirectUrl: action.payload });
    default:
      return state;
  }
};

export default authReducer;
