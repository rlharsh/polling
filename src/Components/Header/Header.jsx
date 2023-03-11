import React from 'react'

import * as Icon from 'react-feather'
import { Outlet, Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import '../../assets/css/header.css'

const Header = () => {
    const navigate = useNavigate();
    const handleClick = () => navigate('/create');

  return (
    <header className='header animate__animated animate__fadeInDown'>
        <div className='header__logo'>
            <Icon.Globe className='accent header__icon' size={26}/>
                Poll.me
        </div>
        <nav className='header__nav'>
            <p className='accent animate__animated animate__fadeInDown animate__delay-1s'>Home</p>
            <p className='animate__animated animate__fadeInDown animate__delay-2s'>About</p>
            <p className='animate__animated animate__fadeInDown animate__delay-3s'>Privacy Policy</p>
        </nav>
        <div className='header__button animate__animated animate__tada animate__delay-1s animate__delay-4s'>
            <button className='button button__highlight' onClick={handleClick}>
                <Icon.PlusSquare size={26} /> Create a Poll
            </button>
        </div>
    </header>
  )
}

export default Header