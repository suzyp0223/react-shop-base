import '../../assets/css/productsMain.css'
import React from "react";

import { IProduct } from "../../store/products";
import { Category } from "../../constants/category"; // ✅ Category 가져오기

import styled from "styled-components";

type ProductPreview = Pick<IProduct, "id" | "category" | "title" | "price" | "image">;

const ProductsMain = ({ products }: { products: ProductPreview[] }) => {
  // ✅ 카테고리별 그룹화
  const categoryMap = products.reduce((acc, product) => {
    let categoryKey = product.category;
    const fashionCategory =  ["men's clothing", "women's clothing"];
    if (fashionCategory.includes(categoryKey)) {
      categoryKey = "패션";
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

          {/* ✅ className으로 외부 CSS 적용 */}
          <div className="product-grid">
            {category === "패션"
              ? categoryMap[category]
                .sort((a, b) => {
                  if (a.category === "men's clothing" && b.category === "women's clothing") return -1;
                  if (a.category === "women's clothing" && b.category === "men's clothing") return 1;
                  return 0;
                }).map((product) => (
                  <div className="product-card" key={product.id}>
                    <div className="img-wrap">
                      <img src={product.image} alt={product.title} className="product-img" />
                    </div>
                    <div className="text-box">
                      <p className="text-title">{product.title}</p>
                      <p className="text-price">${Math.round(Number(product.price.toLocaleString()))}</p>
                    </div>
                  </div>
                ))
              : categoryMap[category].map((product) => (
              <a className="product-card" key={product.id}>
                <div className="img-wrap">
                  <img src={product.image} alt={product.title} className="product-img" />
                </div>
                <div className="text-box">
                  <p className="text-title">{product.title}</p>
                  <p className="text-price">${Math.round(Number(product.price.toLocaleString()))}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};


export { ProductsMain };
