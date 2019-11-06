import axios from "axios";
import { delay } from "redux-saga/effects";
import { put } from "redux-saga/effects";

import * as actions from "./Auth.actions";

export function* logoutSaga(action) {
  yield localStorage.removeItem("token");
  yield localStorage.removeItem("expirationDate");
  yield localStorage.removeItem("userId");
  yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(actions.logout());
}

export function* authenticateSaga({ email, password, isSignup }) {
  yield put(actions.authStart());

  const authData = {
    email: email,
    password: password,
    returnSecureToken: true
  };
  let url =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBxAe4NwzAy6JAdbJl_SculLV-AkvrU4Vw";

  if (!isSignup) {
    url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBxAe4NwzAy6JAdbJl_SculLV-AkvrU4Vw";
  }

  try {
    const response = yield axios.post(url, authData);

    const expirationDate = new Date(
      new Date().getTime() + response.data.expiresIn * 1000
    );
    yield localStorage.setItem(
      "token",
      "z8jkDpmU6uqlgSV7561QTNvjjoXZiWqRQoqec0Hs"
    );
    yield localStorage.setItem("userId", response.data.localId);
    yield localStorage.setItem("expirationDate", expirationDate);
    yield put(actions.authSuccess(response.data));
    yield put(actions.checkAuthTimeout(response.data.expiresIn));
  } catch (error) {
    yield put(actions.authFail(error.response.data.error));
  }
}

export function* authCheckStateSaga() {
  const token = localStorage.getItem("token");
  if (!token) {
    yield put(actions.logout());
  } else {
    const expirationDate = new Date(localStorage.getItem("expirationDate"));
    if (expirationDate > new Date()) {
      const userId = localStorage.getItem("userId");
      yield put(actions.authSuccess({ localId: token, idToken: userId }));
      yield put(
        actions.checkAuthTimeout(
          (expirationDate.getTime() - new Date().getTime()) / 1000
        )
      );
    } else {
      yield put(actions.logout());
    }
  }
}
