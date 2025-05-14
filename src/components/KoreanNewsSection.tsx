import React from 'react';
import { KoreanNewsItem } from '@/services/koreanNewsService';

interface KoreanNewsSectionProps {
  news: KoreanNewsItem[];
}

const KoreanNewsSection: React.FC<KoreanNewsSectionProps> = ({ news }) => {
  if (!news.length) {
    return null;
  }

  return (
    <div className="mb-8">
      <div className="flex items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Korean News Headlines</h2>
        <div className="ml-auto flex items-center space-x-3">
          <a 
            href="https://www.koreatimes.co.kr" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center text-sm text-gray-500 hover:text-gray-700"
          >
            <img 
              src="https://www.google.com/s2/favicons?domain=koreatimes.co.kr" 
              alt="Korea Times" 
              className="w-4 h-4 mr-1"
            />
            Korea Times
          </a>
          <a 
            href="https://www.koreaherald.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center text-sm text-gray-500 hover:text-gray-700"
          >
            <img 
              src="https://www.google.com/s2/favicons?domain=koreaherald.com" 
              alt="Korea Herald" 
              className="w-4 h-4 mr-1"
            />
            Korea Herald
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {news.map((item) => (
          <a 
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start space-x-4">
              {item.imageUrl && (
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-20 h-20 rounded object-cover flex-shrink-0"
                />
              )}
              <div>
                <div className="flex items-center mb-2">
                  <img 
                    src={`https://www.google.com/s2/favicons?domain=${item.sourceUrl}`} 
                    alt={item.source} 
                    className="w-3 h-3 mr-1.5"
                  />
                  <span className="text-xs font-medium text-gray-500">{item.source}</span>
                </div>
                <h3 className="font-medium text-gray-800 hover:text-kare-600 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">{item.summary}</p>
                <p className="text-xs text-gray-400">
                  {new Date(item.publishedAt).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </a>
        ))}
      </div>
      <p className="text-xs text-gray-500 mt-2 italic">
        News content sourced from The Korea Times and The Korea Herald.
        All rights belong to their respective owners.
      </p>
    </div>
  );
};

export default KoreanNewsSection; 