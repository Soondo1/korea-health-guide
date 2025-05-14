import React from 'react';
import { client } from '@/lib/sanity';
import { NewsItem, Category, CategoryItem, Post, BulletinPost, ImageType } from '@/lib/sanity';
import { TypedObject } from '@portabletext/types';
import { PortableTextMarkComponentProps } from '@portabletext/react';
import { urlFor } from '@/lib/sanity';

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

// Fetch news items from Sanity
export async function fetchNewsItems(): Promise<NewsItem[]> {
  try {
    return await client.fetch(`
      *[_type == "newsItem"] | order(publishedAt desc) {
        _id,
        title,
        publishedAt
      }
    `);
  } catch (error) {
    return handleSanityError(error, 'fetchNewsItems');
  }
}

// Fetch bulletin board categories with their items
export async function fetchCategories(): Promise<Category[]> {
  try {
    // First, fetch all categories
    const categories = await client.fetch(`
      *[_type == "bulletinCategory"] {
        _id,
        name,
        description,
        icon
      }
    `);
    
    // For each category, fetch its items
    const categoriesWithItems = await Promise.all(
      categories.map(async (category: Category) => {
        try {
          const items = await client.fetch(`
            *[_type == "bulletinItem" && category._ref == $categoryId] {
              _id,
              title,
              description,
              tags
            }
          `, { categoryId: category._id });

          return {
            ...category,
            items
          };
        } catch (error) {
          console.error(`Error fetching items for category ${category.name}:`, error);
          return {
            ...category,
            items: [] // Return empty items if there's an error
          };
        }
      })
    );
    return categoriesWithItems;
  } catch (error) {
    return handleSanityError(error, 'fetchCategories');
  }
}

export async function fetchPosts(): Promise<Post[]> {
  try {
    return await client.fetch(`
      *[_type == "post"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        mainImage,
        publishedAt,
        summary,
        "readingTime": round(length(pt::text(body)) / 1500) + " min read",
        "categories": categories[]->{ name },
        body: body
      }
    `);
  } catch (error) {
    return handleSanityError(error, 'fetchPosts');
  }
}

export async function fetchPostBySlug(slug: string): Promise<Post | null> {
  try {
    console.log(`Attempting to fetch post with slug: ${slug}`);
    const post = await client.fetch(`
      *[_type == "post" && slug.current == $slug][0] {
        _id,
        title,
        slug,
        mainImage,
        publishedAt,
        summary,
        "readingTime": round(length(pt::text(body)) / 1500) + " min read",
        "categories": categories[]->{ name },
        body,
        "author": author->{ name, image }
      }
    `, { slug });
    
    console.log(`Post fetch result:`, post ? `Found post with title: ${post.title}` : 'No post found');
    return post || null;
  } catch (error) {
    console.error(`Error in fetchPostBySlug for slug ${slug}:`, error);
    handleSanityError(error, 'fetchPostBySlug');
    return null;
  }
}

// Simple type for component props
type ComponentProps = { children?: React.ReactNode };

export const portableTextComponents = {
  types: {
    image: ({ value }: { value: ImageType }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return React.createElement('div', { className: 'my-6' },
        React.createElement('img', {
          src: urlFor(value).width(800).url(),
          alt: value.alt || '',
          className: 'rounded-md w-full'
        }),
        value.caption && React.createElement('figcaption', {
          className: 'text-sm text-center text-gray-500 mt-2'
        }, value.caption)
      );
    },
    callout: ({ value }: any) => 
      React.createElement('div', {
        className: `p-4 my-6 rounded-md bg-${value.tone || 'blue'}-50 border-l-4 border-${value.tone || 'blue'}-500`
      }, React.createElement('p', { className: 'text-gray-800' }, value.text)),
  },
  marks: {
    link: ({ children, value }: PortableTextMarkComponentProps) => {
      const rel = value?.href && !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
      return React.createElement(
        'a',
        {
          href: value?.href,
          rel: rel,
          target: value?.blank ? '_blank' : '_self',
          className: "text-kare-600 hover:text-kare-800 underline"
        },
        children
      );
    },
    highlight: ({ children }: PortableTextMarkComponentProps) => 
      React.createElement('span', { className: 'bg-yellow-100 px-1 rounded' }, children),
  },
  block: {
    h1: ({ children }: ComponentProps) => 
      React.createElement('h1', { className: 'text-3xl font-bold mt-8 mb-4 text-kare-800' }, children),
    h2: ({ children }: ComponentProps) => 
      React.createElement('h2', { className: 'text-2xl font-bold mt-6 mb-3 text-kare-700' }, children),
    h3: ({ children }: ComponentProps) => 
      React.createElement('h3', { className: 'text-xl font-bold mt-5 mb-2 text-kare-600' }, children),
    normal: ({ children }: ComponentProps) => 
      React.createElement('p', { className: 'mb-4' }, children),
    blockquote: ({ children }: ComponentProps) => 
      React.createElement('blockquote', { className: 'border-l-4 border-kare-300 pl-4 italic my-6 text-gray-700' }, children),
  },
  list: {
    bullet: ({ children }: ComponentProps) => 
      React.createElement('ul', { className: 'list-disc pl-5 my-4 space-y-2' }, children),
    number: ({ children }: ComponentProps) => 
      React.createElement('ol', { className: 'list-decimal pl-5 my-4 space-y-2' }, children),
  },
  listItem: {
    bullet: ({ children }: ComponentProps) => 
      React.createElement('li', {}, children),
    number: ({ children }: ComponentProps) => 
      React.createElement('li', {}, children),
  },
};
