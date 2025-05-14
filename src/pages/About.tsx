import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Instagram, Linkedin, Mail, Users, Target, Heart } from "lucide-react";
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
      name: "Shangbiao (Alex) Hong", 
      role: "Founder & CEO", 
      image: "/assets/placeholder.svg",
      linkedIn: "https://www.linkedin.com/in/shangbiao-hong/",
      bio: "Former healthcare administrator with expertise in creating solutions for international patients in Korea."
    },
    { 
      name: "Jayda Cez Lim", 
      role: "Healthcare Navigator", 
      image: "/assets/placeholder.svg",
      linkedIn: "https://www.linkedin.com/in/jayda-cez-lim/",
      bio: "Specializes in helping patients connect with the right healthcare providers in Korea."
    },
    { 
      name: "Ryan Tan Cher", 
      role: "Technology Lead", 
      image: "/assets/placeholder.svg",
      linkedIn: "https://www.linkedin.com/in/ryan-tan-cher/",
      bio: "Developing technological solutions to make healthcare more accessible to foreigners."
    },
    { 
      name: "Colleen Chapco", 
      role: "Outreach Coordinator", 
      image: "/assets/placeholder.svg",
      linkedIn: "https://www.linkedin.com/in/colleen-chapco/",
      bio: "Connecting with international communities to understand their healthcare needs."
    },
    { 
      name: "Jennifer R.", 
      role: "Patient Advocate", 
      image: "/assets/placeholder.svg",
      linkedIn: "https://www.linkedin.com/in/jennifer-r/",
      bio: "Advocates for international patients' rights and improved healthcare accessibility."
    },
    { 
      name: "Laura Montes", 
      role: "Content Creator", 
      image: "/assets/placeholder.svg",
      linkedIn: "https://www.linkedin.com/in/laura-montes/",
      bio: "Creates engaging healthcare content to educate the international community."
    },
    { 
      name: "Soondo Mutewa", 
      role: "Research Analyst", 
      image: "/assets/placeholder.svg",
      linkedIn: "https://www.linkedin.com/in/soondo-mutewa/",
      bio: "Researches healthcare trends and needs of foreign residents in Korea."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-lavender-50">
      <Navbar />
      
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-kare-800 mb-4">About K-are</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
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
            { id: "connect", label: "Connect", icon: <Heart size={18} /> }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`flex items-center px-5 py-2.5 rounded-full text-base font-medium transition-all duration-300 ${
                activeSection === item.id
                  ? "bg-kare-600 text-white shadow-md"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span className="mr-2">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </motion.div>
        
        <div className="bg-white shadow-lg rounded-2xl p-8 md:p-10">
          {/* Mission Section */}
          {activeSection === "mission" && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="prose prose-lg max-w-none"
            >
              <h2 className="text-3xl font-bold text-kare-700 mb-6 flex items-center">
                <Target className="mr-3 text-kare-600" />
                Our Mission
              </h2>
              
              <p className="text-lg leading-relaxed text-gray-700">
                K-are (short for "Korea Care") is a community-driven portal created to help foreigners 
                navigate the Korean healthcare system. Our goal is to provide up-to-date information 
                on hospitals, insurance, pharmacies, and healthcare services in English.
              </p>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="my-10 bg-lavender-50 rounded-xl p-8 border-l-4 border-kare-400 shadow-sm"
              >
                <blockquote className="italic text-xl text-gray-700 leading-relaxed">
                  "We created K-are because we experienced firsthand how difficult it can be to navigate 
                  healthcare as a foreigner in Korea. Our vision is a community where no one feels lost 
                  or alone when seeking medical help."
                </blockquote>
                <p className="text-right mt-4 font-medium text-kare-700">— Shangbiao (Alex) Hong, Founder & CEO</p>
              </motion.div>
              
              <p className="text-lg leading-relaxed text-gray-700">
                Whether you are a new resident or a long-term expat, we offer guides and personal stories 
                to make healthcare in Korea less intimidating. The site is maintained by volunteers and 
                healthcare professionals who understand the challenges of getting care in a new country.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                {[
                  { 
                    title: "Community-Driven", 
                    description: "Created by expatriates and healthcare professionals who understand the challenges.",
                    color: "bg-blue-50 border-blue-200" 
                  },
                  { 
                    title: "Practical Resources", 
                    description: "Real solutions to common healthcare challenges faced by foreigners.",
                    color: "bg-green-50 border-green-200" 
                  },
                  { 
                    title: "Accessible Information", 
                    description: "Making complex healthcare information easy to understand and navigate.",
                    color: "bg-amber-50 border-amber-200" 
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
                    <p className="text-gray-700">{card.description}</p>
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
              <h2 className="text-3xl font-bold text-kare-700 mb-6 flex items-center">
                <Users className="mr-3 text-kare-600" /> 
                Our Team
              </h2>
              
              <p className="text-lg text-gray-700 mb-8">
                K-are is run by a passionate team of expats and Koreans who have experienced the healthcare 
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
                    <div className="w-1/3 bg-lavender-100">
                      <img 
                        src={member.image} 
                        alt={member.name} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=8B5CF6&color=fff&size=256`;
                        }}
                      />
                    </div>
                    <div className="w-2/3 p-5">
                      <h3 className="font-bold text-xl text-kare-800">{member.name}</h3>
                      <p className="text-kare-600 mb-2 flex items-center">
                        {member.role}
                        {member.linkedIn && (
                          <a 
                            href={member.linkedIn} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="ml-2 text-blue-600 hover:text-blue-800 transition-colors"
                            aria-label={`LinkedIn profile of ${member.name}`}
                          >
                            <Linkedin size={16} />
                          </a>
                        )}
                      </p>
                      <p className="text-gray-600 text-sm">{member.bio}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
              
              <div className="bg-lavender-50 rounded-lg p-6 border border-lavender-200">
                <h3 className="font-bold text-xl text-kare-800 mb-4">Our Contributors Include:</h3>
                <motion.ul 
                  variants={staggerContainer}
                  initial="hidden"
                  animate="show"
                  className="grid grid-cols-1 md:grid-cols-2 gap-3"
                >
                  {[
                    "Healthcare professionals with experience treating international patients",
                    "Long-term foreign residents who have navigated the system extensively",
                    "Translators specializing in medical terminology",
                    "Community volunteers who help gather and verify information"
                  ].map((item, idx) => (
                    <motion.li 
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1, duration: 0.3 }}
                      className="flex items-start"
                    >
                      <span className="inline-block w-6 h-6 rounded-full bg-kare-100 text-kare-600 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">✓</span>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </motion.div>
          )}
          
          {/* Connect Section */}
          {activeSection === "connect" && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-kare-700 mb-6 flex items-center">
                <Heart className="mr-3 text-kare-600" />
                Connect With Us
              </h2>
              
              <p className="text-lg text-gray-700 mb-8">
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
                    color: "bg-gradient-to-r from-purple-500 to-pink-500"
                  },
                  { 
                    icon: <Linkedin size={28} />,
                    title: "LinkedIn",
                    description: "Connect for professional networking and updates",
                    link: "https://www.linkedin.com/company/k-are/posts/?feedView=all",
                    linkText: "Connect on LinkedIn",
                    color: "bg-blue-600"
                  },
                  { 
                    icon: <Mail size={28} />,
                    title: "Email",
                    description: "Questions, feedback, or want to contribute?",
                    link: "mailto:contact@k-are.org",
                    linkText: "Send us an Email",
                    color: "bg-kare-600"
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
                      <p className="text-gray-700 mb-4">{channel.description}</p>
                      <a 
                        href={channel.link}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-block bg-lavender-50 text-kare-700 py-2 px-4 rounded-md font-medium hover:bg-lavender-100 transition-colors"
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
                className="text-center p-6 border-t border-gray-200 mt-6"
              >
                <p className="text-gray-700">
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
