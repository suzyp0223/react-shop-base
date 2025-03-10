import React from 'react'
import '../../assets/css/productsView.css';

import { Category } from "../../constants/category"; // ✅ Category 가져오기
import { useRecoilValue } from 'recoil';
import { productsList } from '../../store/products';
import { ProductsMain } from './ProductsMain';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';


export default function ProductsView() {
  const { category } = useParams<{ category: string }>();
  const products = useRecoilValue(productsList);


  const categoryMap: Record<string, string> = {
    fashion: "패션",
    accessory: "액세서리",
    digital: "디지털",
  };
  const koreanCategory = category ? categoryMap[category] : "";

  const filteredProducts = products.filter((product) => Category[product.category] === koreanCategory);

  return (
    <section className="products-view">
      <TitleArrow className="page-title">
        <TitleLi className="page-titleLi">홈
          <LiArrow className="page-titleCategory">{koreanCategory}</LiArrow>
        </TitleLi>
      </TitleArrow>
      <ProductsMain products={filteredProducts} />
    </section>
  )

}


const TitleArrow = styled.h1`
    margin-left: 20px;
    list-style: none;
`;

const TitleLi = styled.li`
    display: flex;
`;
const LiArrow = styled.li`
    position: relative;
    padding-left: 1.3em;
    margin-left: 0.5rem;

    &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%) rotate(45deg);
        width: 0.375rem;
        height: 0.375rem;
        border-top: 1px solid black;
        border-right: 1px solid black;
        opacity: 0.4;
`;