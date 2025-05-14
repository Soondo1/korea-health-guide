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
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
        {/* Hero Section - Full Width for Maximum Impact */}
        <div className="mb-8">
          <HeroSection />
        </div>
        
        {/* Welcome Section - Positioned Earlier for Context */}
        <WelcomeSection />
        
        {/* Two Column Layout for Common Questions and Guide */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-8">
          <div className="lg:col-span-1 order-2 lg:order-1">
            <TopQuestions />
          </div>
          <div className="lg:col-span-2 order-1 lg:order-2">
            <GuideSection />
          </div>
        </div>
        
        {/* Call to Action Section - Clear Visual Separation */}
        <div className="my-10 bg-gradient-to-r from-kare-50 to-lavender-50 rounded-xl p-5 sm:p-8 shadow-sm border border-kare-100">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-kare-800 mb-3 sm:mb-4">
              Need Healthcare Assistance in Korea?
            </h2>
            <p className="text-sm sm:text-base text-gray-700 mb-5 sm:mb-6 md:text-lg max-w-3xl mx-auto">
              Whether you're looking for a hospital, need insurance information, or have questions about medications,
              our resources are designed to help you navigate the Korean healthcare system with confidence.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-3xl mx-auto">
              <Link 
                to="/guide" 
                className="inline-flex items-center justify-center px-4 sm:px-6 py-3 bg-kare-600 text-white rounded-md hover:bg-kare-700 transition-colors font-medium"
              >
                Browse Guide
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link 
                to="/guide?tab=hospitals" 
                className="inline-flex items-center justify-center px-4 sm:px-6 py-3 bg-white border border-kare-200 text-kare-700 rounded-md hover:bg-kare-50 transition-colors"
              >
                Find Facilities
              </Link>
              <Link 
                to="/contact" 
                className="inline-flex items-center justify-center px-4 sm:px-6 py-3 bg-white border border-kare-200 text-kare-700 rounded-md hover:bg-kare-50 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
        
        {/* Recent News Section - Clearly Demarcated */}
        <div className="bg-white rounded-xl p-5 sm:p-8 shadow-sm border border-gray-100 my-8">
          <RecentNews />
        </div>
      </main>
      
      {/* Quick Help Floating Button */}
      <QuickHelp />
      
      <Footer />
    </div>
  );
};

export default Index;
