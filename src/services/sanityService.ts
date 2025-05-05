import { client } from '@/lib/sanity';
import { NewsItem, Category, CategoryItem, Post, BulletinPost } from '@/lib/sanity';

// Helper function for error handling
const handleSanityError = (error: any, context: string) => {
  console.error(`Error in ${context}:`, error);
  // Check if it's a network error
  if (error.message && error.message.includes('network')) {
    throw new Error('Network error. Please check your internet connection and try again.');
  }
  // Check if it's an API error
  if (error.statusCode) {
    throw new Error(`Sanity API error (${error.statusCode}): ${error.message || 'Unknown error'}`);
  }
  // Generic error
  throw new Error(`Failed to fetch data: ${error.message || 'Unknown error'}`);
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
      categories.map(async (category: any) => {
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

// Fetch blog posts
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
        "categories": categories[]->{ name }
      }
    `);
  } catch (error) {
    return handleSanityError(error, 'fetchPosts');
  }
}

// Fetch a single blog post by slug
export async function fetchPostBySlug(slug: string): Promise<Post | null> {
  try {
    const posts = await client.fetch(`
      *[_type == "post" && slug.current == $slug] {
        _id,
        title,
        slug,
        mainImage,
        publishedAt,
        body,
        "author": author->{ name, image },
        "categories": categories[]->{ name }
      }
    `, { slug });
    
    return posts.length > 0 ? posts[0] : null;
  } catch (error) {
    return handleSanityError(error, 'fetchPostBySlug');
  }
}
