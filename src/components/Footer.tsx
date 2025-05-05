import React from 'react';
import { Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t mt-16 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <div className="text-xl font-bold text-kare-700 font-serif">K-are</div>
            <p className="mt-2 text-sm text-gray-500">
              Helping foreigners navigate Korean healthcare
            </p>
            
            {/* Social Media Links */}
            <div className="flex mt-4 space-x-4">
              <a 
                href="https://www.instagram.com/karekoreahealth/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-kare-600"
                aria-label="K-are Instagram Page"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://www.linkedin.com/company/k-are/posts/?feedView=all" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-kare-600"
                aria-label="K-are LinkedIn Page"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-800 tracking-wider uppercase mb-2">
                Resources
              </h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-600 hover:text-kare-600">Guides</a></li>
                <li><a href="#" className="text-gray-600 hover:text-kare-600">Hospital Directory</a></li>
                <li><a href="#" className="text-gray-600 hover:text-kare-600">Insurance FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-800 tracking-wider uppercase mb-2">
                Community
              </h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-600 hover:text-kare-600">Forums</a></li>
                <li><a href="#" className="text-gray-600 hover:text-kare-600">Stories</a></li>
                <li><a href="#" className="text-gray-600 hover:text-kare-600">Events</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-800 tracking-wider uppercase mb-2">
                Company
              </h3>
              <ul className="space-y-2 text-sm">
                <li><a href="/about" className="text-gray-600 hover:text-kare-600">About</a></li>
                <li><a href="/contact" className="text-gray-600 hover:text-kare-600">Contact</a></li>
                <li><a href="#" className="text-gray-600 hover:text-kare-600">Privacy</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} K-are. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <span className="text-sm text-gray-500">Connect with us:</span>
            <a 
              href="https://www.instagram.com/karekoreahealth/" 
              className="text-gray-500 hover:text-kare-600"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
            <a 
              href="https://www.linkedin.com/company/k-are/posts/?feedView=all" 
              className="text-gray-500 hover:text-kare-600"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 