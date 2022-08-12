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
