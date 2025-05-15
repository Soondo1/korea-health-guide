import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { TypedObject } from '@portabletext/types';

// Helper function for error handling
const handleSanityError = (error: unknown, context: string) => {
  if (error instanceof Error) {
    console.error(`Error in ${context}:`, error);
    // Check if it's a network error
    if (error.message && error.message.includes('network')) {
      throw new Error('Network error. Please check your internet connection and try again.');
    }
    // Check if it's an API error
    if ('statusCode' in error) {
      throw new Error(`Sanity API error (${error.statusCode}): ${error.message || 'Unknown error'}`);
    }
    // Generic error
    throw new Error(`Failed to fetch data: ${error.message || 'Unknown error'}`);
  }
  throw new Error(`Failed to fetch data: Unknown error type`);
};

// This file contains types and mock functions that were previously using Sanity

// Types for Content
export interface NewsItem {
  _id: string;
  title: string;
  publishedAt?: string;
}

export interface CategoryItem {
  _id: string;
  title: string;
  description?: string;
  tags?: string[];
}

export interface Category {
  _id: string;
  name: string;
  icon: string;
  description: string;
  items: CategoryItem[];
}

export interface ImageType {
  _type: string;
  asset: {
    _ref: string;
    _type: string;
  };
  alt?: string;
  caption?: string;
}

export interface Post {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  mainImage?: ImageType;
  publishedAt: string;
  body: TypedObject | TypedObject[];
  author?: {
    name: string;
    image?: ImageType;
  };
  categories?: Array<{
    name: string;
  }>;
  summary?: string;
  readingTime?: string;
}

export interface BulletinPost {
  _id: string;
  title: string;
  category: {
    _id: string;
    name: string;
  };
  publishedAt: string;
}

// Set up Sanity client
export const client = createClient({
  projectId: '4zq6kq5m', 
  dataset: 'k-are1',
  useCdn: false, // Disable CDN to avoid potential CORS issues
  apiVersion: '2023-05-03', // Use a stable API version
  token: import.meta.env.VITE_SANITY_API_TOKEN,
  withCredentials: false, // Changed to false - this was causing the CORS issue
  perspective: 'published' // Only fetch published content
});

// Set up image URL builder with better error handling
const builder = imageUrlBuilder(client);

export function urlFor(source: unknown) {
  try {
    if (!source) {
      console.warn('Attempted to generate URL for undefined image source');
      return {
        width: () => ({ url: () => './placeholder.png' }),
        height: () => ({ url: () => './placeholder.png' }),
        url: () => './placeholder.png'
      };
    }
    
    // Validate the image reference format
    const imgSource = source as SanityImageSource;
    if (imgSource && typeof imgSource === 'object' && 'asset' in imgSource) {
      const asset = imgSource.asset;
      if (typeof asset === 'object' && asset && '_ref' in asset) {
        const ref = asset._ref as string;
        if (!ref.startsWith('image-')) {
          console.warn('Invalid image reference format:', ref);
          return {
            width: () => ({ url: () => './placeholder.png' }),
            height: () => ({ url: () => './placeholder.png' }),
            url: () => './placeholder.png'
          };
        }
      }
    }
    
    return builder.image(source as SanityImageSource);
  } catch (error) {
    console.error('Error generating image URL:', error);
    return {
      width: () => ({ url: () => './placeholder.png' }),
      height: () => ({ url: () => './placeholder.png' }),
      url: () => './placeholder.png'
    };
  }
}
