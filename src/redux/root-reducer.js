import { combineReducers } from "redux";
import { cartReducer } from "./reducers/cartReducer";
import { userReducer } from "./user/user.reducer";
import { shopReducer } from "./reducers/shopReducer";

export const rootReducer = combineReducers({
  cart: cartReducer,
  user: userReducer,
  shop: shopReducer,
});
