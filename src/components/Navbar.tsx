
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
            <Link to="/bulletin" className="hover:text-kare-600 transition-colors">
              Bulletin
            </Link>
          </li>
        </ul>

        {/* Right side is now empty - all icons removed */}
        <div className="flex items-center">
          {/* Intentionally left empty */}
        </div>
      </nav>
    </header>
  );
}
