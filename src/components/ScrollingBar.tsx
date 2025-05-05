import React from 'react';
import { NewsItem } from '@/lib/sanity';

interface ScrollingBarProps {
  newsItems: NewsItem[];
}

const ScrollingBar: React.FC<ScrollingBarProps> = ({ newsItems }) => {
  if (!newsItems.length) {
    return (
      <div className="bg-gray-200 rounded p-4 h-full flex items-center justify-center">
        <p className="text-gray-500">No updates available</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-200 rounded h-full overflow-hidden flex flex-col">
      <div className="p-3 font-medium text-center text-gray-700 border-b border-gray-300">
        Scrolling Bar
      </div>
      <div className="overflow-y-auto p-3 flex-1">
        {newsItems.map((item) => (
          <div 
            key={item._id}
            className="mb-3 pb-3 border-b border-gray-300 last:border-0"
          >
            <h3 className="text-gray-800 font-medium hover:text-gray-600 cursor-pointer">
              {item.title}
            </h3>
            {item.publishedAt && (
              <div className="text-xs text-gray-500 mt-1">
                {new Date(item.publishedAt).toLocaleDateString()}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollingBar; 