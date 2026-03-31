// src/components/Navbar.jsx

import { useState } from "react";
import { NavLink } from "react-router-dom";
import { WiDaySunny } from "react-icons/wi";
import { FaMoon, FaSun, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleDark = () => {
    setDark(!dark);
    document.documentElement.classList.toggle("dark");
  };

  const linkClass = ({ isActive }) =>
    `px-4 py-2 rounded-lg transition ${
      isActive
        ? "bg-blue-500 text-white"
        : "text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
    }`;

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* Logo */}
        <h1 className="flex items-center gap-2 text-xl font-bold text-blue-600 dark:text-white">
          <WiDaySunny size={28} />
          Weather Dashboard
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-4 items-center">

          <NavLink to="/" className={linkClass}>
            Single Day
          </NavLink>

          <NavLink to="/Page2" className={linkClass}>
            Two Year Forecast
          </NavLink>

          {/* Dark Mode */}
          <button
            onClick={toggleDark}
            className="text-xl text-gray-700 dark:text-white"
          >
            {dark ? <FaSun /> : <FaMoon />}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-xl dark:text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
     {menuOpen && (
  <div className="md:hidden bg-white dark:bg-gray-900 px-4 pb-4 space-y-3">

    <NavLink
      to="/"
      onClick={() => setMenuOpen(false)}
      className={({ isActive }) =>
        `block w-full text-center py-2 rounded-lg ${
          isActive
            ? "bg-blue-500 text-white"
            : "text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800"
        }`
      }
    >
      Single Day
    </NavLink>

    <NavLink
      to="/Page2"
      onClick={() => setMenuOpen(false)}
      className={({ isActive }) =>
        `block w-full text-center py-2 rounded-lg ${
          isActive
            ? "bg-blue-500 text-white"
            : "text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800"
        }`
      }
    >
      Two Year Forecast
    </NavLink>

    <button
      onClick={toggleDark}
      className="w-full py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white flex justify-center items-center gap-2"
    >
      {dark ? <FaSun /> : <FaMoon />}
      Toggle Theme
    </button>
  </div>
)}
    </nav>
  );
};

export default Navbar;