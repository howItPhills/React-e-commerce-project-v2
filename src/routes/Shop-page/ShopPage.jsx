import React from "react";
import { Outlet } from "react-router-dom";

import "./shop-page.scss";

const ShopPage = () => {
  return (
    <div className="shop-container">
      <Outlet />
    </div>
  );
};

export default ShopPage;
