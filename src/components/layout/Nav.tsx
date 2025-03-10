import React, { useState, useEffect, useRef } from 'react';

import '../../assets/css/nav.css'
import { LiaShoppingBagSolid } from "react-icons/lia";
import { RxHamburgerMenu } from "react-icons/rx";
import { ImSun } from "react-icons/im";
import { BiMoon } from "react-icons/bi";

import CartButton from '../carts/CartButton';

export const HamBtnIcon = RxHamburgerMenu as React.ElementType;
export const CartIcon = LiaShoppingBagSolid as React.ElementType;
const ImSunIcon = ImSun as React.ElementType;
const BiMoonIcon = BiMoon as React.ElementType;

export default function Nav() {
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark" //기존 설정 유지
  });

  const accordionRef = useRef<HTMLDivElement>(null);

  const textHome = 'React Shop';
  const textFash = '패션';
  const textAcce = '액세서리';
  const textDigi = '디지털';

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const isNavToggle = () => {
    setIsOpen(true);
  }

  // 아코디언 자동감지
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (accordionRef.current && !accordionRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    // 이벤트 리스너 추가
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // 컴포넌트 언마운트 시 이벤트 제거
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 창 크기 변경에 따른 동작
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1025 && isOpen) {
        setIsOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // light/ dark 모드 변경
  const isDarkMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("theme", newMode ? "dark" : "light"); // 상태를 로컬스토리지에 저장
      return newMode;
    });
  };

  useEffect(() => {
    const drawerContent = document.querySelector(".drawer-content") as HTMLElement;
    if (drawerContent) {
      if (isOpen) {
        drawerContent.classList.add('open');
      } else {
        drawerContent.classList.remove('open');
      }
    }
  }, [isOpen]);

  useEffect(() => {
    const drawerContent = document.querySelector(".drawer-content") as HTMLElement;
    const navWrapper = document.querySelector(".NavWrapper") as HTMLElement;
    const navHamBtn = document.querySelector(".NavHamBtn") as HTMLElement;
    const navSearch = document.querySelector(".NavSearch") as HTMLElement;
    const navToggleLi = document.querySelectorAll(".NavToggleLi") as NodeListOf<HTMLElement>;

    const darkModeColor = "#374151";
    const darkSearchColor = "#4b5563";
    const lightgrayColor = "#e5e7eb";

    if (drawerContent) {
      if (darkMode) {
        drawerContent.style.backgroundColor = "#161923";
        navWrapper.style.color = "white";
        navHamBtn.style.backgroundColor = darkModeColor;
        navHamBtn.style.color = "white";
        navSearch.style.backgroundColor = darkSearchColor;
        navSearch.style.outline = "none";
      } else {
        navToggleLi.forEach((li) => {
          li.addEventListener("mouseover", () => {
            li.style.backgroundColor = lightgrayColor;
          });
          li.addEventListener("mouseout", () => {
            li.style.backgroundColor = ''; // 원래 스타일로 되돌리기
          });
        });

        drawerContent.style.backgroundColor = "white";
        navWrapper.style.color = darkModeColor;
        navHamBtn.style.backgroundColor = "white";
        navSearch.style.backgroundColor = lightgrayColor;
        navSearch.style.border = lightgrayColor;
        navHamBtn.style.color = darkModeColor;
      }
    }
  }, [darkMode]);

  return (
    <>
      <nav className=" NavWrapper ">
        {/* 왼쪽 메뉴 */}
        <ul className=" NavUl">

          <button onClick={isNavToggle} className="lg:hidden">
            <HamBtnIcon size={24} />
          </button>
          <div ref={accordionRef} className={`NavHamBtn  ${isOpen ? "block" : ""} lg:block`}>

            <ul className="NavToggle">
              <li className="NavToggleLi"><a href="#">{textFash}</a></li>
              <li className="NavToggleLi"><a href="#">{textAcce}</a></li>
              <li className="NavToggleLi"><a href="#">{textDigi}</a></li>
            </ul>
          </div>

          <li className="NavLi"><a href="#">{textHome}</a></li>
          <li className="NavLi"><a href="#">{textFash}</a></li>
          <li className="NavLi"><a href="#">{textAcce}</a></li>
          <li className="NavLi"><a href="#">{textDigi}</a></li>
        </ul>


        {/* 오른쪽 메뉴 */}
        <div className=" NavRight">
          <div className=" NavDayNight" onClick={isDarkMode} style={{ cursor: "pointer", color: darkMode ? "white" : "#161923" }}>
            {darkMode ? <ImSunIcon size={24} /> : <BiMoonIcon size={24} />}
          </div>
          <input className=" NavSearch" type="text" value={search} onChange={handleChange} placeholder='검색' />
          <CartButton />
        </div>
      </nav >
    </>
  );
}
