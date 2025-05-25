import Navbar from "../components/Navbar";
import HeroBanner from "../components/HeroBanner";
import Footer from "../components/Footer";
import { Heart, Shield, Users, Globe, Linkedin, ChevronDown, ChevronUp, HelpCircle, Calendar, Star, ArrowRight } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useInView, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";

const Index = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  
  // Detect mobile and touch devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTouch('ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Respect user's motion preferences
  const prefersReducedMotion = useReducedMotion();

  // Simplified scroll effects for mobile
  const { scrollYProgress } = useScroll();
  const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", isMobile ? "50%" : "100%"]);

  // Section refs for animations
  const valuesRef = useRef(null);
  const teamRef = useRef(null);
  const roadmapRef = useRef(null);
  const faqRef = useRef(null);

  const valuesInView = useInView(valuesRef, { once: true, margin: isMobile ? "-50px" : "-100px" });
  const teamInView = useInView(teamRef, { once: true, margin: isMobile ? "-50px" : "-100px" });
  const roadmapInView = useInView(roadmapRef, { once: true, margin: isMobile ? "-50px" : "-100px" });
  const faqInView = useInView(faqRef, { once: true, margin: isMobile ? "-50px" : "-100px" });

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const teamMembers = [
    { 
      name: "Shangbiao (Alex) Hong", 
      role: "Founder & CEO", 
      linkedIn: "https://www.linkedin.com/in/shangbiao-hong/",
      bio: "Former healthcare administrator with expertise in creating solutions for international patients in Korea."
    },
    { 
      name: "Jayda Cez Lim", 
      role: "CFO & Marketing Officer", 
      linkedIn: "https://www.linkedin.com/in/jayda-cez-lim/",
      bio: "Specializes in helping patients connect with the right healthcare providers in Korea."
    },
    { 
      name: "Ryan Tan Cher", 
      role: "Operations Officer", 
      linkedIn: "https://www.linkedin.com/in/ryan-tan-cher/",
      bio: "Developing technological solutions to make healthcare more accessible to foreigners."
    },
    { 
      name: "Colleen Chapco", 
      role: "Research Analyst & Consultant", 
      linkedIn: "https://www.linkedin.com/in/colleen-chapco/",
      bio: "Connecting with international communities to understand their healthcare needs."
    },
    { 
      name: "Jennifer R.", 
      role: "Operation Officer", 
      linkedIn: "https://www.linkedin.com/in/jennifer-r/",
      bio: "Advocates for international patients' rights and improved healthcare accessibility."
    },
    { 
      name: "Laura Montes", 
      role: "Marketing Officer", 
      linkedIn: "https://www.linkedin.com/in/laura-montes/",
      bio: "Creates engaging healthcare content to educate the international community."
    },
    { 
      name: "Soondo Mutewa", 
      role: "Technology Officer(Developer)", 
      linkedIn: "https://www.linkedin.com/in/soondo-mutewa/",
      bio: "Researches healthcare trends and needs of foreign residents in Korea."
    }
  ];

  const faqData = [
    {
      question: "Who is required to enroll in Korea's National Health Insurance (NHI), and how do foreigners register?",
      answer: "All residents in Korea, including foreigners staying six months or longer, must enroll in the National Health Insurance (NHI). Foreigners can register at their local NHIS office with their passport, alien registration card, and proof of residence. Enrollment is automatic for certain visa holders, like international students, upon alien registration."
    },
    {
      question: "What if I miss paying my health insurance?",
      answer: `If someone misses a payment for health insurance in Korea, several consequences may occur:

• Suspension of Coverage: Insurance coverage is suspended from the first day of the month for which payment is overdue.

• Late Payment Penalties: A penalty is added for each day payment is overdue.

• Loss of Access to Medical Services: While coverage is suspended, you will have to pay a fee without the health insurance discount.

• Reminders and Forcible Collection: The NHIS sends overdue payment reminders. If payment is still not made, the NHIS may proceed with forcible collection measures, such as the seizure of property, bank deposits, or other assets.

• Visa Extension Restrictions: For foreigners, unpaid insurance debts (typically over 500,000 KRW) can result in restrictions on visa extensions, potentially affecting legal residency status in Korea.`
    },
    {
      question: "How do I contact the National Health Insurance Service for assistance?",
      answer: "The NHIS provides foreign language support and has dedicated service centers for foreigners. For inquiries, you can contact the NHIS by phone (1577-1000) or visit a local NHIS office."
    }
  ];

  const roadmapData = [
    { step: 1, title: "Complete website design (launch it)", date: "JUNE 2025", color: "from-slate-600 to-slate-700", shortTitle: "Website Launch" },
    { step: 2, title: "Complete guide manual design and launch", date: "JULY 2025", color: "from-teal-600 to-teal-700", shortTitle: "Guide Manual" },
    { step: 3, title: "Special feature release (Health check-up function)", date: "AUGUST 2025", color: "from-kare-600 to-kare-700", shortTitle: "Health Check-up" },
    { step: 4, title: "Special feature release", date: "SEPTEMBER 2025", color: "from-slate-500 to-slate-600", shortTitle: "Special Features" },
    { step: 5, title: "Special feature release (Community function)", date: "OCTOBER 2025", color: "from-teal-500 to-teal-600", shortTitle: "Community" },
    { step: 6, title: "Collaboration", date: "NOVEMBER 2025", color: "from-kare-500 to-kare-600", shortTitle: "Collaboration" },
    { step: 7, title: "Expansion", date: "DECEMBER 2025", color: "from-purple-600 to-purple-700", shortTitle: "Expansion" },
    { step: 8, title: "Expand user base", date: "JANUARY 2026", color: "from-green-600 to-green-700", shortTitle: "User Growth" },
    { step: 9, title: "Prepare financing materials", date: "FEBRUARY 2026", color: "from-blue-600 to-blue-700", shortTitle: "Financing Prep" },
    { step: 10, title: "Exhibition preparation", date: "MARCH 2026", color: "from-teal-700 to-teal-800", shortTitle: "Exhibition Prep" },
    { step: 11, title: "Qualify for trade shows", date: "APRIL 2026", color: "from-kare-700 to-kare-800", shortTitle: "Trade Shows" },
    { step: 12, title: "Become a registered company", date: "MAY 2026", color: "from-red-500 to-red-600", shortTitle: "Registered Company", isSpecial: true }
  ];

  const valuesData = [
    {
      icon: Heart,
      title: "Compassion",
      description: "We understand the challenges of seeking healthcare in a foreign country",
      color: "bg-kare-100",
      iconColor: "text-kare-600"
    },
    {
      icon: Shield,
      title: "Trust",
      description: "Reliable, accurate information you can count on for your health decisions",
      color: "bg-lavender-100",
      iconColor: "text-lavender-600"
    },
    {
      icon: Users,
      title: "Community",
      description: "Connecting expats and helping each other through shared experiences",
      color: "bg-green-100",
      iconColor: "text-green-600"
    },
    {
      icon: Globe,
      title: "Accessibility",
      description: "Breaking down language and cultural barriers to healthcare access",
      color: "bg-blue-100",
      iconColor: "text-blue-600"
    }
  ];

  // Mobile-optimized animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0.05 : 0.1,
        duration: isMobile ? 0.3 : 0.6
      }
    }
  };

  const itemVariants = {
    hidden: { y: isMobile ? 10 : 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: isMobile ? 200 : 100,
        duration: isMobile ? 0.3 : 0.6
      }
    }
  };

  const fadeInUpVariants = {
    hidden: { y: isMobile ? 20 : 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: isMobile ? 0.4 : 0.6,
        ease: "easeOut"
      }
    }
  };

  // Mobile-friendly hover effects
  const mobileHover = isTouch ? {} : { 
    scale: 1.05, 
    y: -5,
    transition: { type: "spring", stiffness: 300 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-kare-50/20 to-white relative">
      <Navbar />
      
      {/* Strong Banner */}
      <HeroBanner />
      
      {/* Simplified parallax for mobile */}
      {!isMobile && (
        <motion.div 
          className="fixed inset-0 -z-10"
          style={{ y: yBackground }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-kare-50/30 to-teal-50/30"></div>
        </motion.div>
      )}
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-16 relative z-10">
        
                {/* What K-are Stands For Section - Mobile Optimized */}
        <motion.section 
          ref={valuesRef}
          className="mb-12 sm:mb-20"
          initial="hidden"
          animate={valuesInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.div 
            className="text-center mb-8 sm:mb-12"
            variants={fadeInUpVariants}
          >
            <motion.h2 
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 px-2"
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: isMobile ? 15 : 30 }}
              transition={{ duration: isMobile ? 0.4 : 0.6 }}
              viewport={{ once: true }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-logo">What K-are Stands For</span>
            </motion.h2>
            <motion.p 
              className="text-base sm:text-lg text-kare-600 max-w-3xl mx-auto px-4"
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: isMobile ? 10 : 20 }}
              transition={{ duration: isMobile ? 0.4 : 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              K-are is your trusted companion for navigating healthcare in Korea. 
              We believe everyone deserves access to quality healthcare, regardless of language barriers.
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
            variants={containerVariants}
          >
            {valuesData.map((value, index) => (
              <motion.div
                key={index}
                className="text-center group p-4 rounded-xl hover:bg-white/50 transition-colors touch-manipulation"
                variants={itemVariants}
                whileHover={!prefersReducedMotion ? mobileHover : {}}
                whileTap={isTouch ? { scale: 0.98 } : {}}
                whileInView={{ 
                  opacity: 1, 
                  y: 0,
                  scale: 1
                }}
                initial={{ 
                  opacity: 0, 
                  y: isMobile ? 20 : 50,
                  scale: 0.95
                }}
                transition={{ 
                  duration: isMobile ? 0.3 : 0.5, 
                  delay: index * (isMobile ? 0.05 : 0.1)
                }}
                viewport={{ once: true }}
              >
                <motion.div 
                  className={`${value.color} rounded-full w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-3 sm:mb-4 ${!isTouch ? 'group-hover:scale-110' : ''} transition-transform duration-300`}
                  whileHover={!isTouch && !prefersReducedMotion ? { rotate: 360 } : {}}
                  transition={{ duration: 0.6 }}
                >
                  {React.createElement(value.icon, { className: `h-6 w-6 sm:h-8 sm:w-8 ${value.iconColor}` })}
                </motion.div>
                <h3 className="text-lg sm:text-xl font-semibold text-kare-800 mb-2">{value.title}</h3>
                <p className="text-sm sm:text-base text-kare-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Team Behind K-are Section - Mobile Optimized */}
        <motion.section 
          ref={teamRef}
          className="bg-gradient-to-br from-white via-kare-50 to-white rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 shadow-sm mb-12 sm:mb-20 overflow-hidden"
          initial="hidden"
          animate={teamInView ? "visible" : "hidden"}
          variants={containerVariants}
          viewport={{ once: true }}
        >
          <motion.div 
            className="text-center mb-8 sm:mb-12"
            variants={fadeInUpVariants}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-logo">The Team Behind K-are</span>
            </h2>
            <p className="text-base sm:text-lg text-kare-700 max-w-3xl mx-auto px-2">
              We're a passionate team of healthcare professionals, developers, and expats 
              who understand the challenges of navigating Korean healthcare firsthand.
            </p>
          </motion.div>
          
          {/* Placeholder for team members - removed as requested */}
          
          {/* Meet Our Team Button */}
          <motion.div 
            className="mt-8 text-center"
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: isMobile ? 15 : 20 }}
            transition={{ delay: isMobile ? 0.3 : 0.4, duration: isMobile ? 0.4 : 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-kare-600 mb-4 px-2">
              Want to learn more about our amazing team?
            </p>
            <motion.div
              whileHover={!isTouch ? { scale: 1.05 } : {}}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                to="/about#team"
                className="inline-flex items-center bg-gradient-to-r from-kare-600 to-teal-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold text-base sm:text-lg hover:from-kare-700 hover:to-teal-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 touch-manipulation"
              >
                Meet Our Team
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Mission Statement */}
          <motion.div 
            className="mt-8 sm:mt-12 text-center bg-gradient-to-r from-kare-50 to-teal-50 rounded-lg sm:rounded-xl p-6 sm:p-8"
            whileInView={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: isMobile ? 0.4 : 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <blockquote className="text-lg sm:text-xl text-kare-800 font-medium italic mb-3 sm:mb-4 leading-relaxed">
              "We created K-are because we experienced firsthand how difficult it can be to navigate 
              healthcare as a foreigner in Korea. Our vision is a community where no one feels lost 
              or alone when seeking medical help."
            </blockquote>
            <cite className="text-teal-500 font-semibold">— Shangbiao (Alex) Hong, Founder & CEO</cite>
          </motion.div>
        </motion.section>

        {/* Interactive Roadmap Section - Mobile Optimized */}
        <motion.section 
          ref={roadmapRef}
          className="bg-gradient-to-br from-kare-600 via-kare-700 to-teal-600 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 shadow-lg mb-12 sm:mb-20 text-white overflow-hidden relative"
          initial="hidden"
          animate={roadmapInView ? "visible" : "hidden"}
          variants={containerVariants}
          viewport={{ once: true }}
        >
          {/* Background Pattern - Simplified for mobile */}
          <div className="absolute inset-0 opacity-10">
            <div className="h-full w-full bg-white/5 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
        </div>
        
          <div className="relative">
            <motion.div 
              className="text-center mb-8 sm:mb-12"
              variants={fadeInUpVariants}
            >
              <div className="flex items-center justify-center mb-3 sm:mb-4">
                <motion.div
                  whileHover={!isTouch && !prefersReducedMotion ? { rotate: 360 } : {}}
                  transition={{ duration: 0.6 }}
                >
                  <Calendar className="h-8 w-8 sm:h-10 sm:w-10 text-teal-200 mr-2 sm:mr-3" />
                </motion.div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                  Our Roadmap to Success
            </h2>
              </div>
              <p className="text-base sm:text-lg text-teal-100 max-w-3xl mx-auto px-2">
                Follow our ambitious 12-month journey from website launch to becoming a registered company
              </p>
            </motion.div>

            {/* Placeholder for roadmap timeline - removed as requested */}

            {/* Call to Action */}
            <motion.div
              className="text-center"
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: isMobile ? 15 : 20 }}
              transition={{ delay: isMobile ? 0.3 : 1.2, duration: isMobile ? 0.4 : 0.6 }}
              viewport={{ once: true }}
            >
              <p className="text-base sm:text-lg text-teal-100 mb-4 sm:mb-6 px-2">
                Check out our complete roadmap to see how we're building K-are step by step!
              </p>
              <motion.div
                whileHover={!isTouch ? { scale: 1.05 } : {}}
                whileTap={{ scale: 0.95 }}
              >
              <Link 
                  to="/about#roadmap"
                  className="inline-flex items-center bg-white text-kare-700 px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold text-base sm:text-lg hover:bg-kare-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 touch-manipulation"
              >
                  View Our Roadmap
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
              </motion.div>
            </motion.div>
            </div>
        </motion.section>

        {/* FAQ Section - Mobile Optimized */}
        <motion.section 
          ref={faqRef}
          className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 shadow-sm"
          initial="hidden"
          animate={faqInView ? "visible" : "hidden"}
          variants={containerVariants}
          viewport={{ once: true }}
        >
          <motion.div 
            className="text-center mb-8 sm:mb-12"
            variants={fadeInUpVariants}
          >
            <div className="flex items-center justify-center mb-3 sm:mb-4">
              <motion.div
                whileHover={!isTouch && !prefersReducedMotion ? { rotate: 360 } : {}}
                transition={{ duration: 0.6 }}
              >
                <HelpCircle className="h-8 w-8 sm:h-10 sm:w-10 text-teal-400 mr-2 sm:mr-3" />
              </motion.div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-kare-800">
                <span className="bg-clip-text text-transparent bg-gradient-logo">Frequently Asked Questions</span>
              </h2>
          </div>
            <p className="text-base sm:text-lg text-kare-600 max-w-3xl mx-auto px-2">
              Quick answers to common questions about Korean healthcare and insurance
            </p>
          </motion.div>
          
          <motion.div 
            className="max-w-4xl mx-auto space-y-3 sm:space-y-4"
            variants={containerVariants}
          >
            {faqData.map((faq, index) => (
              <motion.div 
                key={index} 
                className="border border-gray-200 rounded-lg sm:rounded-xl overflow-hidden hover:shadow-md transition-shadow"
                variants={itemVariants}
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: 0 }}
                transition={{ duration: isMobile ? 0.3 : 0.5, delay: index * (isMobile ? 0.05 : 0.1) }}
                viewport={{ once: true }}
                whileHover={!isTouch ? { scale: 1.01 } : {}}
              >
                <motion.button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-4 sm:px-6 py-4 text-left bg-gradient-to-r from-white to-kare-50 hover:to-kare-100 transition-colors flex items-center justify-between touch-manipulation min-h-[60px]"
                  whileHover={!isTouch ? { backgroundColor: "rgb(243 244 246)" } : {}}
                  whileTap={{ backgroundColor: "rgb(229 231 235)" }}
                >
                  <h3 className="text-base sm:text-lg font-semibold text-kare-800 pr-4 leading-tight">
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: openFAQ === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown className="h-5 w-5 text-teal-400" />
                  </motion.div>
                </motion.button>
                
                <motion.div
                  initial={false}
                  animate={{
                    height: openFAQ === index ? "auto" : 0,
                    opacity: openFAQ === index ? 1 : 0
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-4 sm:px-6 py-4 bg-white">
                    <p className="text-sm sm:text-base text-kare-700 leading-relaxed whitespace-pre-line">
                      {faq.answer}
                    </p>
        </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            className="text-center mt-6 sm:mt-8"
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: isMobile ? 15 : 20 }}
            transition={{ duration: isMobile ? 0.4 : 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <p className="text-kare-600 mb-4 px-2">
              Have more questions? We're here to help!
            </p>
            <motion.a 
              href="/contact" 
              className="inline-flex items-center bg-gradient-to-r from-kare-600 to-teal-500 hover:from-kare-700 hover:to-teal-600 text-white px-6 py-3 rounded-lg font-medium transition-colors touch-manipulation min-h-[48px]"
              whileHover={!isTouch ? { scale: 1.05 } : {}}
              whileTap={{ scale: 0.95 }}
            >
              Contact Us
            </motion.a>
          </motion.div>
        </motion.section>
        
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
