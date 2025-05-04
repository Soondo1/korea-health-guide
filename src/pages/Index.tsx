
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import TopQuestions from "../components/TopQuestions";
import RecentNews from "../components/RecentNews";
import WelcomeSection from "../components/WelcomeSection";

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
        
        {/* Recent News Section */}
        <RecentNews />
      </main>
      
      <footer className="bg-gray-50 border-t mt-16 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <div className="text-xl font-bold text-kare-700 font-serif">K-are</div>
              <p className="mt-2 text-sm text-gray-500">
                Helping foreigners navigate Korean healthcare
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-800 tracking-wider uppercase mb-2">
                  Resources
                </h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="text-gray-600 hover:text-kare-600">Guides</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-kare-600">Hospital Directory</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-kare-600">Insurance FAQ</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-800 tracking-wider uppercase mb-2">
                  Community
                </h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="text-gray-600 hover:text-kare-600">Forums</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-kare-600">Stories</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-kare-600">Events</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-800 tracking-wider uppercase mb-2">
                  Company
                </h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="/about" className="text-gray-600 hover:text-kare-600">About</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-kare-600">Contact</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-kare-600">Privacy</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-200 pt-6">
            <p className="text-sm text-gray-400 text-center">
              © {new Date().getFullYear()} K-are. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
