import React, { useContext } from "react";
import CustomButton from "../Custom-button/CustomButton";

import "./product-card.scss";
import { CartContext } from "./../../contexts/CartContext";

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;

  const { addNewItemToCart } = useContext(CartContext);
  const addProductHandler = () => addNewItemToCart(product);
  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={`${name}`} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">${price}</span>
      </div>
      <CustomButton onClick={addProductHandler} buttonType="inverted">
        Add to cart
      </CustomButton>
    </div>
  );
};

export default ProductCard;
