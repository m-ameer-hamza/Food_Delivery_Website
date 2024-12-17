import { createStore, combineReducers } from "redux";
import { authReducer } from "./authSlice";
import { userReducer } from "./userSlice";
import { cartReducer } from "./cartSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
});

const store = createStore(rootReducer);

export default store;
