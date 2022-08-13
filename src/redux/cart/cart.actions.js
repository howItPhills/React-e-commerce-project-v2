import { CART_ACTION_TYPES } from "./cart.types";
import { createAction } from "./../../utils/createAction";

export const setIsHidden = () =>
  createAction(CART_ACTION_TYPES.TOGGLE_IS_HIDDEN, null);

export const setCartItems = (newCartItems) => {
  const newItemCount = newCartItems.reduce(
    (acc, curr) => acc + curr.quantity,
    0
  );
  const newTotalPrice = newCartItems.reduce(
    (acc, curr) => acc + curr.quantity * curr.price,
    0
  );
  createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
    cartItems: newCartItems,
    itemCount: newItemCount,
    totalPrice: newTotalPrice,
  });
};
