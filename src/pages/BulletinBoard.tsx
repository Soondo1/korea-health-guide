import { useState, useEffect, useMemo } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LoadingSpinner from "../components/LoadingSpinner";
import ScrollingBar from "../components/ScrollingBar";
import CalendarWidget from "../components/CalendarWidget";
import Calendar from "../components/Calendar";
import CategoryList from "../components/CategoryList";
import { fetchNewsItems, fetchCategories } from "@/services/sanityService";
import { KoreanNewsItem, fetchKoreanNews, convertToNewsItems } from "@/services/koreanNewsService";
import { NewsItem, Category } from "@/lib/sanity";
import { ChevronDown, Search, Filter, Calendar as CalendarIcon, Info, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

// Category names from the image
const categoryNames = [
  "Daily Life Support",
  "Policy News",
  "Experience Activities",
  "Benefits",
  "Announcements"
];

export default function BulletinBoard() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [koreanNews, setKoreanNews] = useState<KoreanNewsItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeSort, setActiveSort] = useState<'latest' | 'hottest'>('latest');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeView, setActiveView] = useState<'bulletin' | 'calendar'>('bulletin');
  
  // Define fetchData outside of useEffect so it can be referenced elsewhere
  const fetchData = async () => {
    try {
      setLoading(true);
      
      try {
        // Fetch news items from Sanity
        const news = await fetchNewsItems();
        setNewsItems(news);
      } catch (err) {
        console.error("Error fetching news items:", err);
        // Continue with other fetches even if this one fails
        setNewsItems([]);
      }
      
      try {
        // Fetch Korean news
        const kNews = await fetchKoreanNews(5);
        setKoreanNews(kNews);
      } catch (err) {
        console.error("Error fetching Korean news:", err);
        // Continue with other fetches even if this one fails
        setKoreanNews([]);
      }
      
      try {
        // Fetch categories from Sanity
        const cats = await fetchCategories();
        setCategories(cats);
      } catch (err) {
        console.error("Error fetching categories:", err);
        // Continue with other fetches even if this one fails
        setCategories([]);
      }
      
      setLoading(false);
    } catch (err) {
      console.error("Error in main fetchData function:", err);
      
      // Check for CORS errors
      const errorMessage = err instanceof Error ? err.message : String(err);
      if (errorMessage.includes('CORS') || errorMessage.includes('Access-Control-Allow-Origin')) {
        setError("CORS issue detected. For local development, you may need to configure Sanity to allow requests from localhost.");
      } else {
        setError("Failed to load content. Please try again later.");
      }
      
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);
  
  // Filter categories based on selection and search query
  const filteredCategories = useMemo(() => {
    let filtered = categories;
    
    // Filter by category if selected
    if (selectedCategory) {
      filtered = filtered.filter(cat => cat.name === selectedCategory);
    }
    
    // Filter by search query if provided
    if (searchQuery.trim()) {
      const lowercaseQuery = searchQuery.toLowerCase().trim();
      filtered = filtered.map(category => {
        // Filter items within each category
        const filteredItems = category.items?.filter(item => 
          item.title.toLowerCase().includes(lowercaseQuery) || 
          (item.description && item.description.toLowerCase().includes(lowercaseQuery)) ||
          (item.tags && item.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)))
        ) || [];
        
        // Return the category with filtered items
        return {
          ...category,
          items: filteredItems
        };
      }).filter(category => category.items.length > 0); // Only keep categories with matching items
    }
    
    return filtered;
  }, [categories, selectedCategory, searchQuery]);
  
  const hasSearchResults = filteredCategories.length > 0 && filteredCategories.some(cat => cat.items?.length > 0);
  const totalItems = filteredCategories.reduce((sum, cat) => sum + (cat.items?.length || 0), 0);
  
  // Handle loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="container py-8 max-w-6xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8 text-center text-kare-800">
            Bulletin Board
          </h1>
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
          <div className="flex flex-col justify-center items-center h-64">
            <div className="text-red-500 mb-4 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <p className="text-lg">{error}</p>
            </div>
            <button 
              onClick={() => {
                setLoading(true);
                setError(null);
                fetchData();
              }}
              className="px-4 py-2 bg-kare-600 text-white rounded-md hover:bg-kare-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-kare-800 mb-2">Bulletin Board</h1>
          <p className="text-gray-600">The latest resources and updates for the international community in Korea</p>
        </div>
        
        {/* View Switcher Tabs */}
        <Tabs defaultValue="bulletin" className="mb-6">
          <TabsList className="mb-4 bg-gray-100">
            <TabsTrigger 
              value="bulletin" 
              onClick={() => setActiveView('bulletin')}
              className="data-[state=active]:bg-kare-600 data-[state=active]:text-white"
            >
              <span className="flex items-center">
                <Info className="w-4 h-4 mr-2" />
                Bulletin Board
              </span>
            </TabsTrigger>
            <TabsTrigger 
              value="calendar" 
              onClick={() => setActiveView('calendar')}
              className="data-[state=active]:bg-kare-600 data-[state=active]:text-white"
            >
              <span className="flex items-center">
                <CalendarIcon className="w-4 h-4 mr-2" />
                Calendar View
              </span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="bulletin" className="m-0">
            <div className="mb-8 bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="bg-kare-50 p-4 border-b border-kare-100">
                <h2 className="text-lg font-semibold mb-1 text-kare-800">Korean News Headlines</h2>
                <p className="text-sm text-gray-600">Stay updated with the latest news from Korea</p>
              </div>
              
              <div className="flex flex-col md:flex-row p-4 gap-6">
                {/* Left Column - Scrolling News */}
                <div className="w-full md:w-2/3 h-64">
                  <ScrollingBar 
                    newsItems={newsItems} 
                    koreanNews={koreanNews}
                  />
                </div>
                
                {/* Right Column - Calendar */}
                <div className="w-full md:w-1/3 h-64 overflow-auto">
                  <Calendar />
                </div>
              </div>
              
              {/* Source Attribution */}
              <div className="px-4 pb-4 text-xs text-gray-500 flex items-center space-x-4 flex-wrap">
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
            </div>
            
            {/* Search and Filter Bar */}
            <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search bulletins..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-full"
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="inline-flex items-center gap-1 px-3 py-2 bg-gray-100 rounded border border-gray-200 hover:bg-gray-200 transition-colors">
                      <Filter className="h-4 w-4 mr-1" />
                      {selectedCategory || "All Categories"}
                      <ChevronDown className="h-4 w-4 ml-1" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuItem onClick={() => setSelectedCategory(null)} className="cursor-pointer">
                        All Categories
                      </DropdownMenuItem>
                      {categoryNames.map((category) => (
                        <DropdownMenuItem 
                          key={category} 
                          onClick={() => setSelectedCategory(category)}
                          className="cursor-pointer"
                        >
                          {category}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  
                  <div className="flex bg-gray-100 rounded-md overflow-hidden border border-gray-200">
                    <button 
                      className={`px-3 py-2 text-sm ${activeSort === 'latest' ? 'bg-kare-600 text-white' : 'hover:bg-gray-200'} transition-colors`}
                      onClick={() => setActiveSort('latest')}
                    >
                      Latest
                    </button>
                    <button 
                      className={`px-3 py-2 text-sm ${activeSort === 'hottest' ? 'bg-kare-600 text-white' : 'hover:bg-gray-200'} transition-colors`}
                      onClick={() => setActiveSort('hottest')}
                    >
                      Popular
                    </button>
                  </div>
                </div>
              </div>
              
              {searchQuery && (
                <div className="mt-3 text-sm text-gray-600">
                  {hasSearchResults ? (
                    <span>Found {totalItems} results for "<strong>{searchQuery}</strong>"</span>
                  ) : (
                    <span>No results found for "<strong>{searchQuery}</strong>"</span>
                  )}
                </div>
              )}
            </div>
            
            {/* Results */}
            {filteredCategories.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <p className="text-gray-500">No matching bulletins found</p>
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery("")}
                    className="mt-2 text-kare-600 hover:text-kare-800 text-sm"
                  >
                    Clear search
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                {/* Bulletin Board Content using CategoryList */}
                {filteredCategories.map((category) => (
                  <div
                    key={category._id}
                    className="bg-white rounded-lg shadow-sm overflow-hidden"
                  >
                    <div className="bg-kare-50 p-4 border-b border-gray-100 flex justify-between items-center">
                      <div>
                        <h2 className="text-lg font-semibold text-kare-800">{category.name}</h2>
                        <p className="text-sm text-gray-600">{category.description}</p>
                      </div>
                      {category.items && category.items.length > 3 && (
                        <button className="text-kare-600 hover:text-kare-800 text-sm flex items-center">
                          View all <ArrowUpRight className="ml-1 h-3 w-3" />
                        </button>
                      )}
                    </div>
                    <div className="p-4">
                      <CategoryList category={category} activeSort={activeSort} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="calendar" className="m-0">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4 text-kare-800">Calendar View</h2>
              <div className="h-[500px]">
                <Calendar />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
}
