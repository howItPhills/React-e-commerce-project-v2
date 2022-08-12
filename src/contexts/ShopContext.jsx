import React, { useEffect, useReducer } from "react";
import { createContext } from "react";
import { getCategoriesAndDocuments } from "../utils/firebase";
import { createAction } from "./../utils/createAction";

export const ShopContext = createContext({
  productsData: {},
});

const initialState = {
  productsData: {},
};

const SHOP_ACTION_TYPES = {
  SET_PRODUCTS_DATA: "SET_PRODUCTS_DATA",
};

const shopReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case SHOP_ACTION_TYPES.SET_PRODUCTS_DATA:
      return {
        ...state,
        productsData: payload,
      };
    default:
      throw new Error(`Unhandled action type ${type} in shop reducer `);
  }
};

export const ShopProvider = ({ children }) => {
  const [{ productsData }, dispatch] = useReducer(shopReducer, initialState);

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      dispatch(createAction(SHOP_ACTION_TYPES.SET_PRODUCTS_DATA, categoryMap));
    };

    getCategoriesMap();
  }, []);

  const value = { productsData };
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContext;
