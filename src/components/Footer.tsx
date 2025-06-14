import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Mail, MapPin, CalendarDays, Info } from 'lucide-react';
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
        type: "spring" as const,
        stiffness: 100
      }
    }
  };

  const linkVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05, color: "#81d3da", transition: { duration: 0.2 } }
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
      className="bg-gradient-to-b from-white to-kare-50 border-t mt-16 py-12 px-4"
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-logo opacity-70"></div>
      <div className="max-w-7xl mx-auto">
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between">
          <div className="mb-8 md:mb-0">
            <motion.div 
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold font-serif"
            >
              <Link to="/" className="bg-clip-text text-transparent bg-gradient-logo">K-are</Link>
            </motion.div>
            <motion.p variants={itemVariants} className="mt-2 text-sm text-kare-700 max-w-xs">
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
                className="text-kare-600 hover:text-teal-400 transition-colors duration-300"
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
                className="text-kare-600 hover:text-teal-400 transition-colors duration-300"
                aria-label="K-are LinkedIn Page"
              >
                <Linkedin size={22} />
              </motion.a>
            </motion.div>
          </div>
          
          <div>
            <motion.div variants={itemVariants}>
              <h3 className="text-sm font-semibold text-kare-700 tracking-wider uppercase mb-4 flex items-center">
                <Info size={16} className="mr-2 text-teal-400" />
                Company
              </h3>
              <ul className="space-y-3 text-sm">
                <motion.li whileHover="hover" initial="initial">
                  <motion.div variants={linkVariants}>
                    <Link to="/about" className="text-kare-600 hover:text-teal-400 transition-colors">About Us</Link>
                  </motion.div>
                </motion.li>
                <motion.li whileHover="hover" initial="initial">
                  <motion.div variants={linkVariants}>
                    <Link to="/contact" className="text-kare-600 hover:text-teal-400 transition-colors">Contact</Link>
                  </motion.div>
                </motion.li>
                <motion.li whileHover="hover" initial="initial">
                  <motion.div variants={linkVariants}>
                    <Link to="/about" className="text-kare-600 hover:text-teal-400 transition-colors">Our Mission</Link>
                  </motion.div>
                </motion.li>
              </ul>
            </motion.div>
          </div>
        </motion.div>
        
        <motion.div 
          variants={itemVariants}
          className="mt-12 border-t border-kare-100 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <motion.div 
            variants={itemVariants}
            className="flex flex-col md:flex-row gap-4 md:items-center mb-6 md:mb-0"
          >
            <div className="flex items-center text-kare-600 text-sm">
              <MapPin size={16} className="mr-2 text-teal-400" />
              <span>Seoul, South Korea</span>
            </div>
            <div className="flex items-center text-kare-600 text-sm">
              <Mail size={16} className="mr-2 text-teal-400" />
              <a href="mailto:karekoreahealth@gmail.com" className="hover:text-teal-400 transition-colors">
                karekoreahealth@gmail.com
              </a>
            </div>
            <div className="flex items-center text-kare-600 text-sm">
              <CalendarDays size={16} className="mr-2 text-teal-400" />
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
              className="text-kare-600 hover:text-teal-400 text-sm transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </motion.a>
            <motion.a 
              whileHover={{ y: -3 }}
              href="https://www.linkedin.com/company/k-are/posts/?feedView=all" 
              className="text-kare-600 hover:text-teal-400 text-sm transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </motion.a>
            <motion.a 
              whileHover={{ y: -3 }}
              href="mailto:karekoreahealth@gmail.com" 
              className="text-kare-600 hover:text-teal-400 text-sm transition-colors"
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