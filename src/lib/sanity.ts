
// This file contains types and mock functions that were previously using Sanity

// Types for Content
export interface NewsItem {
  _id: string;
  title: string;
}

export interface CategoryItem {
  _id: string;
  title: string;
}

export interface Category {
  _id: string;
  name: string;
  icon: string;
  description: string;
  items: CategoryItem[];
}

// Mock client for backward compatibility
export const client = {
  fetch: async () => {
    console.warn('Sanity client has been removed');
    return [];
  }
};

// Mock image URL builder function
export function urlFor(source: any) {
  console.warn('Sanity image URL builder has been removed');
  return {
    url: () => '',
    width: () => ({ height: () => ({ url: () => '' }) }),
    height: () => ({ width: () => ({ url: () => '' }) }),
    format: () => ({ url: () => '' }),
    quality: () => ({ url: () => '' }),
    fit: () => ({ url: () => '' }),
    crop: () => ({ url: () => '' }),
    auto: () => ({ url: () => '' }),
    dpr: () => ({ url: () => '' }),
    sharpen: () => ({ url: () => '' }),
    orientation: () => ({ url: () => '' }),
    image: () => ({})
  };
}
