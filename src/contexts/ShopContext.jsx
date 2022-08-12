import React, { useEffect } from "react";
import { createContext } from "react";
import { useState } from "react";
import { getCategoriesAndDocuments } from "../utils/firebase";

export const ShopContext = createContext({
  productsData: {},
});

export const ShopProvider = ({ children }) => {
  const [productsData, setProductsData] = useState({});

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      setProductsData(categoryMap);
    };

    getCategoriesMap();
  }, []);

  const value = { productsData, setProductsData };
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContext;
