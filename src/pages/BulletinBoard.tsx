import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LoadingSpinner from "../components/LoadingSpinner";
import ScrollingBar from "../components/ScrollingBar";
import CalendarWidget from "../components/CalendarWidget";
import CategoryList from "../components/CategoryList";
import { fetchNewsItems, fetchCategories } from "@/services/sanityService";
import { NewsItem, Category } from "@/lib/sanity";

export default function BulletinBoard() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeSort, setActiveSort] = useState<'latest' | 'hottest'>('latest');
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch news items from Sanity
        const news = await fetchNewsItems();
        setNewsItems(news);
        
        // Fetch categories from Sanity
        const cats = await fetchCategories();
        setCategories(cats);
        
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data from Sanity:", err);
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
  
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Header */}
        <h1 className="text-xl font-bold mb-5">Headline</h1>
        
        <div className="flex flex-col md:flex-row gap-6 mb-6">
          {/* Left Column - Scrolling News */}
          <div className="w-full md:w-2/3 h-64">
            <ScrollingBar newsItems={newsItems} />
          </div>
          
          {/* Right Column - Calendar */}
          <div className="w-full md:w-1/3 h-64">
            <CalendarWidget />
          </div>
        </div>
        
        {/* Information Summary */}
        <div className="mb-6">
          <h2 className="text-base font-medium mb-1">Information Summary</h2>
          <p className="text-gray-600 text-sm">
            Latest resources and updates to help you navigate Korean healthcare
          </p>
        </div>
        
        {/* Categories Bar */}
        <div className="bg-gray-200 p-2 rounded mb-4 flex justify-between items-center text-sm">
          <div className="text-gray-700">
            Categories: <span className="font-medium">Daily Life Support, Policy News, Experience Activities, Benefits, Announcements</span>
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
        <CategoryList categories={categories} activeSort={activeSort} />
      </div>
      <Footer />
    </div>
  );
}
