import React from 'react'
import './footer.css';

import visaImg from "../../assets/img/svg/americanExpress.svg"
import masterImg from "../../assets/img/svg/master.svg";
import americanImg from "../../assets/img/svg/americanExpress.svg";
import paypalImg from "../../assets/img/svg/paypal.svg";
import dinersClubImg from "../../assets/img/svg/dinersClub.svg";
import discoverImg from "../../assets/img/svg/discover.svg";
import { GrFacebookOption } from "react-icons/gr";
import { LuInstagram } from "react-icons/lu";
import { IoLogoGithub } from "react-icons/io";


export default function Footer() {


  const Facebook = GrFacebookOption as React.ElementType;
  const Instagram = LuInstagram as React.ElementType;
  const Github = IoLogoGithub as React.ElementType;


  return (
    <>
      <footer className='footer'>
        <div className='footerGrid'>
          <a className='zeroLink' rel='noreferrer noopener external' href='https://zero-base.co.kr/' target="_blank">제로베이스</a>
        </div>
        <ul className='footerFlex'>
          <li><img src={visaImg} alt="Visa" /></li>
          <li><img src={masterImg} alt="Master" /></li>
          <li><img src={americanImg} alt="AmericanExpress" /></li>
          <li><img src={paypalImg} alt="Paypal" /></li>
          <li><img src={dinersClubImg} alt="DinersClub" /></li>
          <li><img src={discoverImg} alt="Discover" /></li>
        </ul>
        <div className='footerGrid link'>
          <a rel='noreferrer noopener external' className='facebook' href='https://www.facebook.com/0base' target='_blank'><Facebook size={24} /></a>
          <a rel='noreferrer noopener external' className='instagram' href='https://www.instagram.com/zerobase.official/#' target='_blank'><Instagram size={24} /></a>
          <a rel='noreferrer noopener external' className='git' href="https://github.com/suzyp0223?tab=repositories" target='_blank'><Github size={24} /></a>
        </div>
        <div><p>Copyright © 2022 Zero Base</p></div>
      </footer>
  </>
  )
}
