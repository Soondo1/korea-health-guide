import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="flex flex-col-reverse md:flex-row items-center bg-gradient-to-br from-kare-50 to-lavender-50 rounded-xl overflow-hidden">
      {/* Text content */}
      <motion.div 
        className="w-full md:w-1/2 p-5 sm:p-8 md:p-12 text-center md:text-left"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1 
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-kare-950"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Welcome to K-are
        </motion.h1>
        <motion.p 
          className="text-sm sm:text-base md:text-lg text-gray-700 mb-4 sm:mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Helping you navigate the Korean healthcare system with confidence
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link 
            to="/guide" 
            className="inline-flex items-center justify-center bg-kare-600 hover:bg-kare-700 text-white px-5 sm:px-6 py-3 rounded-md text-base sm:text-lg font-medium transition-colors w-full sm:w-auto"
          >
            View Guide
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </motion.div>
      </motion.div>
      {/* Illustration Image */}
      <motion.div 
        className="w-full md:w-1/2 p-4 sm:p-6 md:p-8 flex justify-center"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
      >
        <motion.img 
          src="/assets/medical-illustration.svg" 
          alt="Medical guide illustration" 
          className="max-w-full h-auto object-contain max-h-64 sm:max-h-80"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ 
            duration: 0.5,
            delay: 0.2
          }}
          whileHover={{ 
            scale: 1.05,
            transition: { duration: 0.3 }
          }}
        />
      </motion.div>
    </section>
  );
}
