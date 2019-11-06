import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./containers/App";
import * as serviceWorker from "./serviceWorker";

import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import {
  watchAuth,
  watchBurger,
  watchContact,
  watchOrder
} from "./store/RootSaga";

import rootReducer from "./store/RootReducer";

// const logger = store => {
//   return next => {
//     return action => {
//       console.log("[Middleware] Dispatching: ", action);
//       const result = next(action);
//       console.log("[Middleware] next state: ", store.getState());
//       return result;
//     };
//   };
// };

const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose;

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk, sagaMiddleware))
);

sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchBurger);
sagaMiddleware.run(watchContact);
sagaMiddleware.run(watchOrder);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
