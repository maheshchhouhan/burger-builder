import * as types from "./Auth.types";

export const authStart = () => ({
  type: types.AUTH_START
});

export const authSuccess = authData => ({
  type: types.AUTH_SUCCESS,
  payload: authData
});

export const authFail = error => ({
  type: types.AUTH_FAIL,
  payload: error
});

export const logout = () => {
  return { type: types.AUTH_INIT_LOGOUT };
};

export const logoutSucceed = () => {
  return { type: types.AUTH_LOGOUT };
};

export const checkAuthTimeout = expirationTime => {
  return {
    type: types.AUTH_CHECK_TIMEOUT,
    expirationTime: expirationTime
  };
};

export const setAuthRedirectUrl = url => ({
  type: types.SET_AUTH_REDIRECT_URL,
  payload: url
});

export const authenticate = (email, password, isSignup) => {
  return { type: types.AUTH_USER, email, password, isSignup };
};

export const authCheckState = () => {
  return { type: types.AUTH_CHECK_STATE };
};
