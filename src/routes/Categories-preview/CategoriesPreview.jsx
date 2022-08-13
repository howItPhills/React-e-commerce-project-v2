import React from "react";
import CategoryPreview from "../../components/Category-preview/CategoryPreview";
import { useSelector } from "react-redux";
import { selectProductsData } from "../../redux/shop/shop.selectors";

const CategoriesPreview = () => {
  const productsData = useSelector(selectProductsData);
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
