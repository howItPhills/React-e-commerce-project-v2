import React, { useContext } from "react";

import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";

import "./cart-icon.scss";
import { CartContext } from "./../../contexts/CartContext";

const CartIcon = ({ setIsHidden }) => {
  const { itemCount } = useContext(CartContext);
  return (
    <div className="cart-icon-container" onClick={() => setIsHidden()}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{itemCount}</span>
    </div>
  );
};

export default CartIcon;
