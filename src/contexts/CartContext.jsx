import React, { useEffect, useReducer } from "react";
import { createContext } from "react";

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
  SET_IS_HIDDEN: "SET_IS_HIDDEN",
  SET_ITEM_COUNT: "SET_ITEM_COUNT",
  SET_TOTAL_PRICE: "SET_TOTAL_PRICE",
  ADD_ITEM_TO_CART: "ADD_ITEM_TO_CART",
  REMOVE_ITEM_FROM_CART: "REMOVE_ITEM_FROM_CART",
  DECREASE_CART_ITEM_QUANTITY: "DECREASE_CART_ITEM_QUANTITY",
};

const initialState = {
  cartItems: [],
  isHidden: true,
  itemCount: 0,
  totalPrice: 0,
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_IS_HIDDEN:
      return {
        ...state,
        isHidden: !state.isHidden,
      };
    case CART_ACTION_TYPES.ADD_ITEM_TO_CART:
      return {
        ...state,
        cartItems: addCartItem(state.cartItems, payload),
      };
    case CART_ACTION_TYPES.REMOVE_ITEM_FROM_CART:
      return {
        ...state,
        cartItems: removeCartItem(state.cartItems, payload),
      };
    case CART_ACTION_TYPES.DECREASE_CART_ITEM_QUANTITY:
      return {
        ...state,
        cartItems: decreaseQuantity(state.cartItems, payload),
      };
    case CART_ACTION_TYPES.SET_ITEM_COUNT:
      return {
        ...state,
        itemCount: payload,
      };
    case CART_ACTION_TYPES.SET_TOTAL_PRICE:
      return {
        ...state,
        totalPrice: payload,
      };
    default:
      throw new Error(`Unhandled type ${type} in Cart reudcer`);
  }
};

export const CartProvider = ({ children }) => {
  // const [isHidden, setIsHidden] = useState(true);
  // const [cartItems, setCartItems] = useState([]);
  // const [itemCount, setItemCount] = useState(0);
  // const [totalPrice, setTotalPrice] = useState(0); // context with usestate version

  const [{ cartItems, isHidden, totalPrice, itemCount }, dispatch] = useReducer(
    cartReducer,
    initialState
  );

  // React-context version of this function

  // const addNewItemToCart = (product) => {
  //   setCartItem(addCartItem(cartItems, product))
  // }

  // Redux version of this function
  const addNewItemToCart = (product) => {
    dispatch({
      type: CART_ACTION_TYPES.ADD_ITEM_TO_CART,
      payload: product,
    });
  };

  const removeItemFromCart = (removedItemId) => {
    dispatch({
      type: CART_ACTION_TYPES.REMOVE_ITEM_FROM_CART,
      payload: removedItemId,
    });
  };

  const decreaseCartItemQuantity = (product) => {
    dispatch({
      type: CART_ACTION_TYPES.DECREASE_CART_ITEM_QUANTITY,
      payload: product,
    });
  };

  const setIsHidden = () => dispatch({ type: CART_ACTION_TYPES.SET_IS_HIDDEN });

  useEffect(() => {
    const items = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);
    dispatch({ type: CART_ACTION_TYPES.SET_ITEM_COUNT, payload: items });
  }, [cartItems]);

  useEffect(() => {
    const total = cartItems.reduce(
      (acc, curr) => acc + curr.quantity * curr.price,
      0
    );
    dispatch({ type: CART_ACTION_TYPES.SET_TOTAL_PRICE, payload: total });
  }, [cartItems]);

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
