import { NewsItem } from '@/lib/sanity';

export interface KoreanNewsItem {
  id: string;
  title: string;
  summary: string;
  publishedAt: string;
  url: string;
  source: string;
  sourceUrl: string;
  imageUrl?: string;
}

// News API endpoint - replace with your API key
const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY || 'DEMO_KEY';
const NEWS_API_ENDPOINT = 'https://newsapi.org/v2/everything';

// Helper function to transform news API response to our format
const transformNewsApiResponse = (articles: any[]): KoreanNewsItem[] => {
  return articles.map((article, index) => ({
    id: `news-${index}-${Date.now()}`,
    title: article.title || 'Untitled Article',
    summary: article.description || 'No description available.',
    publishedAt: article.publishedAt || new Date().toISOString(),
    url: article.url || '#',
    source: article.source?.name || 'Unknown Source',
    sourceUrl: article.url?.split('/').slice(0, 3).join('/') || '#',
    imageUrl: article.urlToImage || getPlaceholderImage(index)
  }));
};

// Get a placeholder image that exists
function getPlaceholderImage(index: number): string {
  const placeholders = [
    'https://images.unsplash.com/photo-1550831107-1553da8c8464?q=80&w=300&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1631549916768-4119b4220bb9?q=80&w=300&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1511174511562-5f7f18b874f8?q=80&w=300&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=300&auto=format&fit=crop'
  ];
  return placeholders[index % placeholders.length];
}

export async function fetchKoreanNews(limit: number = 10): Promise<KoreanNewsItem[]> {
  try {
    // Use Netlify function to fetch news (bypasses CORS and secures API key)
    const isProduction = import.meta.env.PROD;
    const functionUrl = isProduction 
      ? `/.netlify/functions/news?limit=${limit}`
      : `http://localhost:8888/.netlify/functions/news?limit=${limit}`;
    
    console.log(`Fetching news from Netlify function: ${functionUrl}`);
    
    try {
      const response = await fetch(functionUrl);
      
      if (!response.ok) {
        throw new Error(`News API returned status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.status === 'ok' && Array.isArray(data.articles) && data.articles.length > 0) {
        console.log(`Successfully retrieved ${data.articles.length} news articles`);
        return transformNewsApiResponse(data.articles);
      } else {
        console.warn("News API returned no articles or invalid format", data);
        throw new Error("Invalid data format from News API");
      }
    } catch (fetchError) {
      console.error("Error fetching from Netlify function:", fetchError);
      
      if (isProduction) {
        // In production, log the error but try to fallback to mock data
        console.warn("Using fallback data in production due to API error");
        return useFallbackData(limit);
      } else {
        // In development, show fallback message but also hint to start the Netlify dev server
        console.info(`
          Development environment detected. To test the Netlify function locally:
          1. Install Netlify CLI: npm install -g netlify-cli
          2. Run: netlify dev
          3. The function will be available at http://localhost:8888/.netlify/functions/news
          
          Using fallback data for now.
        `);
        return useFallbackData(limit);
      }
    }
  } catch (error) {
    console.error('Error in fetchKoreanNews:', error);
    return useFallbackData(limit);
  }
}

export function fetchKoreanNewsBySource(source: string, limit: number = 5): Promise<KoreanNewsItem[]> {
  return fetchKoreanNews(limit).then(news => {
    if (source === 'all') return news;
    return news.filter(item => item.source.includes(source)).slice(0, limit);
  });
}

// Convert Korean news items to the format expected by the ScrollingBar component
export function convertToNewsItems(koreanNews: KoreanNewsItem[]): NewsItem[] {
  return koreanNews.map(news => ({
    _id: news.id,
    title: `${news.title} (${news.source})`,
    publishedAt: news.publishedAt
  }));
}

// Fallback data function
function useFallbackData(limit: number): KoreanNewsItem[] {
  console.log('Using fallback Korean news data');
  
  const fallbackNews: KoreanNewsItem[] = [
    {
      id: 'fallback-1',
      title: 'Healthcare challenges for foreigners in Korea addressed in new policy',
      summary: 'The government has announced a new set of policies to improve healthcare access for foreigners living in Korea.',
      publishedAt: new Date().toISOString(),
      url: 'https://example.com/healthcare-policy',
      source: 'Korean Health News',
      sourceUrl: 'https://example.com',
      imageUrl: 'https://images.unsplash.com/photo-1550831107-1553da8c8464?q=80&w=300&auto=format&fit=crop'
    },
    {
      id: 'fallback-2',
      title: 'International clinics expanding in Seoul and Busan',
      summary: 'Major hospitals in Seoul and Busan are expanding their international clinics to meet growing demand from foreign residents.',
      publishedAt: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
      url: 'https://example.com/international-clinics',
      source: 'Korea Medical Journal',
      sourceUrl: 'https://example.com',
      imageUrl: 'https://images.unsplash.com/photo-1631549916768-4119b4220bb9?q=80&w=300&auto=format&fit=crop'
    },
    {
      id: 'fallback-3',
      title: 'COVID-19 guidelines updated for travelers to Korea',
      summary: 'The Korea Disease Control and Prevention Agency has updated COVID-19 guidelines for international travelers arriving in Korea.',
      publishedAt: new Date(Date.now() - 3600000 * 24 * 5).toISOString(),
      url: 'https://example.com/covid-guidelines',
      source: 'The Korea Times',
      sourceUrl: 'https://www.koreatimes.co.kr',
      imageUrl: 'https://images.unsplash.com/photo-1511174511562-5f7f18b874f8?q=80&w=300&auto=format&fit=crop'
    },
    {
      id: 'fallback-4',
      title: 'National Health Insurance coverage expansion for foreigners',
      summary: 'The National Health Insurance Service is set to expand coverage for foreign residents in Korea starting next month.',
      publishedAt: new Date(Date.now() - 3600000 * 24 * 1).toISOString(),
      url: 'https://example.com/insurance-expansion',
      source: 'The Korea Herald',
      sourceUrl: 'https://www.koreaherald.com',
      imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=300&auto=format&fit=crop'
    },
  ];
  
  return fallbackNews.slice(0, limit);
} 