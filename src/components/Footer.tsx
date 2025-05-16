import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Mail, MapPin, CalendarDays, FileText, Heart, Info, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const linkVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05, color: "#2563eb", transition: { duration: 0.2 } }
  };

  const socialVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: { scale: 1.2, rotate: 5, transition: { duration: 0.2 } }
  };

  return (
    <motion.footer 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
      className="bg-gray-50 border-t mt-16 py-12 px-4"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between">
          <div className="mb-8 md:mb-0">
            <motion.div 
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold text-kare-700 font-serif"
            >
              <Link to="/">K-are</Link>
            </motion.div>
            <motion.p variants={itemVariants} className="mt-2 text-sm text-gray-500 max-w-xs">
              Helping foreigners navigate Korean healthcare with comprehensive resources, guides, and community support.
            </motion.p>
            
            {/* Social Media Links */}
            <motion.div variants={itemVariants} className="flex mt-4 space-x-4">
              <motion.a 
                variants={socialVariants}
                initial="initial"
                whileHover="hover"
                href="https://www.instagram.com/karekoreahealth/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-kare-600 transition-colors duration-300"
                aria-label="K-are Instagram Page"
              >
                <Instagram size={22} />
              </motion.a>
              <motion.a 
                variants={socialVariants}
                initial="initial"
                whileHover="hover"
                href="https://www.linkedin.com/company/k-are/posts/?feedView=all" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-kare-600 transition-colors duration-300"
                aria-label="K-are LinkedIn Page"
              >
                <Linkedin size={22} />
              </motion.a>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <motion.div variants={itemVariants}>
              <h3 className="text-sm font-semibold text-gray-800 tracking-wider uppercase mb-4 flex items-center">
                <FileText size={16} className="mr-2 text-kare-600" />
                Resources
              </h3>
              <ul className="space-y-3 text-sm">
                <motion.li whileHover="hover" initial="initial">
                  <motion.div variants={linkVariants}>
                    <Link to="/guide" className="text-gray-600 hover:text-kare-600 transition-colors">Healthcare Guides</Link>
                  </motion.div>
                </motion.li>
                <motion.li whileHover="hover" initial="initial">
                  <motion.div variants={linkVariants}>
                    <Link to="/articles" className="text-gray-600 hover:text-kare-600 transition-colors">Articles</Link>
                  </motion.div>
                </motion.li>
                <motion.li whileHover="hover" initial="initial">
                  <motion.div variants={linkVariants}>
                    <Link to="/calendar" className="text-gray-600 hover:text-kare-600 transition-colors">Korea Calendar</Link>
                  </motion.div>
                </motion.li>
              </ul>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <h3 className="text-sm font-semibold text-gray-800 tracking-wider uppercase mb-4 flex items-center">
                <Heart size={16} className="mr-2 text-kare-600" />
                Community
              </h3>
              <ul className="space-y-3 text-sm">
                <motion.li whileHover="hover" initial="initial">
                  <motion.div variants={linkVariants}>
                    <Link to="/bulletin-board" className="text-gray-600 hover:text-kare-600 transition-colors">Bulletin Board</Link>
                  </motion.div>
                </motion.li>
                <motion.li whileHover="hover" initial="initial">
                  <motion.div variants={linkVariants}>
                    <Link to="/articles" className="text-gray-600 hover:text-kare-600 transition-colors">Health Stories</Link>
                  </motion.div>
                </motion.li>
                <motion.li whileHover="hover" initial="initial">
                  <motion.div variants={linkVariants}>
                    <Link to="/guide" className="text-gray-600 hover:text-kare-600 transition-colors">Expat Resources</Link>
                  </motion.div>
                </motion.li>
              </ul>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <h3 className="text-sm font-semibold text-gray-800 tracking-wider uppercase mb-4 flex items-center">
                <Info size={16} className="mr-2 text-kare-600" />
                Company
              </h3>
              <ul className="space-y-3 text-sm">
                <motion.li whileHover="hover" initial="initial">
                  <motion.div variants={linkVariants}>
                    <Link to="/about" className="text-gray-600 hover:text-kare-600 transition-colors">About Us</Link>
                  </motion.div>
                </motion.li>
                <motion.li whileHover="hover" initial="initial">
                  <motion.div variants={linkVariants}>
                    <Link to="/contact" className="text-gray-600 hover:text-kare-600 transition-colors">Contact</Link>
                  </motion.div>
                </motion.li>
                <motion.li whileHover="hover" initial="initial">
                  <motion.div variants={linkVariants}>
                    <Link to="/about" className="text-gray-600 hover:text-kare-600 transition-colors">Our Mission</Link>
                  </motion.div>
                </motion.li>
              </ul>
            </motion.div>
          </div>
        </motion.div>
        
        <motion.div 
          variants={itemVariants}
          className="mt-12 border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <motion.div 
            variants={itemVariants}
            className="flex flex-col md:flex-row gap-4 md:items-center mb-6 md:mb-0"
          >
            <div className="flex items-center text-gray-500 text-sm">
              <MapPin size={16} className="mr-2 text-kare-600" />
              <span>Seoul, South Korea</span>
            </div>
            <div className="flex items-center text-gray-500 text-sm">
              <Mail size={16} className="mr-2 text-kare-600" />
              <a href="mailto:contact@k-are.com" className="hover:text-kare-600 transition-colors">
                contact@k-are.com
              </a>
            </div>
            <div className="flex items-center text-gray-500 text-sm">
              <CalendarDays size={16} className="mr-2 text-kare-600" />
              <span>© {new Date().getFullYear()} K-are</span>
            </div>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="flex gap-6"
          >
            <motion.a 
              whileHover={{ y: -3 }}
              href="https://www.instagram.com/karekoreahealth/" 
              className="text-gray-500 hover:text-kare-600 text-sm transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </motion.a>
            <motion.a 
              whileHover={{ y: -3 }}
              href="https://www.linkedin.com/company/k-are/posts/?feedView=all" 
              className="text-gray-500 hover:text-kare-600 text-sm transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </motion.a>
            <motion.a 
              whileHover={{ y: -3 }}
              href="mailto:contact@k-are.com" 
              className="text-gray-500 hover:text-kare-600 text-sm transition-colors"
            >
              Email
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer; 