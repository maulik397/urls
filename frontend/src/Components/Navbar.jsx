import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';

function Navbar({ user }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const logout = () => {
    window.open("https://us.maulikdalwadi.tech/auth/logout", "_self");
  };

  return (
    <div className="Navbar flex items-center justify-between h-16 text-white px-4 bg-gray-800">
      <span className="logo text-lg font-bold"><Link to="/">URL-Shortner</Link></span>
      <button className="menu-toggle block md:hidden" onClick={toggleMenu}>
        <div className="w-6 h-1 bg-white mb-1"></div>
        <div className="w-6 h-1 bg-white mb-1"></div>
        <div className="w-6 h-1 bg-white"></div>
      </button>

      <ul className={`list md:flex md:items-center md:static absolute w-full top-16 left-0 bg-gray-800 transition-transform transform ${menuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:w-auto`}>
        {user ? (
          <>
            <li className="listItem px-4 py-2">
              <img src={user.profileImage} alt="" className="avatar w-8 h-8 rounded-full object-cover" />
            </li>
            <li className="listItem px-4 py-2">{user.username}</li>
            <li className="listItem px-4 py-2"><Link to='/'>Home</Link></li>
            <li className="listItem px-4 py-2" onClick={logout}>Logout</li>
          </>
        ) : (
          <>
            <li className="listItem px-4 py-2">
              <img src='https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg' alt="" className="avatar w-8 h-8 rounded-full object-cover" />
            </li>
            <li className="listItem px-4 py-2">John Doe</li>
            <li className="listItem px-4 py-2"><Link to='/'>Home</Link></li>
            <li className="listItem px-4 py-2"><Link to='/login'>Login</Link></li>
          </>
        )}
      </ul>
    </div>
  );
}

export default Navbar;
