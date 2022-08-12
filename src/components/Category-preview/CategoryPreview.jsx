import React from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../ProductCard/ProductCard";
import CustomButton from "../Custom-button/CustomButton";

import "./category-preview.scss";

const CategoryPreview = ({ title, specificProduct }) => {
  const navigate = useNavigate();
  return (
    <div className="shop-preview-container">
      <h2 className="shop-preview-title">{title}</h2>
      <div className="shop-preview-products">
        {specificProduct
          .filter((_, index) => index < 4)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
      <div className="see-more-button">
        <CustomButton onClick={() => navigate(`${title}`)}>
          See more...
        </CustomButton>
      </div>
    </div>
  );
};

export default CategoryPreview;
