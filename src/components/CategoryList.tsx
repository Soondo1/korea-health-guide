import React from 'react';
import { Category } from '@/lib/sanity';

interface CategoryListProps {
  category: Category;
  activeSort: 'latest' | 'hottest';
}

const CategoryList: React.FC<CategoryListProps> = ({ category, activeSort }) => {
  if (!category || category.items.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500">
        No items in this category
      </div>
    );
  }
  
  // Sort by date (for latest) or by some popularity metric (for hottest)
  const sortedItems = [...category.items].sort((a, b) => {
    // This is a placeholder; in a real app you would have actual date/popularity metrics
    if (activeSort === 'latest') {
      // Sort by most recent (assuming items have timestamps)
      return -1;
    } else {
      // Sort by popularity (assuming items have view counts or similar)
      return 1;
    }
  });
  
  return (
    <div className="space-y-3">
      {sortedItems.map(item => (
        <div 
          key={item._id}
          className="p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <div className="flex justify-between items-start mb-1">
            <h3 className="text-kare-800 font-medium">{item.title}</h3>
            {item.tags && item.tags.length > 0 && (
              <span className="inline-block bg-kare-100 text-kare-700 text-xs px-2 py-0.5 rounded-full">
                {item.tags[0]}
              </span>
            )}
          </div>
          
          {item.description && (
            <p className="text-gray-600 text-sm line-clamp-2">{item.description}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default CategoryList; 