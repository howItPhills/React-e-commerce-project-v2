import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "./../../contexts/ShopContext";
import ProductCard from "./../../components/ProductCard/ProductCard";

import "./category-page.scss";
import Preloader from "../../components/Preloader/Preloader";

const CategoryPage = () => {
  const { categoryTitle } = useParams();
  const { productsData } = useContext(ShopContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(productsData[categoryTitle]); // changes only when categoryTitle or productsData change - more efficient
  }, [categoryTitle, productsData]);

  // const products = productsData[categoryTitle] // Reinitialized every time component rerenders - not efficient

  if (!products) return <Preloader />; // or we can use *products?.map* solution (will have no spinning animation)
  return (
    <div className="category-page-container">
      <h2 className="category-page-title">{categoryTitle}</h2>
      <div className="category-products-container">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
