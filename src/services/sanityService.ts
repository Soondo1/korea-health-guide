
import { client, NewsItem, Category } from '@/lib/sanity';

export async function fetchNewsItems(): Promise<NewsItem[]> {
  return client.fetch(`*[_type == "newsItem"] {
    _id,
    title
  }`);
}

export async function fetchCategories(): Promise<Category[]> {
  return client.fetch(`*[_type == "category"] {
    _id,
    name,
    icon,
    description,
    "items": items[]-> {
      _id,
      title
    }
  }`);
}
