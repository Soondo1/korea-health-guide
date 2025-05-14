import React from 'react';
import { Category } from '@/lib/sanity';

interface CategoryListProps {
  categories: Category[];
  activeSort: 'latest' | 'hottest';
}

const CategoryList: React.FC<CategoryListProps> = ({ categories, activeSort }) => {
  // No need to filter here since we're now filtering in the parent component
  if (categories.length === 0) {
    return (
      <div className="text-center py-6 text-gray-500">
        No categories available
      </div>
    );
  }
  
  // Simple implementation showing all categories in one list
  return (
    <div className="bg-white border border-gray-200 rounded">
      {categories.map((category, index) => (
        <div 
          key={category._id} 
          className={`p-3 ${index !== categories.length - 1 ? 'border-b border-gray-200' : ''}`}
        >
          <h3 className="font-medium text-gray-800 mb-2">{category.name}</h3>
          
          {category.items.length === 0 ? (
            <p className="text-gray-500 text-sm">No items in this category</p>
          ) : (
            <div className="space-y-2">
              {category.items
                // Sort based on activeSort (this is just a simple example)
                .sort((a, b) => activeSort === 'latest' ? -1 : 1)
                .slice(0, 3) // Limit to first 3 items per category for simplicity
                .map(item => (
                  <div key={item._id} className="text-sm">
                    <span className="text-gray-800 hover:underline cursor-pointer">{item.title}</span>
                    {item.tags && item.tags.length > 0 && (
                      <span className="text-xs text-gray-500 ml-2">
                        {item.tags[0]}
                      </span>
                    )}
                  </div>
                ))
              }
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CategoryList; 