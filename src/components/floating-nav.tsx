import { useState, useEffect } from "react";
import { Link } from "wouter";
import { ChevronUp } from "lucide-react";

export function FloatingNav() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      const scrolled = document.documentElement.scrollTop || document.body.scrollTop;
      if (scrolled > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Check on mount
    toggleVisibility();

    window.addEventListener("scroll", toggleVisibility);
    document.addEventListener("scroll", toggleVisibility);
    
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
      document.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div 
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <button
        onClick={scrollToTop}
        className="group relative block"
        aria-label="Back to top"
      >
        {/* Tricolour shape inspired by your logo */}
        <div className="relative w-14 h-14 cursor-pointer transform transition-all duration-300 hover:scale-110">
          {/* Red section */}
          <div className="absolute top-1 left-1 w-8 h-5 bg-red-600 transform skew-x-12 rounded-sm shadow-lg"></div>
          {/* Gray section */}
          <div className="absolute top-3 left-3 w-8 h-5 bg-gray-400 transform skew-x-12 rounded-sm shadow-lg"></div>
          {/* Dark gray section */}
          <div className="absolute top-5 left-5 w-8 h-5 bg-gray-700 transform skew-x-12 rounded-sm shadow-lg"></div>
          
          {/* Up arrow */}
          <div className="absolute inset-0 flex items-center justify-center">
            <ChevronUp className="h-6 w-6 text-white drop-shadow-lg z-10" />
          </div>
        </div>
        
        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-3 px-3 py-2 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap shadow-lg">
          Back to Top
          <div className="absolute top-full right-3 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
      </button>
    </div>
  );
}