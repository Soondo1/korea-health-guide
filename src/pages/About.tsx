import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Instagram, Linkedin, Mail } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="bg-white shadow-sm rounded-xl p-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-kare-800">About K-are</h1>
          
          <div className="prose text-gray-700">
            <p className="text-lg">
              K-are (short for "Korea Care") is a community-driven portal created to help foreigners 
              navigate the Korean healthcare system. Our goal is to provide up-to-date information 
              on hospitals, insurance, pharmacies, and healthcare services in English.
            </p>
            
            <h2 className="text-2xl font-semibold text-kare-700 mt-8 mb-4">Our Mission</h2>
            <p>
              Whether you are a new resident or a long-term expat, we offer guides and personal stories 
              to make healthcare in Korea less intimidating. The site is maintained by volunteers and 
              healthcare professionals who understand the challenges of getting care in a new country.
            </p>
            
            <div className="my-8 bg-lavender-50 rounded-lg p-6">
              <blockquote className="italic border-l-4 border-kare-300 pl-4">
                "We created K-are because we experienced firsthand how difficult it can be to navigate 
                healthcare as a foreigner in Korea. Our vision is a community where no one feels lost 
                or alone when seeking medical help."
              </blockquote>
              <p className="text-right mt-2 font-medium text-kare-700">— Founder, K-are</p>
            </div>
            
            <h2 className="text-2xl font-semibold text-kare-700 mt-8 mb-4">Our Team</h2>
            <p>
              K-are is run by a passionate team of expats and Koreans who have experienced the healthcare 
              system from different perspectives. Our contributors include:
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>Healthcare professionals with experience treating international patients</li>
              <li>Long-term foreign residents who have navigated the system extensively</li>
              <li>Translators specializing in medical terminology</li>
              <li>Community volunteers who help gather and verify information</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-kare-700 mt-8 mb-4">Future Plans</h2>
            <p>
              We plan to continuously update the content and add new features to better serve the foreign 
              community in Korea, including:
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>Multilingual support for major languages spoken by foreigners in Korea</li>
              <li>A comprehensive directory of foreigner-friendly medical facilities</li>
              <li>Interactive tools for finding the right specialist or service</li>
              <li>Community Q&A section for personalized advice</li>
              <li>Mobile app for on-the-go access to healthcare information</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-kare-700 mt-8 mb-4">Connect With Us</h2>
            <p>
              We'd love to hear from you! Reach out to us through our social media channels:
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-6 items-start">
              <a 
                href="https://www.instagram.com/karekoreahealth/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center py-2 px-4 bg-lavender-50 rounded-md text-kare-700 hover:bg-lavender-100 transition-colors"
              >
                <Instagram className="mr-2" size={20} />
                <span>Follow us on Instagram</span>
              </a>
              
              <a 
                href="https://www.linkedin.com/company/k-are/posts/?feedView=all" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center py-2 px-4 bg-lavender-50 rounded-md text-kare-700 hover:bg-lavender-100 transition-colors"
              >
                <Linkedin className="mr-2" size={20} />
                <span>Connect on LinkedIn</span>
              </a>
              
              <a 
                href="mailto:contact@k-are.org" 
                className="flex items-center py-2 px-4 bg-lavender-50 rounded-md text-kare-700 hover:bg-lavender-100 transition-colors"
              >
                <Mail className="mr-2" size={20} />
                <span>Email Us</span>
              </a>
            </div>
            
            <p className="mt-8">
              Thank you for being a part of K-are. We welcome your feedback and contributions to make this 
              resource more valuable for everyone.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
