import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 w-full bg-gradient-to-r from-white via-kare-50 to-white shadow-md z-50">
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-logo opacity-70"></div>
      <nav className="max-w-7xl mx-auto flex items-center justify-between p-4">
        {/* Left side: Logo/Brand */}
        <Link to="/" className="text-2xl font-bold font-serif">
          <span className="bg-clip-text text-transparent bg-gradient-logo">K-are</span>
        </Link>

        {/* Center: Nav Links (hidden on mobile) */}
        <ul className="hidden md:flex space-x-8 font-medium">
          <li>
            <Link to="/" className="text-kare-700 hover:text-teal-400 transition-colors duration-300">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="text-kare-700 hover:text-teal-400 transition-colors duration-300">
              About
            </Link>
          </li>
          <li>
            <Link to="/articles" className="text-kare-700 hover:text-teal-400 transition-colors duration-300">
              Blog
            </Link>
          </li>
          <li>
            <Link to="/contact" className="text-kare-700 hover:text-teal-400 transition-colors duration-300">
              Contact
            </Link>
          </li>
        </ul>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button 
            className="p-2 text-kare-600 hover:text-teal-400 transition-colors duration-300" 
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
        <ul className="flex flex-col space-y-3 px-4 pb-4 font-medium">
          <li>
            <Link 
              to="/" 
              className="block py-2 px-2 hover:bg-kare-50 rounded text-kare-700 hover:text-teal-400 transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              to="/about" 
              className="block py-2 px-2 hover:bg-kare-50 rounded text-kare-700 hover:text-teal-400 transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
          </li>
          <li>
            <Link 
              to="/articles" 
              className="block py-2 px-2 hover:bg-kare-50 rounded text-kare-700 hover:text-teal-400 transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
          </li>
          <li>
            <Link 
              to="/contact" 
              className="block py-2 px-2 hover:bg-kare-50 rounded text-kare-700 hover:text-teal-400 transition-colors duration-300"
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
