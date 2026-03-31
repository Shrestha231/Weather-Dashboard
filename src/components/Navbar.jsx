// src/components/Navbar.jsx

import { useState } from "react";
import { WiDaySunny } from "react-icons/wi";
import { FaMoon, FaSun, FaBars } from "react-icons/fa";

const Navbar = ({ page, setPage }) => {
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // toggle dark mode
  const toggleDark = () => {
    setDark(!dark);
    document.documentElement.classList.toggle("dark");
  };

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

          <button
            onClick={() => setPage(1)}
            className={`px-4 py-2 rounded-lg transition ${
              page === 1
                ? "bg-blue-500 text-white"
                : "text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            Page 1
          </button>

          <button
            onClick={() => setPage(2)}
            className={`px-4 py-2 rounded-lg transition ${
              page === 2
                ? "bg-blue-500 text-white"
                : "text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            Page 2
          </button>

          {/* Dark Mode Toggle */}
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
          <FaBars />
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 p-4 space-y-3">

          <button
            onClick={() => {
              setPage(1);
              setMenuOpen(false);
            }}
            className="block w-full text-left text-gray-700 dark:text-gray-200"
          >
            Page 1
          </button>

          <button
            onClick={() => {
              setPage(2);
              setMenuOpen(false);
            }}
            className="block w-full text-left text-gray-700 dark:text-gray-200"
          >
            Page 2
          </button>

          <button
            onClick={toggleDark}
            className="flex items-center gap-2 text-gray-700 dark:text-white"
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