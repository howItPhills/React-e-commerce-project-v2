import React from "react";
import { useNavigate } from "react-router-dom";

import "./category.scss";

const Category = ({ title, imageUrl }) => {
  const navigate = useNavigate();
  return (
    <div
      className={`${
        title === "mens" || title === "womens" ? "large" : null
      } category-container`}
    >
      <div
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
        className="background-image"
      />
      <div
        className="category-body-container"
        onClick={() => navigate(`shop/${title}`)}
      >
        <h2>{title}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  );
};

export default Category;
