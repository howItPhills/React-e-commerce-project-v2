import React from "react";
import { useContext } from "react";
import CategoryPreview from "../../components/Category-preview/CategoryPreview";
import { ShopContext } from "../../contexts/ShopContext";

const CategoriesPreview = () => {
  const { productsData } = useContext(ShopContext);
  return (
    <>
      {Object.keys(productsData).map((title) => (
        <CategoryPreview
          key={title}
          title={title}
          specificProduct={productsData[title]}
        />
      ))}
    </>
  );
};

export default CategoriesPreview;
