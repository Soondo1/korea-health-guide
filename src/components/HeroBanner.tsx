import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, MapPin, Heart, Users, ArrowRight, Shield, Star, Sparkles } from "lucide-react";

export default function HeroBanner() {
  return (
    <section className="relative bg-gradient-to-br from-kare-600 via-kare-700 to-lavender-600 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/10"></div>
      <div className="absolute inset-0 opacity-20">
        <div className="h-full w-full bg-white/5 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center bg-yellow-400/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6 border border-yellow-300/30"
            >
              <Sparkles className="h-5 w-5 mr-3 text-yellow-200" />
              <span className="text-lg font-bold text-yellow-200">Your Health Insurance Sidekick</span>
              <div className="flex ml-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current text-yellow-300" />
                ))}
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            >
              Stop decoding{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-orange-200">
                ancient scrolls
              </span>
              <br />
              <span className="text-3xl sm:text-4xl lg:text-5xl">
                We make Korea's healthcare{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-200 to-blue-200">
                  make sense
                </span>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg sm:text-xl text-blue-100 mb-8 max-w-2xl lg:max-w-none leading-relaxed"
            >
              Whether you're here to <strong className="text-yellow-200">study, work, or chase K-drama dreams</strong>, 
              K-are cuts through the confusion and handles the hard stuff. We bridge the gap between 
              international residents and Korea's National Health Insurance system—
              <span className="text-green-200 font-semibold"> without the stress meltdown</span>.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 mb-8"
            >
              <Link
                to="/articles"
                className="group bg-yellow-400 text-kare-800 px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-300 transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Read Our Articles
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/guide?tab=hospitals"
                className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/20 transition-all duration-300 flex items-center justify-center"
              >
                Find Healthcare
              </Link>
            </motion.div>

            {/* Key Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center lg:text-left"
            >
              <div className="flex items-center justify-center lg:justify-start">
                <Shield className="h-6 w-6 text-green-300 mr-2" />
                <div>
                  <div className="text-lg font-bold text-yellow-200">Clear Guidance</div>
                  <div className="text-sm text-blue-200">No more confusion</div>
                </div>
              </div>
              <div className="flex items-center justify-center lg:justify-start">
                <Heart className="h-6 w-6 text-pink-300 mr-2" />
                <div>
                  <div className="text-lg font-bold text-yellow-200">Stress-Free</div>
                  <div className="text-sm text-blue-200">We handle the hard stuff</div>
                </div>
              </div>
              <div className="flex items-center justify-center lg:justify-start">
                <Users className="h-6 w-6 text-purple-300 mr-2" />
                <div>
                  <div className="text-lg font-bold text-yellow-200">Reliable Support</div>
                  <div className="text-sm text-blue-200">Information at your door</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Enhanced Feature Cards */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative"
          >
            {/* Main Hero Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="bg-white/15 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl mb-6"
            >
              <div className="text-center">
                <div className="bg-yellow-400/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-yellow-200" />
                </div>
                <h3 className="font-bold text-2xl mb-3 text-white">National Health Insurance</h3>
                <p className="text-blue-100 text-lg leading-relaxed">
                  We provide clear, accurate, and reliable guidance throughout the registration 
                  and coverage process, ensuring you get the healthcare access you're entitled to.
                </p>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              >
                <div className="bg-green-400/20 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Search className="h-6 w-6 text-green-200" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Easy Registration</h3>
                <p className="text-blue-100 text-sm">
                  Step-by-step guidance through the NHI signup process
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 sm:mt-8"
              >
                <div className="bg-purple-400/20 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-purple-200" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Find Services</h3>
                <p className="text-blue-100 text-sm">
                  Locate English-speaking doctors and healthcare facilities
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="rgb(249 250 251)"
          />
        </svg>
      </div>
    </section>
  );
} 