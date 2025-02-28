import React from 'react';

import './nav.css'
import styled from 'styled-components';
import { LiaShoppingBagSolid } from "react-icons/lia";
import { RxHamburgerMenu } from "react-icons/rx";
import { ImSun } from "react-icons/im";
import { BiMoon } from "react-icons/bi";

const CartIcon = LiaShoppingBagSolid as React.ElementType;
const HamBtnIcon = RxHamburgerMenu as React.ElementType;
const ImSunIcon = ImSun as React.ElementType;
const BiMoonIcon = BiMoon as React.ElementType;

export default function Nav() {

  const textHome = 'React Shop';
  const textFash = '패션';
  const textAcce = '액세서리';
  const textDigi = '디지털';

  return (
    <>
      <NavWrapper>
        <NavUl>
          <NavHamBtn>
            <HamBtnIcon size={24 } />
            {/* <img src={hamIcon} alt="아코디언 버튼" width={16} height={12} /> */}
            {/* <NavHamTitle>{textFash} {textAcce} {textDigi}
            </NavHamTitle> */}
          </NavHamBtn>
          <NavLi>{textHome}</NavLi>
          <NavLi>{textFash}</NavLi>
          <NavLi>{textAcce}</NavLi>
          <NavLi>{textDigi}</NavLi>

        </NavUl>


        <NavRight>
          <NavDayNight>

          </NavDayNight>
          <NavSearch>

          </NavSearch>
          <NavCart>
            <CartIcon size={24} />
          </NavCart>
        </NavRight>
      </NavWrapper>
    </>
  );
}

// background-color: #2a303c
const NavWrapper = styled.div`
  display: grid;
  grid-template-columns:1fr 2fr;
  grid-template-areas:
    'link search search';
  color: white;


  font-size: 1rem;
  line-height: 1.25rem;
  font-weight: bold;

`;

const NavUl = styled.ul`
  gird-area: link;


`;
const NavHamBtn = styled.span`

`;
const NavHamTitle = styled.a`

`;
const NavLi = styled.li`
background-color: #2a303c;

a {
  color: white;
  font-size: 15px;
}
`;
const NavRight = styled.div`
  gird-area: search;


`;
const NavDayNight = styled.div`

`;
const NavSearch = styled.div`

`;
const NavCart = styled.div`

`;
