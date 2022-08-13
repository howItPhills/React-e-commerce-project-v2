import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";

import { getCategoriesAndDocuments } from "./../../utils/firebase";
import { setProductsData } from "./../../redux/shop/shop.actions";
import { useDispatch } from "react-redux";

import "./shop-page.scss";

const ShopPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      dispatch(setProductsData(categoryMap));
    };

    getCategoriesMap();
  }, []);

  return (
    <div className="shop-container">
      <Outlet />
    </div>
  );
};

export default ShopPage;
