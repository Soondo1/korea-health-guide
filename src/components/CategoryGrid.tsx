import React from 'react';
import { Category } from '@/lib/sanity';
import { FileText, Hospital, Book, Calendar, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

interface CategoryGridProps {
  categories: Category[];
  onSelectCategory: (categoryId: string) => void;
  activeCategory: string;
}

// Icon mapping for dynamic icon rendering
const iconMap: Record<string, React.ElementType> = {
  "fileText": FileText,
  "hospital": Hospital,
  "book": Book,
  "calendar": Calendar,
  "shield": Shield,
};

const CategoryGrid: React.FC<CategoryGridProps> = ({ 
  categories, 
  onSelectCategory,
  activeCategory
}) => {
  return (
    <div className="mt-6">
      {/* Category Filter Pills */}
      <div className="flex overflow-x-auto pb-3 scrollbar-hide space-x-2">
        <button 
          onClick={() => onSelectCategory('all')}
          className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors
            ${activeCategory === 'all' 
              ? 'bg-kare-600 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        >
          Total
        </button>
        
        {categories.map(category => {
          const IconComponent = iconMap[category.icon] || FileText;
          return (
            <button
              key={category._id}
              onClick={() => onSelectCategory(category._id)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center
                ${activeCategory === category._id 
                  ? 'bg-kare-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              <IconComponent className="h-4 w-4 mr-2" />
              {category.name}
            </button>
          );
        })}
      </div>
      
      {/* Category Items Grid */}
      <div className="mt-6">
        {categories.map(category => {
          // Only render items for the active category or show all if 'all' is selected
          if (activeCategory !== 'all' && activeCategory !== category._id) return null;
          
          return (
            <div key={category._id} className={activeCategory === 'all' ? 'mb-8' : ''}>
              {activeCategory === 'all' && (
                <div className="flex items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">{category.name}</h2>
                  <div className="ml-auto">
                    <button
                      onClick={() => onSelectCategory(category._id)}
                      className="text-kare-600 text-sm hover:underline flex items-center"
                    >
                      View All
                    </button>
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {category.items.map((item, index) => (
                  <motion.div
                    key={item._id || index}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100"
                  >
                    <h3 className="font-medium mb-2 text-kare-800">{item.title}</h3>
                    {item.description && (
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>
                    )}
                    <div className="flex flex-wrap gap-2 mt-3">
                      {item.tags && item.tags.map((tag, idx) => (
                        <span 
                          key={idx} 
                          className="inline-block bg-lavender-50 text-kare-700 px-2.5 py-0.5 rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                      {(!item.tags || item.tags.length === 0) && (
                        <>
                          <span className="inline-block bg-lavender-50 text-kare-700 px-2.5 py-0.5 rounded-full text-xs">
                            Healthcare
                          </span>
                          <span className="inline-block bg-kare-50 text-kare-700 px-2.5 py-0.5 rounded-full text-xs">
                            Guide
                          </span>
                        </>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryGrid; 