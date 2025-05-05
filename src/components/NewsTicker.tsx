import React from 'react';
import { NewsItem } from '@/lib/sanity';
import { ArrowUpDown } from 'lucide-react';

interface NewsTickerProps {
  newsItems: NewsItem[];
}

const NewsTicker: React.FC<NewsTickerProps> = ({ newsItems }) => {
  if (!newsItems.length) return null;

  // Duplicate items for continuous scrolling effect
  const duplicatedItems = [...newsItems, ...newsItems];

  return (
    <div className="w-full bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="bg-kare-50 text-kare-800 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center">
          <ArrowUpDown size={16} className="mr-2" />
          <span className="font-semibold">Latest Updates</span>
        </div>
        <span className="text-xs text-kare-600 bg-kare-100 px-2 py-1 rounded-full">LIVE</span>
      </div>
      
      <div className="relative overflow-hidden py-3 px-2">
        <div className="animate-marquee whitespace-nowrap">
          {duplicatedItems.map((item, idx) => (
            <div 
              key={`${item._id}-${idx}`} 
              className="inline-block mx-3"
            >
              <div className="flex items-center">
                <span className="text-kare-700 hover:text-kare-900 cursor-pointer">
                  {item.title}
                </span>
                <span className="mx-4 text-gray-300">•</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsTicker; 