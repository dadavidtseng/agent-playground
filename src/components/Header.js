import React from 'react';
import './header.css';
import logo from '../assets/logo-final.svg';

export default function Header(){
  return (
    <header className="app-header" role="banner">
      <img src={logo} alt="Kādi project logo" className="logo" />
      <nav aria-label="Main navigation">
        <ul className="nav-list">
          <li><a href="#" className="nav-link">Home</a></li>
          <li><a href="#" className="nav-link">Docs</a></li>
          <li><a href="#" className="nav-link">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
}
