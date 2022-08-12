import React from "react";
import { Routes, Route } from "react-router-dom";
import ShopPage from "../../routes/Shop-page/ShopPage";
import Homepage from "../../routes/Home-page/Homepage";

import "./content.scss";
import Authentication from "./../../routes/Authentication/Authentication";
import PageNotFound from "../PageNotFound/PageNotFound";
import Checkout from "../../routes/Checkout-page/Checkout";
import CategoryPage from "../../routes/Category-page/CategoryPage";
import CategoriesPreview from "../../routes/Categories-preview/CategoriesPreview";

const Content = () => (
  <div className="content-container">
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="shop" element={<ShopPage />}>
        <Route index element={<CategoriesPreview />} />
        <Route path=":categoryTitle" element={<CategoryPage />} />
      </Route>
      <Route path="sign-in" element={<Authentication />} />
      <Route path="checkout" element={<Checkout />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  </div>
);

export default Content;
