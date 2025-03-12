import '../../assets/css/productsMain.css'
import React from "react";

import { IProduct } from "../../store/products";
import { Category } from "../../constants/category"; // ✅ Category 가져오기
import { Link } from 'react-router-dom';
import { MENUS } from '../../constants/category';

type ProductPreview = Pick<IProduct, "id" | "category" | "title" | "price" | "image">;

const ProductsMain = ({ products }: { products: ProductPreview[] }) => {
  // ✅ 카테고리별 그룹화
  const categoryMap = products.reduce((acc, product) => {
    let categoryKey = product.category;

    if (["men's clothing", "women's clothing"].includes(categoryKey)) {
      categoryKey = "패션";
    } else if (categoryKey === 'jewelery') {
      categoryKey = Category.jewelery;
    } else if (categoryKey === 'electronics') {
      categoryKey = Category.electronics;
    }

    if (!acc[categoryKey]) acc[categoryKey] = [];
    acc[categoryKey].push(product);
    return acc;
  }, {} as Record<string, ProductPreview[]>);


  return (
    <section className="container">
      {Object.keys(categoryMap).map((category) => (
        <div className="category-section" key={category}>
          <h2 className="category-title">{category}</h2>

          <div className="product-grid">
            {category === "패션"
              ? categoryMap[category]
                .sort((a, b) => {
                  if (a.category === "men's clothing" && b.category === "women's clothing") return -1;
                  if (a.category === "women's clothing" && b.category === "men's clothing") return 1;
                  return 0;
                }).map((product) => (
                  <Link className="product-card" key={product.id} to={`/product/${product.id}`}>
                    <div className="img-wrap">
                      <img src={product.image} alt={product.title} className="product-img" />
                    </div>
                    <div className="text-box">
                      <p className="text-title">{product.title}</p>
                      <p className="text-price">${Math.round(Number(product.price.toLocaleString()))}</p>
                    </div>
                  </Link>
                ))
              : categoryMap[category].map((product) => (
                <Link className="product-card" key={product.id} to={`/product/${product.id}`}>
                  <div className="img-wrap">
                    <img src={product.image} alt={product.title} className="product-img" />
                  </div>
                  <div className="text-box">
                    <p className="text-title">{product.title}</p>
                    <p className="text-price">${Math.round(Number(product.price.toLocaleString()))}</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      ))}
    </section>
  );
};


export { ProductsMain };
