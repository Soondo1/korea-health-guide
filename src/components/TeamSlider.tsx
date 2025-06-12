import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Team member data type
interface TeamMember {
  name: string;
  role: string;
  image: string;
  linkedIn: string;
  bio?: string;
}

interface TeamSliderProps {
  teamMembers: TeamMember[];
  autoplaySpeed?: number;
  isPaused?: boolean;
}

const TeamSlider = ({ 
  teamMembers, 
  autoplaySpeed = 5000, 
  isPaused = false 
}: TeamSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const autoplayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Check for mobile devices
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Handle autoplay
  useEffect(() => {
    if (autoplayTimerRef.current) {
      clearTimeout(autoplayTimerRef.current);
    }
    
    if (!isPaused && !isHovered) {
      autoplayTimerRef.current = setTimeout(() => {
        goToNext();
      }, autoplaySpeed);
    }
    
    return () => {
      if (autoplayTimerRef.current) {
        clearTimeout(autoplayTimerRef.current);
      }
    };
  }, [currentIndex, isPaused, isHovered, autoplaySpeed]);

  // Calculate total number of slides (2 members per slide)
  const totalSlides = Math.ceil(teamMembers.length / 2);
  
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? totalSlides - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === totalSlides - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Touch handlers for swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    
    // Minimum swipe distance (in px)
    const minSwipeDistance = 50;
    
    if (Math.abs(diff) >= minSwipeDistance) {
      if (diff > 0) {
        // Swipe left, go next
        goToNext();
      } else {
        // Swipe right, go previous
        goToPrevious();
      }
    }
  };

  // Animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 500 : -500,
      opacity: 0,
    }),
  };

  // Determine animation direction based on index change
  const [[page, direction], setPage] = useState([0, 0]);

  useEffect(() => {
    const newDirection = page < currentIndex ? 1 : -1;
    setPage([currentIndex, newDirection]);
  }, [currentIndex]);

  return (
    <div 
      className="relative w-full max-w-3xl mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="overflow-hidden rounded-2xl relative h-[600px] sm:h-[450px] bg-gradient-to-r from-kare-50/50 to-teal-50/50">
        {/* Slide content */}
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute inset-0 flex items-center justify-center w-full"
          >
            <div className="flex w-full h-full flex-col md:flex-row">
              {/* First member in the pair */}
              {teamMembers[currentIndex * 2] && (
                <Link
                  to="/about#team"
                  className="relative group block w-full md:w-1/2 h-1/2 md:h-full border-r border-white/20"
                  aria-label={`View ${teamMembers[currentIndex * 2].name}'s profile`}
                >
                  <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
                    {/* Background image */}
                    <img
                      src={teamMembers[currentIndex * 2].image}
                      alt={teamMembers[currentIndex * 2].name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Overlay with name and role on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-kare-900/80 via-transparent to-transparent transition-opacity duration-300 flex flex-col items-center justify-end p-4 md:p-6">
                      <div className="text-center transform translate-y-0 group-hover:-translate-y-2 transition-transform duration-300">
                        <h3 className="text-white font-bold text-xl sm:text-2xl mb-1 md:mb-2">
                          {teamMembers[currentIndex * 2].name}
                        </h3>
                        <p className="text-kare-100 text-sm md:text-lg">
                          {teamMembers[currentIndex * 2].role}
                        </p>
                        <div className="mt-2 md:mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="inline-block bg-white text-kare-600 px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium">
                            View Profile
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              )}
              
              {/* Second member in the pair */}
              {teamMembers[currentIndex * 2 + 1] && (
                <Link
                  to="/about#team"
                  className="relative group block w-full md:w-1/2 h-1/2 md:h-full border-t md:border-t-0 md:border-l border-white/20"
                  aria-label={`View ${teamMembers[currentIndex * 2 + 1].name}'s profile`}
                >
                  <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
                    {/* Background image */}
                    <img
                      src={teamMembers[currentIndex * 2 + 1].image}
                      alt={teamMembers[currentIndex * 2 + 1].name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Overlay with name and role on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-kare-900/80 via-transparent to-transparent transition-opacity duration-300 flex flex-col items-center justify-end p-4 md:p-6">
                      <div className="text-center transform translate-y-0 group-hover:-translate-y-2 transition-transform duration-300">
                        <h3 className="text-white font-bold text-xl sm:text-2xl mb-1 md:mb-2">
                          {teamMembers[currentIndex * 2 + 1].name}
                        </h3>
                        <p className="text-kare-100 text-sm md:text-lg">
                          {teamMembers[currentIndex * 2 + 1].role}
                        </p>
                        <div className="mt-2 md:mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="inline-block bg-white text-kare-600 px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium">
                            View Profile
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons */}
        <button
          onClick={(e) => {
            e.preventDefault();
            goToPrevious();
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-kare-700 p-2 rounded-full z-10 opacity-70 hover:opacity-100 transition-opacity duration-300 shadow-md"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </button>
        
        <button
          onClick={(e) => {
            e.preventDefault();
            goToNext();
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-kare-700 p-2 rounded-full z-10 opacity-70 hover:opacity-100 transition-opacity duration-300 shadow-md"
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Indicator dots */}
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: totalSlides }, (_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? "bg-kare-600 w-6" 
                : "bg-kare-200 hover:bg-kare-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default TeamSlider; 