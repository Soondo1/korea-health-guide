import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 w-full bg-white shadow-sm z-50">
      <nav className="max-w-7xl mx-auto flex items-center justify-between p-4">
        {/* Left side: Logo/Brand */}
        <Link to="/" className="text-2xl font-bold text-kare-700 font-serif">
          K-are
        </Link>

        {/* Center: Nav Links (hidden on mobile) */}
        <ul className="hidden md:flex space-x-8 text-gray-700 font-medium">
          <li>
            <Link to="/" className="hover:text-kare-600 transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-kare-600 transition-colors">
              About
            </Link>
          </li>
          <li>
            <Link to="/articles" className="hover:text-kare-600 transition-colors">
              Blog
            </Link>
          </li>
          <li>
            <Link to="/bulletin-board" className="hover:text-kare-600 transition-colors">
              Bulletin
            </Link>
          </li>
          <li>
            <Link to="/calendar" className="hover:text-kare-600 transition-colors">
              Calendar
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-kare-600 transition-colors">
              Contact
            </Link>
          </li>
        </ul>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button 
            className="p-2 text-gray-600 hover:text-kare-600" 
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu - shown when menu is open */}
      <div 
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col space-y-3 px-4 pb-4 text-gray-700 font-medium">
          <li>
            <Link 
              to="/" 
              className="block py-2 px-2 hover:bg-gray-100 rounded hover:text-kare-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              to="/about" 
              className="block py-2 px-2 hover:bg-gray-100 rounded hover:text-kare-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
          </li>
          <li>
            <Link 
              to="/articles" 
              className="block py-2 px-2 hover:bg-gray-100 rounded hover:text-kare-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
          </li>
          <li>
            <Link 
              to="/bulletin-board" 
              className="block py-2 px-2 hover:bg-gray-100 rounded hover:text-kare-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Bulletin
            </Link>
          </li>
          <li>
            <Link 
              to="/calendar" 
              className="block py-2 px-2 hover:bg-gray-100 rounded hover:text-kare-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Calendar
            </Link>
          </li>
          <li>
            <Link 
              to="/contact" 
              className="block py-2 px-2 hover:bg-gray-100 rounded hover:text-kare-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
