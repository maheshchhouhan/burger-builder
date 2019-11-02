import { combineReducers } from "redux";

import burgerBuilderReducer from "../containers/BurgerBuilder/BurgerBuild.reducer";
import orderReducer from "../containers/Orders/Orders.reducers";
import contactReducer from "../containers/Checkout/Contact/Contact.reducer";
import authReducer from "../containers/Auth/Auth.reducers";

const rootReducer = combineReducers({
  burger: burgerBuilderReducer,
  order: orderReducer,
  contact: contactReducer,
  auth: authReducer
});

export default rootReducer;
