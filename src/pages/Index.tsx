import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import TopQuestions from "../components/TopQuestions";
import RecentNews from "../components/RecentNews";
import WelcomeSection from "../components/WelcomeSection";
import Footer from "../components/Footer";
import QuickHelp from "../components/QuickHelp";
import GuideSection from "../components/GuideSection";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Hero and Top Questions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          <div className="lg:col-span-2">
            <HeroSection />
          </div>
          <div>
            <TopQuestions />
          </div>
        </div>
        
        {/* Welcome Section */}
        <WelcomeSection />
        
        {/* Guide Section */}
        <div className="my-12">
          <GuideSection />
        </div>
        
        {/* Call to Action Section */}
        <div className="my-12 bg-gradient-to-r from-kare-50 to-lavender-50 rounded-xl p-8 shadow-sm">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-kare-800 mb-4">
              Need Healthcare Assistance in Korea?
            </h2>
            <p className="text-gray-700 mb-6 md:text-lg">
              Whether you're looking for a hospital, need insurance information, or have questions about medications,
              our resources are designed to help you navigate the Korean healthcare system with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/guide" 
                className="inline-flex items-center justify-center px-6 py-3 bg-kare-600 text-white rounded-md hover:bg-kare-700 transition-colors"
              >
                Browse Guide
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link 
                to="/contact" 
                className="inline-flex items-center justify-center px-6 py-3 bg-white border border-kare-200 text-kare-700 rounded-md hover:bg-kare-50 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
        
        {/* Recent News Section */}
        <RecentNews />
      </main>
      
      {/* Quick Help Floating Button */}
      <QuickHelp />
      
      <Footer />
    </div>
  );
};

export default Index;
