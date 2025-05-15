import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LoadingSpinner from "../components/LoadingSpinner";
import { Search, Filter, ArrowUpDown, RefreshCw } from "lucide-react";
import { fetchPosts } from "@/services/sanityService";
import { Post } from "@/lib/sanity";
import { urlFor } from "@/lib/sanity";

const Articles = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRetrying, setIsRetrying] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  // Example categories
  const categories = [
    { id: "all", name: "All Articles" },
    { id: "insurance", name: "Insurance" },
    { id: "hospitals", name: "Hospitals" },
    { id: "medications", name: "Medications" },
    { id: "wellness", name: "Wellness" },
  ];

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        setError(null); // Reset any previous errors
        console.log("Loading posts...");
        const fetchedPosts = await fetchPosts();
        
        if (fetchedPosts.length === 0) {
          setError("No articles found. Please try again later.");
        } else {
          setPosts(fetchedPosts);
          setFilteredPosts(fetchedPosts);
          console.log(`Successfully loaded ${fetchedPosts.length} posts`);
        }
        
        setLoading(false);
      } catch (err) {
        console.error("Error fetching posts:", err);
        
        // Check for CORS errors
        const errorMessage = err instanceof Error ? err.message : String(err);
        if (errorMessage.includes('CORS') || errorMessage.includes('Access-Control-Allow-Origin')) {
          setError("CORS issue detected. Please check the console for more information on how to resolve this.");
        } else if (errorMessage.includes('network') || errorMessage.includes('Failed to fetch')) {
          setError("Network error. Please check your internet connection and try again.");
        } else if (errorMessage.includes('Sanity')) {
          setError("Error connecting to our content management system. We're working on fixing this.");
        } else {
          setError("Failed to load articles. Please try again later.");
        }
        
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  // Filter and sort posts based on search query, category, and sort order
  useEffect(() => {
    let result = [...posts];

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        post => 
          post.title.toLowerCase().includes(query) || 
          (post.summary && post.summary.toLowerCase().includes(query))
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      result = result.filter(post => 
        post.categories && post.categories.some(cat => cat.name.toLowerCase() === selectedCategory)
      );
    }

    // Sort by date
    result.sort((a, b) => {
      const dateA = new Date(a.publishedAt).getTime();
      const dateB = new Date(b.publishedAt).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

    setFilteredPosts(result);
  }, [posts, searchQuery, selectedCategory, sortOrder]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "newest" ? "oldest" : "newest");
  };

  const handleRetry = async () => {
    setIsRetrying(true);
    setLoading(true);
    setError(null);
    try {
      // Re-fetch the posts
      const fetchedPosts = await fetchPosts();
      setPosts(fetchedPosts);
      setFilteredPosts(fetchedPosts);
    } catch (err) {
      console.error("Retry failed:", err);
      const errorMessage = err instanceof Error ? err.message : String(err);
      setError(`Retry failed: ${errorMessage}`);
    } finally {
      setLoading(false);
      setIsRetrying(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
          <header className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-kare-800">Blog Articles</h1>
          </header>
          <div className="flex justify-center items-center py-16">
            <LoadingSpinner size="large" text={isRetrying ? "Retrying connection..." : "Loading articles..."} />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
          <header className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-kare-800">Blog Articles</h1>
          </header>
          <div className="bg-white shadow-sm rounded-lg p-8 text-center">
            <div className="text-red-500 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <h3 className="text-xl font-medium mb-2">{error}</h3>
              <p className="text-gray-600 mb-4">
                {error.includes('CORS') ? 
                  "This is a development configuration issue. Please follow instructions in the console." : 
                  "We're having trouble connecting to our content servers."}
              </p>
            </div>
            <button 
              onClick={handleRetry}
              disabled={isRetrying}
              className={`px-4 py-2 bg-kare-600 text-white rounded-md hover:bg-kare-700 transition-colors flex items-center justify-center mx-auto ${isRetrying ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isRetrying ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Retrying...
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Try Again
                </>
              )}
            </button>
            
            {/* Show fallback content notice if we're using mock data despite an error */}
            {posts.length > 0 && (
              <div className="mt-8 p-4 bg-blue-50 rounded-md text-blue-800">
                <p className="font-medium mb-2">
                  {error.includes('CORS') 
                    ? "Note: Showing sample content due to CORS issues connecting to Sanity CMS" 
                    : "Note: Showing sample content while we fix the connection issue"}
                </p>
                <p className="text-sm mb-3">
                  {error.includes('CORS') 
                    ? "To fix this, add http://localhost:3000 to the CORS allowed origins in your Sanity dashboard." 
                    : "We're experiencing temporary difficulties connecting to our content management system."}
                </p>
                <button 
                  onClick={() => setError(null)}
                  className="px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-md text-sm"
                >
                  View Sample Content
                </button>
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <header className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-kare-800">Blog Articles</h1>
          <p className="text-gray-600 mt-2">
            Insights, guides, and stories about healthcare in Korea for the foreign community
          </p>
        </header>
        
        {/* Search and Filter Controls */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-kare-300 focus:border-transparent"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
            
            {/* Sort Button */}
            <button
              onClick={toggleSortOrder}
              className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
            >
              <ArrowUpDown className="mr-2 h-4 w-4" />
              <span>{sortOrder === "newest" ? "Newest First" : "Oldest First"}</span>
            </button>
          </div>
          
          {/* Category Filter Pills */}
          <div className="mt-4 flex overflow-x-auto pb-2 scrollbar-hide space-x-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors
                  ${selectedCategory === category.id 
                    ? 'bg-kare-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        
        {filteredPosts.length === 0 ? (
          <div className="bg-white shadow-sm rounded-lg p-8 text-center">
            <h3 className="text-xl font-medium text-gray-800 mb-2">No Articles Found</h3>
            <p className="text-gray-600">
              Try adjusting your search or filter criteria to find what you're looking for.
            </p>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-500 mb-4">
              Showing {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredPosts.map((post) => (
                <div key={post._id} className="bg-white shadow-sm rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-w-16 aspect-h-9">
                    {post.mainImage ? (
                      <img 
                        src={urlFor(post.mainImage).width(600).url()} 
                        alt={post.title}
                        className="object-cover w-full h-48"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src = './placeholder.png';
                          console.warn(`Failed to load image for: ${post.title}`);
                        }}
                      />
                    ) : (
                      <img 
                        src="./placeholder.png"
                        alt={post.title}
                        className="object-cover w-full h-48"
                      />
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <span>{new Date(post.publishedAt).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</span>
                      {post.readingTime && (
                        <>
                          <span className="mx-2">•</span>
                          <span>{post.readingTime}</span>
                        </>
                      )}
                    </div>
                    
                    {post.categories && post.categories.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-2">
                        {post.categories.map((category, idx) => (
                          <span 
                            key={idx} 
                            className="inline-block bg-lavender-50 text-kare-700 px-2.5 py-0.5 rounded-full text-xs"
                          >
                            {category.name}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    <Link 
                      to={`/articles/${post.slug.current}`} 
                      className="block text-xl font-medium text-kare-800 hover:text-kare-600 mb-3"
                    >
                      {post.title}
                    </Link>
                    {post.summary && (
                      <p className="text-gray-600 mb-4 line-clamp-2">{post.summary}</p>
                    )}
                    <Link 
                      to={`/articles/${post.slug.current}`} 
                      className="inline-flex items-center text-kare-600 hover:text-kare-800 font-medium"
                    >
                      Read more
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Articles;
