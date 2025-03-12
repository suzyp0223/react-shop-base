import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { MENUS } from '../../constants/category';

export const ProductsTitle = () => {
  const { category } = useParams<{ category: string }>();


  const categoryMap: Record<string, string> = {
    fashion: "패션",
    accessory: "액세서리",
    digital: "디지털",
  };
  const koreanCategory = category ? categoryMap[category] : "";


  return (
    <section className="products-view">
      <TitleLi className="page-titleLi" >
        {MENUS.HOME}
        <TitleArrow className="page-title">
          <LiArrow className="page-titleCategory">{koreanCategory}</LiArrow>
        </TitleArrow>
      </TitleLi>
    </section>
  );

};


const TitleLi = styled.li`
    display: flex;
    margin-left: 1rem;
`;
const TitleArrow = styled.h1`
    margin-left: 1px;
    list-style: none;
`;

export const LiArrow = styled.li`
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