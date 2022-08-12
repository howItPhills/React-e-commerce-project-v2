import React, { useContext } from "react";

import "./checkout-item.scss";
import { CartContext } from "./../../contexts/CartContext";

const CheckoutItem = ({ cartItem }) => {
  const { imageUrl, name, quantity, price, id } = cartItem;

  const { removeItemFromCart, decreaseCartItemQuantity, addNewItemToCart } =
    useContext(CartContext);

  const removeItemHandler = () => removeItemFromCart(id);
  const addCartItemHandler = () => addNewItemToCart(cartItem);
  const decreaseItemQuantityHandler = () => decreaseCartItemQuantity(cartItem);

  return (
    <div className="checkout-item-container">
      <div className="checkout-item-name">
        <div className="checkout-image-container">
          <img src={imageUrl} alt="checkout-item" />
        </div>
        <span>{name}</span>
      </div>
      <div className="checkout-quantity">
        <span className="checkout-click" onClick={decreaseItemQuantityHandler}>
          &#10094;
        </span>
        <span>{quantity}</span>
        <span className="checkout-click" onClick={addCartItemHandler}>
          &#10095;
        </span>
      </div>
      <span>${price * quantity}</span>
      <span className="checkout-click" onClick={removeItemHandler}>
        &#10005;
      </span>
    </div>
  );
};

export default CheckoutItem;
