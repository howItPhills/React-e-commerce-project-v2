import React, { useReducer } from "react";
import { createContext } from "react";
import { createAction } from "../utils/createAction";

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

export const CartContext = createContext({
  cartItems: [],
  isHidden: true,
  itemCount: 0,
  totalPrice: 0,
  setIsHidden: () => {},
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  decreaseCartItemQuantity: () => {},
});

const CART_ACTION_TYPES = {
  SET_CART_ITEMS: "SET_CART_ITEMS",
  TOGGLE_IS_HIDDEN: "TOGGLE_IS_HIDDEN",
};

const INITIAL_STATE = {
  cartItems: [],
  isHidden: true,
  itemCount: 0,
  totalPrice: 0,
};

const cartReducer = (state, action) => {
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
      throw new Error(`Unhandled type ${type} in Cart reudcer`);
  }
};

export const CartProvider = ({ children }) => {
  const [{ cartItems, isHidden, totalPrice, itemCount }, dispatch] = useReducer(
    cartReducer,
    INITIAL_STATE
  );

  // React-context version of this function

  // const addNewItemToCart = (product) => {
  //   setCartItem(addCartItem(cartItems, product))
  // }

  // Redux version of this function
  const addNewItemToCart = (product) => {
    setCartItems(addCartItem(cartItems, product));
  };

  const removeItemFromCart = (removedItemId) => {
    setCartItems(removeCartItem(cartItems, removedItemId));
  };

  const decreaseCartItemQuantity = (product) => {
    setCartItems(decreaseQuantity(cartItems, product));
  };

  const setIsHidden = () =>
    dispatch(createAction(CART_ACTION_TYPES.TOGGLE_IS_HIDDEN, null));

  //Helper-function for reducer
  const setCartItems = (newCartItems) => {
    const newItemCount = newCartItems.reduce(
      (acc, curr) => acc + curr.quantity,
      0
    );
    const newTotalPrice = newCartItems.reduce(
      (acc, curr) => acc + curr.quantity * curr.price,
      0
    );
    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartItems: newCartItems,
        itemCount: newItemCount,
        totalPrice: newTotalPrice,
      })
    );
  };

  const value = {
    isHidden,
    setIsHidden,
    cartItems,
    itemCount,
    totalPrice,
    addNewItemToCart,
    removeItemFromCart,
    decreaseCartItemQuantity,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
