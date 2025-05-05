import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LoadingSpinner from "../components/LoadingSpinner";
import NewsTicker from "../components/NewsTicker";
import CategoryGrid from "../components/CategoryGrid";
import { fetchNewsItems, fetchCategories } from "@/services/sanityService";
import { NewsItem, Category } from "@/lib/sanity";

export default function BulletinBoard() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
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
  
  const handleCategorySelect = (categoryId: string) => {
    setActiveCategory(categoryId);
  };
  
  // Handle loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container py-8 max-w-6xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8 text-center text-kare-800">Healthcare Bulletin</h1>
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
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container py-8 max-w-6xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8 text-center text-kare-800">Healthcare Bulletin</h1>
          <div className="flex justify-center items-center h-64">
            <p className="text-lg text-red-500">{error}</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container py-8 max-w-5xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6 text-kare-800">Healthcare Bulletin</h1>
        <p className="text-gray-600 mb-8">
          The latest resources and updates to help you navigate Korean healthcare
        </p>
        
        {/* News Ticker */}
        {newsItems.length > 0 && (
          <div className="mb-8">
            <NewsTicker newsItems={newsItems} />
          </div>
        )}
        
        {/* Category Grid */}
        {categories.length > 0 && (
          <CategoryGrid 
            categories={categories} 
            onSelectCategory={handleCategorySelect}
            activeCategory={activeCategory}
          />
        )}
      </div>
      <Footer />
    </div>
  );
}
