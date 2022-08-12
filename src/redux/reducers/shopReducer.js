const INITIAL_STATE = {
  productsData: {},
};

const SHOP_ACTION_TYPES = {
  SET_PRODUCTS_DATA: "SET_PRODUCTS_DATA",
};

export const shopReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case SHOP_ACTION_TYPES.SET_PRODUCTS_DATA:
      return {
        ...state,
        productsData: payload,
      };
    default:
      return state;
  }
};
