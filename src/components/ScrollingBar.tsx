import React from 'react';
import { NewsItem } from '@/lib/sanity';
import { KoreanNewsItem } from '@/services/koreanNewsService';

interface ScrollingBarProps {
  newsItems: NewsItem[];
  koreanNews?: KoreanNewsItem[];
}

const ScrollingBar: React.FC<ScrollingBarProps> = ({ newsItems, koreanNews = [] }) => {
  const hasNews = newsItems.length > 0 || koreanNews.length > 0;

  if (!hasNews) {
    return (
      <div className="bg-gray-200 rounded p-4 h-full flex items-center justify-center">
        <p className="text-gray-500">No updates available</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-200 rounded h-full overflow-hidden flex flex-col">
      <div className="p-3 font-medium text-center text-gray-700 border-b border-gray-300">
        Headlines from Korea
      </div>
      <div className="overflow-y-auto p-3 flex-1">
        {/* Korean News Items */}
        {koreanNews.length > 0 && (
          <div className="mb-4">
            {koreanNews.map((news) => (
              <div 
                key={news.id}
                className="mb-3 pb-3 border-b border-gray-300"
              >
                <a 
                  href={news.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block"
                >
                  <h3 className="text-gray-800 font-medium hover:text-gray-600 cursor-pointer">
                    {news.title}
                  </h3>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <img 
                      src={`https://www.google.com/s2/favicons?domain=${news.sourceUrl}`} 
                      alt={news.source} 
                      className="h-3 w-3 mr-1"
                    />
                    <span className="font-medium mr-2">{news.source}</span>
                    {news.publishedAt && (
                      <span>
                        {new Date(news.publishedAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </a>
              </div>
            ))}
          </div>
        )}

        {/* Original News Items */}
        {newsItems.length > 0 && (
          <div>
            {koreanNews.length > 0 && (
              <div className="text-xs uppercase text-gray-500 font-semibold mb-2 mt-2 pt-2 border-t border-gray-300">
                Other Updates
              </div>
            )}
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
        )}
      </div>
    </div>
  );
};

export default ScrollingBar; 