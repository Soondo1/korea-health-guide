import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

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

export interface Post {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  mainImage?: any;
  publishedAt: string;
  body: any;
  author?: {
    name: string;
    image?: any;
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
  projectId: '4zq6kq5m', // You'll need to replace with your Sanity project ID
  dataset: 'k-are1',
  useCdn: true,
  apiVersion: '2024-04-01', // use the latest API version
});

// Set up image URL builder
const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}
