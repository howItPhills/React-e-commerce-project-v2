import React, { useEffect, useReducer } from "react";
import { createContext } from "react";
import { useState } from "react";
import { getCategoriesAndDocuments } from "../utils/firebase";

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
  // const [productsData, setProductsData] = useState({});
  const [{ productsData }, dispatch] = useReducer(shopReducer, initialState);

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      // setProductsData(categoryMap); // Context version
      dispatch({
        type: SHOP_ACTION_TYPES.SET_PRODUCTS_DATA,
        payload: categoryMap,
      });
    };

    getCategoriesMap();
  }, []);

  const value = { productsData };
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContext;
