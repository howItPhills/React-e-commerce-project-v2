import { SHOP_ACTION_TYPES } from "./shop.types";

const INITIAL_STATE = {
  productsData: {},
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
