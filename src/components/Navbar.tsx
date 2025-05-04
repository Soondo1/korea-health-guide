
import { Link } from "react-router-dom";
import { Search, Plus, User, Bell } from "lucide-react";

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
        </ul>

        {/* Right side: Icons (removed search and sign-in) */}
        <div className="flex items-center space-x-4">
          <button aria-label="Add Content" className="p-1.5 rounded-full hover:bg-gray-100">
            <Plus className="h-5 w-5 text-gray-600" />
          </button>
          <button aria-label="Profile" className="p-1.5 rounded-full hover:bg-gray-100">
            <User className="h-5 w-5 text-gray-600" />
          </button>
          <button aria-label="Notifications" className="p-1.5 rounded-full hover:bg-gray-100">
            <Bell className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </nav>
    </header>
  );
}
