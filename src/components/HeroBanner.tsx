import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, MapPin, Heart, Users, ArrowRight, Shield, Star, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useState, useEffect } from "react";
import { fetchPosts } from "@/services/sanityService";
import { Post } from "@/lib/sanity";
import { urlFor } from "@/lib/sanity";

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === Math.min(posts.length - 1, 2) ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? Math.min(posts.length - 1, 2) : prev - 1));
  };

  // Fetch actual blog posts
  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        const fetchedPosts = await fetchPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching posts for hero banner:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  // Auto-advance slides
useEffect(() => {
   if (posts.length === 0) return;
   
   const interval = setInterval(() => {
    setCurrentSlide((prev) => (prev === Math.min(posts.length - 1, 2) ? 0 : prev + 1));
   }, 2000);
   return () => clearInterval(interval);
}, [posts.length]);

  // Get the first 3 posts for the slideshow
  const slidePosts = posts.slice(0, 3);

  return (
    <section className="relative bg-gradient-to-r from-kare-700 via-kare-600 to-teal-500 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/10"></div>
      <div className="absolute inset-0 opacity-20">
        <div className="h-full w-full bg-white/5 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start lg:items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left flex flex-col justify-center h-full"
          >
            {/* Main Heading - matched from image */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 leading-tight"
            >
              Guided by Experience, <br />Driven by Care
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl sm:text-2xl text-teal-50 mb-10 max-w-2xl lg:max-w-none leading-relaxed"
            >
              Navigate an effortless and stress-free life in Korea with K-are.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 mb-8"
            >
              <Link
                to="/about"
                className="group bg-yellow-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-400 transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                About Us
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/guide?tab=hospitals"
                className="bg-kare-700/30 backdrop-blur-sm border border-kare-300/20 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-kare-700/50 transition-all duration-300 flex items-center justify-center"
              >
                Find Healthcare
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Content - Blog Post Slideshow */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative self-center"
          >
            {/* Slideshow with wavy effect */}
            <Carousel className="w-full">
              <CarouselContent>
                {loading ? (
                  <CarouselItem>
                    <div className="bg-white/15 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl mb-6 overflow-hidden relative h-80 flex items-center justify-center">
                      <div className="animate-pulse text-white">Loading blog posts...</div>
                    </div>
                  </CarouselItem>
                ) : slidePosts.length > 0 ? (
                  slidePosts.map((post) => (
                    <CarouselItem key={post._id}>
                      <Link to={`/articles/${post.slug.current}`}>
                        <motion.div 
                          className="bg-white/15 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl mb-6 overflow-hidden relative"
                          whileHover={{ scale: 1.03 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <div className="aspect-[16/9] overflow-hidden rounded-lg mb-4">
                            <img 
                              src={post.mainImage ? urlFor(post.mainImage).width(800).url() : '/assets/healthcare-levels.jpg'} 
                              alt={post.title}
                              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                              onError={(e) => {
                                // Fallback for missing images
                                const target = e.target as HTMLImageElement;
                                target.src = "https://via.placeholder.com/800x450?text=K-are+Blog+Post";
                              }}
                            />
                          </div>
                          <h3 className="font-bold text-2xl mb-3 text-white">{post.title}</h3>
                          {post.summary && (
                            <p className="text-white/80 text-sm line-clamp-2">{post.summary}</p>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-30 rounded-3xl"></div>
                        </motion.div>
                      </Link>
                    </CarouselItem>
                  ))
                ) : (
                  <CarouselItem>
                    <div className="bg-white/15 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl mb-6 overflow-hidden relative">
                      <div className="aspect-[16/9] overflow-hidden rounded-lg mb-4 bg-gray-700 flex items-center justify-center">
                        <Shield className="h-16 w-16 text-white/30" />
                      </div>
                      <h3 className="font-bold text-2xl mb-3 text-white">No blog posts available</h3>
                      <p className="text-white/80 text-sm">Check back soon for new content!</p>
                    </div>
                  </CarouselItem>
                )}
              </CarouselContent>
              <CarouselPrevious className="left-2 top-1/2" />
              <CarouselNext className="right-2 top-1/2" />
            </Carousel>
            
            {/* Read More button */}
            <div className="flex justify-center mt-4">
              <Link
                to="/articles"
                className="bg-white/10 backdrop-blur-sm text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 flex items-center justify-center"
              >
                Read More
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="rgb(249 250 251)"
          />
        </svg>
      </div>
    </section>
  );
} 