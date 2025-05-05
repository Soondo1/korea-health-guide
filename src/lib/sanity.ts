
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

export const client = createClient({
  projectId: 'your-project-id', // Replace with your Sanity project ID
  dataset: 'production', // Replace with your dataset name
  useCdn: true, // Set to false when in development
  apiVersion: '2023-05-03', // Use the latest API version
});

// Set up the image URL builder
const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// Types for Sanity Content
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
