import { setCartItems } from "./cart.actions";
import { CART_ACTION_TYPES } from "./cart.types";

const INITIAL_STATE = {
  cartItems: [],
  isHidden: true,
  itemCount: 0,
  totalPrice: 0,
};

const addCartItem = (cartItems, newProduct) => {
  const existingItem = cartItems.find((item) => item.id === newProduct.id);
  if (existingItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === newProduct.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  return [...cartItems, { ...newProduct, quantity: 1 }];
};

const removeCartItem = (cartItems, removedCartItemId) => {
  return cartItems.filter((cartItem) => cartItem.id !== removedCartItemId);
};

const decreaseQuantity = (cartItems, product) => {
  const targetItem = cartItems.find((item) => item.id === product.id);

  if (targetItem) {
    if (targetItem.quantity === 1) {
      return cartItems.filter((cartItem) => cartItem.id !== targetItem.id);
    }
    return cartItems.map((cartItem) => {
      return cartItem.id === targetItem.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem;
    });
  }
};

export const addNewItemToCart = (product) => {
  setCartItems(addCartItem(INITIAL_STATE.cartItems, product));
};

export const removeItemFromCart = (removedItemId) => {
  // setCartItems(removeCartItem(cartItems, removedItemId));
};

export const decreaseCartItemQuantity = (product) => {
  // setCartItems(decreaseQuantity(cartItems, product));
};

export const cartReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.TOGGLE_IS_HIDDEN:
      return {
        ...state,
        isHidden: !state.isHidden,
      };
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};
