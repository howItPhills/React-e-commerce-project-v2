import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "./../Custom-button/CustomButton";

import { CartContext } from "./../../contexts/CartContext";
import CartItem from "./../Cart-item/CartItem";

import "./cart-dropdown.scss";

const CartDropdown = () => {
  const { cartItems, setIsHidden } = useContext(CartContext);
  const navigate = useNavigate();
  const goToCheckout = () => {
    navigate("checkout");
    setIsHidden();
  };
  return (
    <div className="cart-dropdown-container">
      {cartItems.length ? (
        <>
          <div className="cart-items">
            {cartItems.map((cartItem) => (
              <CartItem key={cartItem.id} cartItem={cartItem} />
            ))}
          </div>
          <CustomButton onClick={goToCheckout}>go to checkout</CustomButton>
        </>
      ) : (
        <span className="cart-dropdown-empty">Your cart is empty</span>
      )}
    </div>
  );
};

export default CartDropdown;
