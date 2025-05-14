import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LoadingSpinner from "../components/LoadingSpinner";
import ScrollingBar from "../components/ScrollingBar";
import CalendarWidget from "../components/CalendarWidget";
import CategoryList from "../components/CategoryList";
import { fetchNewsItems, fetchCategories } from "@/services/sanityService";
import { KoreanNewsItem, fetchKoreanNews, convertToNewsItems } from "@/services/koreanNewsService";
import { NewsItem, Category } from "@/lib/sanity";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function BulletinBoard() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [koreanNews, setKoreanNews] = useState<KoreanNewsItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeSort, setActiveSort] = useState<'latest' | 'hottest'>('latest');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch news items from Sanity
        const news = await fetchNewsItems();
        setNewsItems(news);
        
        // Fetch Korean news
        const kNews = await fetchKoreanNews(5);
        setKoreanNews(kNews);
        
        // Fetch categories from Sanity
        const cats = await fetchCategories();
        setCategories(cats);
        
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load content. Please try again later.");
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Handle loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="container py-8 max-w-6xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8 text-center text-kare-800">Bulletin Board</h1>
          <div className="flex justify-center items-center h-64">
            <LoadingSpinner size="large" text="Loading content..." />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  // Handle error state
  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="container py-8 max-w-6xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8 text-center text-kare-800">Bulletin Board</h1>
          <div className="flex justify-center items-center h-64">
            <p className="text-lg text-red-500">{error}</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  // Category names from the image
  const categoryNames = [
    "Daily Life Support",
    "Policy News",
    "Experience Activities",
    "Benefits",
    "Announcements"
  ];
  
  // Filter categories based on selection
  const filteredCategories = selectedCategory 
    ? categories.filter(cat => cat.name === selectedCategory)
    : categories;
  
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Header */}
        <h1 className="text-xl font-bold mb-5">Headlines from Korean News Sources</h1>
        
        <div className="flex flex-col md:flex-row gap-6 mb-6">
          {/* Left Column - Scrolling News */}
          <div className="w-full md:w-2/3 h-64">
            <ScrollingBar 
              newsItems={newsItems} 
              koreanNews={koreanNews}
            />
          </div>
          
          {/* Right Column - Calendar */}
          <div className="w-full md:w-1/3 h-64">
            <CalendarWidget />
          </div>
        </div>
        
        {/* Source Attribution */}
        <div className="mb-6 text-xs text-gray-500 flex items-center space-x-4">
          <span>News Sources:</span>
          <a 
            href="https://www.koreatimes.co.kr" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center hover:text-gray-700"
          >
            <img 
              src="https://www.google.com/s2/favicons?domain=koreatimes.co.kr" 
              alt="Korea Times" 
              className="w-3 h-3 mr-1"
            />
            The Korea Times
          </a>
          <a 
            href="https://www.koreaherald.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center hover:text-gray-700"
          >
            <img 
              src="https://www.google.com/s2/favicons?domain=koreaherald.com" 
              alt="Korea Herald" 
              className="w-3 h-3 mr-1"
            />
            The Korea Herald
          </a>
        </div>
        
        {/* Information Summary */}
        <div className="mb-6">
          <h2 className="text-base font-medium mb-1">Information Summary</h2>
          <p className="text-gray-600 text-sm">
            Latest resources and updates to help you navigate Korean healthcare
          </p>
        </div>
        
        {/* Categories Bar with Dropdown */}
        <div className="bg-gray-200 p-2 rounded mb-4 flex justify-between items-center text-sm">
          <div className="text-gray-700 flex items-center">
            Categories: 
            <DropdownMenu>
              <DropdownMenuTrigger className="inline-flex items-center gap-1 px-2 py-1 ml-1 bg-white rounded border border-gray-300 hover:bg-gray-50">
                {selectedCategory || "All Categories"}
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem onClick={() => setSelectedCategory(null)}>
                  All Categories
                </DropdownMenuItem>
                {categoryNames.map((category) => (
                  <DropdownMenuItem 
                    key={category} 
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div className="flex items-center">
            <button 
              className={`px-2 py-1 ${activeSort === 'latest' ? 'font-bold' : ''}`}
              onClick={() => setActiveSort('latest')}
            >
              Latest
            </button>
            <span className="text-gray-500 mx-1">|</span>
            <button 
              className={`px-2 py-1 ${activeSort === 'hottest' ? 'font-bold' : ''}`}
              onClick={() => setActiveSort('hottest')}
            >
              Hottest
            </button>
          </div>
        </div>
        
        {/* Bulletin Board Content using CategoryList */}
        <CategoryList categories={filteredCategories} activeSort={activeSort} />
      </div>
      <Footer />
    </div>
  );
}
