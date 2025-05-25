import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Telescope, Shield, Puzzle, MessageSquare, Share2 } from "lucide-react";

export default function HeroBanner() {
  // Animation variants for scroll-triggered animations
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  return (
    <section className="relative bg-gradient-to-b from-kare-50 to-white overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="h-full w-full bg-[radial-gradient(circle_at_50%_50%,#5986f6_1px,transparent_1px)] bg-[length:24px_24px]"></div>
      </div>
      
      {/* Hero Section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="max-w-6xl mx-auto">
          {/* Main Statement */}
          <motion.div 
            className="text-center mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            {/* Logo-inspired element */}
            <motion.div 
              className="flex justify-center items-center mb-8"
              variants={fadeInUp}
            >
              <div className="flex flex-col items-center">
                <div className="text-kare-700 font-bold text-4xl mb-2">K<span className="text-teal-400">-are</span></div>
                <div className="h-1 w-32 rounded-full bg-gradient-to-r from-kare-700 via-kare-500 to-teal-200"></div>
              </div>
            </motion.div>
            
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-kare-700 leading-tight"
              variants={fadeInUp}
            >
              We were inspired to create a space to support
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-kare-600 to-teal-400">foreigners living in Korea can genuinely feel at home.</span>
            </motion.h1>
          </motion.div>

          {/* Our Journey Section */}
          <motion.div
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg mb-20 border border-teal-100"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerChildren}
          >
            <motion.h2 
              className="text-3xl font-bold text-kare-700 mb-12 text-center"
              variants={fadeInUp}
            >
              In here we...
            </motion.h2>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-12"
              variants={staggerChildren}
            >
              {/* Connect */}
              <motion.div 
                className="text-center"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                variants={fadeInUp}
              >
                <div className="flex justify-center mb-6">
                  <div className="w-24 h-24 flex items-center justify-center bg-kare-100 rounded-full">
                    <Puzzle className="w-16 h-16 text-kare-600" />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-kare-700 mb-3">connect</h3>
                <p className="text-gray-700">
                  We bridge the gap between healthcare systems and international residents
                </p>
              </motion.div>
              
              {/* Resonate */}
              <motion.div 
                className="text-center"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                variants={fadeInUp}
              >
                <div className="flex justify-center mb-6">
                  <div className="w-24 h-24 flex items-center justify-center bg-teal-100 rounded-full">
                    <MessageSquare className="w-16 h-16 text-teal-500" />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-teal-600 mb-3">resonate</h3>
                <p className="text-gray-700">
                  We understand your challenges because we've faced them too
                </p>
              </motion.div>
              
              {/* Share */}
              <motion.div 
                className="text-center"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                variants={fadeInUp}
              >
                <div className="flex justify-center mb-6">
                  <div className="w-24 h-24 flex items-center justify-center bg-warmth-100 rounded-full">
                    <Share2 className="w-16 h-16 text-warmth-500" />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-warmth-600 mb-3">share</h3>
                <p className="text-gray-700">
                  We provide knowledge and resources to empower your healthcare journey
                </p>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Perspective Statement */}
          <motion.div 
            className="text-center mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <motion.h2 
              className="text-3xl font-bold text-kare-700 mb-6"
              variants={fadeInUp}
            >
              We tapped into our ability to see, not as ourselves, but as others.
            </motion.h2>
            <motion.div 
              className="flex justify-center"
              variants={fadeInUp}
            >
              <div className="w-16 h-16 flex items-center justify-center bg-kare-100 rounded-full">
                <Telescope className="w-12 h-12 text-kare-600" />
              </div>
            </motion.div>
          </motion.div>

          {/* Mission Statement */}
          <motion.div 
            className="bg-gradient-to-br from-kare-600 via-kare-500 to-teal-400 text-white rounded-2xl p-8 shadow-lg text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <motion.h2 
              className="text-3xl font-bold mb-8"
              variants={fadeInUp}
            >
              Our mission is to guarantee that foreigners experience
              <br /><span className="text-warmth-100">safety, warmth, and fulfillment,</span>
              <br />empowering you to reach new heights.
            </motion.h2>
            <motion.div 
              className="flex justify-center mb-4"
              variants={fadeInUp}
            >
              <div className="w-20 h-20 flex items-center justify-center bg-white/10 rounded-full">
                <Shield className="w-16 h-16 text-white" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 