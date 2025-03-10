import '../../assets/css/productsMain.css'
import React from "react";
import { IProduct } from "../../store/products";
import styled from "styled-components";
import { Category } from "../../constants/category"; // ✅ Category 가져오기

type ProductPreview = Pick<IProduct, "id" | "category" | "title" | "price" | "image">;

const ProductsMain = ({ products }: { products: ProductPreview[] }) => {
  // ✅ 카테고리별 그룹화
  const categoryMap = products.reduce((acc, product) => {
    let categoryKey = product.category;

    if (categoryKey === "women's clothing") return acc;

    const koreanCategory = Category[categoryKey] || categoryKey;

    if (!acc[koreanCategory]) acc[koreanCategory] = [];
    acc[koreanCategory].push(product);
    return acc;
  }, {} as Record<string, ProductPreview[]>);

  const categoryOrder = ['패션', '액세서리', '디지털'];
  const sortedCategories = Object.keys(categoryMap).sort(
    (a, b) => categoryOrder.indexOf(a) - categoryOrder.indexOf(b));

  // if (wid)

  return (
    <section className="container">
      {sortedCategories.map((category) => (
        <div className="category-section" key={category}>
          <h2 className="category-title">{category}</h2>

          {/* ✅ className으로 외부 CSS 적용 */}
          <div className="product-grid">
            {categoryMap[category].slice(0, 4).map((product) => (
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
