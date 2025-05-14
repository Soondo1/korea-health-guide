import { Link } from "react-router-dom";

export default function Navbar() {
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
            <Link to="/contact" className="hover:text-kare-600 transition-colors">
              Contact
            </Link>
          </li>
        </ul>

        {/* Mobile menu button - could be implemented further */}
        <div className="md:hidden">
          <button className="p-2 text-gray-600 hover:text-kare-600" aria-label="Open menu">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
}
