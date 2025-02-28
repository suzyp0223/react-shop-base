import React, { useState } from 'react';

import './nav.css'
import { LiaShoppingBagSolid } from "react-icons/lia";
import { RxHamburgerMenu } from "react-icons/rx";
import { ImSun } from "react-icons/im";
import { BiMoon } from "react-icons/bi";


const HamBtnIcon = RxHamburgerMenu as React.ElementType;
const CartIcon = LiaShoppingBagSolid as React.ElementType;
const ImSunIcon = ImSun as React.ElementType;
const BiMoonIcon = BiMoon as React.ElementType;

export default function Nav() {
  const [search, setSearch] = useState('');

  const textHome = 'React Shop';
  const textFash = '패션';
  const textAcce = '액세서리';
  const textDigi = '디지털';

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };


  return (
    <>
      <div className=" NavWrapper">
        <ul className=" NavUl">
          <div className=" NavHamBtn">
            <HamBtnIcon size={24} />
            {/* <img src={hamIcon} alt="아코디언 버튼" width={16} height={12} /> */}
            {/* <a className={NavHamTitle}>{textFash} {textAcce} {textDigi}
            </a> */}
          </div>
          <li className="NavLi">{textHome}</li>
          <li className="NavLi">{textFash}</li>
          <li className="NavLi">{textAcce}</li>
          <li className="NavLi">{textDigi}</li>

        </ul>


        <div className=" NavRight">
          <div className=" NavDayNight">

          </div>
          <input className=" NavSearch" type="text" value={search} onChange={handleChange} placeholder='검색' />

          <div className=" NavCart">
            <CartIcon size={24} />
          </div>
        </div>
      </div>
    </>
  );
}
