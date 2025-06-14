import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Instagram, Linkedin, Mail, Users, Target, Heart, Calendar, Star } from "lucide-react";
import { motion } from "framer-motion";

const About = () => {
  const [activeSection, setActiveSection] = useState("mission");

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const teamMembers = [
    { 
      name: "Alex Hong", 
      role: "Founder and CEO", 
      image: "/assets/Alex.jpeg",
      linkedIn: "https://www.linkedin.com/in/shangbiao-hong/",
      bio: ""
    },
    { 
      name: "Jayda Cez Lim", 
      role: "Chief Marketer", 
      image: "/assets/Jayda.jpeg",
      linkedIn: "https://www.linkedin.com/in/jayda-cez-lim/",
      bio: ""
    },
    { 
      name: "Colleen Chapco", 
      role: "Consultant", 
      image: "/assets/Collean.jpeg",
      linkedIn: "https://www.linkedin.com/in/colleen-chapco/",
      bio: ""
    },
    { 
      name: "Esther Adjoa Boni", 
      role: "Researcher", 
      image: "/assets/Esther.jpg",
      linkedIn: "https://www.linkedin.com/in/estheradjoaboni/",
      bio: ""
    },
    { 
      name: "Laura Montes", 
      role: "Marketer", 
      image: "/assets/Lau.jpg",
      linkedIn: "https://www.linkedin.com/in/laura-montes/",
      bio: ""
    },
    { 
      name: "Soondo Roberts", 
      role: "Head of Technology", 
      image: "/assets/Soondo.jpg",
      linkedIn: "https://www.linkedin.com/in/soondo-mutewa/",
      bio: ""
    }
  ];

  const roadmapData = [
    { step: 1, title: "Complete website design (launch it)", date: "JUNE 2025", color: "from-slate-600 to-slate-700" },
    { step: 2, title: "Complete guide manual design and launch", date: "JULY 2025", color: "from-teal-600 to-teal-700" },
    { step: 3, title: "Special feature release (Health check-up function)", date: "AUGUST 2025", color: "from-kare-600 to-kare-700" },
    { step: 4, title: "Special feature release", date: "SEPTEMBER 2025", color: "from-slate-500 to-slate-600" },
    { step: 5, title: "Special feature release (Community function)", date: "OCTOBER 2025", color: "from-teal-500 to-teal-600" },
    { step: 6, title: "Collaboration", date: "NOVEMBER 2025", color: "from-kare-500 to-kare-600" },
    { step: 7, title: "Expansion", date: "DECEMBER 2025", color: "from-purple-600 to-purple-700" },
    { step: 8, title: "Expand user base", date: "JANUARY 2026", color: "from-green-600 to-green-700" },
    { step: 9, title: "Prepare financing materials", date: "FEBRUARY 2026", color: "from-blue-600 to-blue-700" },
    { step: 10, title: "Exhibition preparation", date: "MARCH 2026", color: "from-teal-700 to-teal-800" },
    { step: 11, title: "Qualify for trade shows", date: "APRIL 2026", color: "from-kare-700 to-kare-800" },
    { step: 12, title: "Become a registered company", date: "MAY 2026", color: "from-red-500 to-red-600", isSpecial: true }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-kare-50/20 to-white">
      <Navbar />
      
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-logo">About K-are</span>
          </h1>
          <p className="text-xl text-kare-600 max-w-3xl mx-auto">
            Bridging the gap between foreigners and Korean healthcare with community-driven resources.
          </p>
        </motion.div>

        {/* Navigation Pills */}
        <motion.div 
          variants={fadeIn}
          initial="initial"
          animate="animate"
          className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12"
        >
          {[
            { id: "mission", label: "Our Mission", icon: <Target size={18} /> },
            { id: "team", label: "Our Team", icon: <Users size={18} /> },
            { id: "roadmap", label: "Our Roadmap", icon: <Calendar size={18} /> },
            { id: "connect", label: "Connect", icon: <Heart size={18} /> }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`flex items-center px-5 py-2.5 rounded-full text-base font-medium transition-all duration-300 ${
                activeSection === item.id
                  ? "bg-gradient-to-r from-kare-600 to-teal-500 text-white shadow-md"
                  : "bg-white text-kare-700 hover:bg-kare-50"
              }`}
            >
              <span className="mr-2">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </motion.div>
        
        <div className="bg-gradient-to-br from-white via-kare-50/10 to-white shadow-lg rounded-2xl p-8 md:p-10">
          {/* Mission Section */}
          {activeSection === "mission" && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="prose prose-lg max-w-none"
            >
              <h2 className="text-3xl font-bold mb-6 flex items-center">
                <Target className="mr-3 text-teal-400" />
                <span className="bg-clip-text text-transparent bg-gradient-logo">Our Mission</span>
              </h2>
              
              <p className="text-lg leading-relaxed text-kare-700">
                K-are (short for "Korea Care") is a community-driven portal created to help foreigners 
                navigate the Korean healthcare system. Our goal is to provide up-to-date information 
                on hospitals, insurance, pharmacies, and healthcare services in English.
              </p>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="my-10 bg-gradient-to-r from-kare-50 to-teal-50 rounded-xl p-8 border-l-4 border-teal-400 shadow-sm"
              >
                <blockquote className="italic text-xl text-kare-700 leading-relaxed">
                  "We created K-are because we experienced firsthand how difficult it can be to navigate 
                  healthcare as a foreigner in Korea. Our vision is a community where no one feels lost 
                  or alone when seeking medical help."
                </blockquote>
                <p className="text-right mt-4 font-medium text-teal-500">— Shangbiao (Alex) Hong, Founder & CEO</p>
              </motion.div>
              
              <p className="text-lg leading-relaxed text-kare-700">
                Whether you are a new resident or a long-term expat, we offer guides and personal stories 
                to make healthcare in Korea less intimidating. The site is maintained by volunteers and 
                healthcare professionals who understand the challenges of getting care in a new country.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                {[
                  { 
                    title: "Community-Driven", 
                    description: "Created by expatriates and healthcare professionals who understand the challenges.",
                    color: "bg-kare-50 border-kare-200" 
                  },
                  { 
                    title: "Practical Resources", 
                    description: "Real solutions to common healthcare challenges faced by foreigners.",
                    color: "bg-teal-50 border-teal-200" 
                  },
                  { 
                    title: "Accessible Information", 
                    description: "Making complex healthcare information easy to understand and navigate.",
                    color: "bg-warmth-50 border-warmth-200" 
                  }
                ].map((card, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * idx, duration: 0.5 }}
                    className={`rounded-lg p-6 ${card.color} border shadow-sm`}
                  >
                    <h3 className="font-bold text-xl mb-2 text-kare-800">{card.title}</h3>
                    <p className="text-kare-600">{card.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
          
          {/* Team Section */}
          {activeSection === "team" && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-6 flex items-center">
                <Users className="mr-3 text-teal-400" /> 
                <span className="bg-clip-text text-transparent bg-gradient-logo">Our Team</span>
              </h2>
              
              <p className="text-lg text-kare-700 mb-8">
                K-are is run by a passionate team of expats who have experienced the healthcare 
                system from different perspectives. Our contributors come from diverse backgrounds to provide
                comprehensive support and information.
              </p>
              
              <h3 className="text-xl font-bold text-kare-700 mb-4">Our Team</h3>
              <motion.div 
                variants={staggerContainer}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10"
              >
                {teamMembers.map((member, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="flex bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="w-1/3 bg-gradient-to-br from-kare-100 to-teal-100">
                      <img 
                        src={member.image} 
                        alt={member.name} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=324bbb&color=fff&size=256`;
                        }}
                      />
                    </div>
                    <div className="w-2/3 p-5">
                      <h3 className="font-bold text-xl text-kare-800">{member.name}</h3>
                      <p className="text-teal-500 mb-2 flex items-center">
                        {member.role}
                        {member.linkedIn && (
                          <a 
                            href={member.linkedIn} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="ml-2 text-kare-600 hover:text-teal-400 transition-colors"
                            aria-label={`LinkedIn profile of ${member.name}`}
                          >
                            <Linkedin size={16} />
                          </a>
                        )}
                      </p>
                      <p className="text-kare-600 text-sm">{member.bio}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
              
              <div className="bg-gradient-to-r from-kare-50 to-teal-50 rounded-lg p-6 border border-teal-200">
                <h3 className="font-bold text-xl text-kare-800 mb-4">Our Contributors Include:</h3>
                <motion.ul 
                  variants={staggerContainer}
                  initial="hidden"
                  animate="show"
                  className="grid grid-cols-1 md:grid-cols-2 gap-3"
                >
                  {[
                    "Long-term foreign residents who have navigated the system extensively",
                    "Community volunteers who help gather and verify information"
                  ].map((item, idx) => (
                    <motion.li 
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1, duration: 0.3 }}
                      className="flex items-start"
                    >
                      <span className="inline-block w-6 h-6 rounded-full bg-teal-100 text-kare-600 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">✓</span>
                      <span className="text-kare-700">{item}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </motion.div>
          )}

          {/* Roadmap Section */}
          {activeSection === "roadmap" && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-6 flex items-center">
                <Calendar className="mr-3 text-teal-400" />
                <span className="bg-clip-text text-transparent bg-gradient-logo">Our One Year Plan</span>
              </h2>
              
              <p className="text-lg text-kare-700 mb-8">
                We have an ambitious roadmap for the next year, focusing on expanding our services, 
                building community features, and establishing K-are as the go-to resource for 
                healthcare information in Korea.
              </p>

              <div className="space-y-6">
                {roadmapData.map((item, index) => (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="flex items-center group"
                  >
                    {/* Timeline connector */}
                    <div className="flex flex-col items-center mr-6">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${item.color} text-white flex items-center justify-center font-bold text-lg shadow-lg group-hover:scale-110 transition-transform`}>
                        {item.step}
                      </div>
                      {index < roadmapData.length - 1 && (
                        <div className="w-1 h-8 bg-gradient-to-b from-kare-300 to-teal-300 mt-2"></div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex items-center justify-between">
                      <div className={`bg-gradient-to-r ${item.color} text-white px-6 py-4 rounded-2xl shadow-md group-hover:shadow-lg transition-all flex-1 max-w-md`}>
                        <h3 className="font-semibold text-lg">{item.title}</h3>
                        {item.isSpecial && (
                          <div className="flex items-center mt-2">
                            <Star className="h-4 w-4 mr-1 fill-current" />
                            <Star className="h-4 w-4 mr-1 fill-current" />
                            <Star className="h-4 w-4 fill-current" />
                          </div>
                        )}
                      </div>
                      
                      <div className="ml-6 text-right">
                        <div className="text-lg font-bold text-teal-500">
                          {item.date}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="mt-10 bg-gradient-to-r from-kare-50 to-teal-50 rounded-xl p-6 border border-teal-200"
              >
                <h3 className="text-xl font-bold text-kare-800 mb-3">Our Vision for 2026</h3>
                <p className="text-kare-700">
                  By May 2026, K-are will be a registered company providing comprehensive healthcare 
                  support services to the international community in Korea. We aim to be the most 
                  trusted and reliable resource for healthcare navigation, with innovative features 
                  and strong community connections.
                </p>
              </motion.div>
            </motion.div>
          )}
          
          {/* Connect Section */}
          {activeSection === "connect" && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-6 flex items-center">
                <Heart className="mr-3 text-teal-400" />
                <span className="bg-clip-text text-transparent bg-gradient-logo">Connect With Us</span>
              </h2>
              
              <p className="text-lg text-kare-700 mb-8">
                We'd love to hear from you! Reach out to us through our social media channels 
                or send us an email with your questions, feedback, or interest in contributing.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {[
                  { 
                    icon: <Instagram size={28} />,
                    title: "Instagram",
                    description: "Follow us for updates, tips, and community stories",
                    link: "https://www.instagram.com/karekoreahealth/",
                    linkText: "Follow on Instagram",
                    color: "bg-gradient-to-r from-kare-600 to-purple-500"
                  },
                  { 
                    icon: <Linkedin size={28} />,
                    title: "LinkedIn",
                    description: "Connect for professional networking and updates",
                    link: "https://www.linkedin.com/company/k-are/posts/?feedView=all",
                    linkText: "Connect on LinkedIn",
                    color: "bg-gradient-to-r from-kare-600 to-blue-600"
                  },
                  { 
                    icon: <Mail size={28} />,
                    title: "Email",
                    description: "Questions, feedback, or want to contribute?",
                    link: "mailto:karekoreahealth@gmail.com",
                    linkText: "Send us an Email",
                    color: "bg-gradient-to-r from-kare-600 to-teal-500"
                  }
                ].map((channel, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1, duration: 0.4 }}
                    className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all hover:-translate-y-1"
                  >
                    <div className={`${channel.color} text-white p-6 flex items-center`}>
                      <div className="mr-4">
                        {channel.icon}
                      </div>
                      <h3 className="text-xl font-bold">{channel.title}</h3>
                    </div>
                    <div className="p-6 bg-white">
                      <p className="text-kare-700 mb-4">{channel.description}</p>
                      <a 
                        href={channel.link}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-block bg-gradient-to-r from-kare-600 to-teal-500 text-white py-2 px-4 rounded-md font-medium hover:from-kare-700 hover:to-teal-600 transition-colors"
                      >
                        {channel.linkText}
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center p-6 border-t border-kare-100 mt-6"
              >
                <p className="text-kare-700">
                  Thank you for being a part of K-are. We welcome your feedback and contributions to make this 
                  resource more valuable for everyone.
                </p>
              </motion.div>
            </motion.div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
