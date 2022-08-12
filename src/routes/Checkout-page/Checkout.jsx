import React, { useContext } from "react";
import CheckoutItem from "../../components/Checkout-item/CheckoutItem";
import { CartContext } from "./../../contexts/CartContext";

import "./checkout.scss";

const Checkout = () => {
  const { cartItems, totalPrice } = useContext(CartContext);

  return (
    <div className="checkout-container">
      <div className="checkout-heading-container">
        <h3>Product</h3>
        <h3>Quantity</h3>
        <h3>Price</h3>
        <h3>Remove</h3>
      </div>
      {cartItems.map((cartItem) => (
        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
      ))}
      <div className="checkout-total-price">Total price: ${totalPrice}</div>
    </div>
  );
};

export default Checkout;
