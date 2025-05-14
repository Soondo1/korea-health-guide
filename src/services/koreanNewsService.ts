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

// In a real implementation, these news would be fetched from actual APIs
// This is a mock implementation with simulated Korean news sources
const mockKoreaTimesNews: KoreanNewsItem[] = [
  {
    id: 'kt-1',
    title: 'Healthcare challenges for foreigners in Korea addressed in new policy',
    summary: 'The government has announced a new set of policies to improve healthcare access for foreigners living in Korea.',
    publishedAt: new Date(Date.now() - 3600000 * 24 * 2).toISOString(), // 2 days ago
    url: 'https://www.koreatimes.co.kr/www/nation/2023/04/113_12345.html',
    source: 'The Korea Times',
    sourceUrl: 'https://www.koreatimes.co.kr',
    imageUrl: 'https://via.placeholder.com/300x200?text=Korea+Times'
  },
  {
    id: 'kt-2',
    title: 'International clinics expanding in Seoul and Busan',
    summary: 'Major hospitals in Seoul and Busan are expanding their international clinics to meet growing demand from foreign residents.',
    publishedAt: new Date(Date.now() - 3600000 * 24 * 4).toISOString(), // 4 days ago
    url: 'https://www.koreatimes.co.kr/www/nation/2023/04/113_12346.html',
    source: 'The Korea Times',
    sourceUrl: 'https://www.koreatimes.co.kr',
    imageUrl: 'https://via.placeholder.com/300x200?text=Korea+Times'
  },
  {
    id: 'kt-3',
    title: 'COVID-19 guidelines updated for travelers to Korea',
    summary: 'The Korea Disease Control and Prevention Agency has updated COVID-19 guidelines for international travelers arriving in Korea.',
    publishedAt: new Date(Date.now() - 3600000 * 24 * 5).toISOString(), // 5 days ago
    url: 'https://www.koreatimes.co.kr/www/nation/2023/04/113_12347.html',
    source: 'The Korea Times',
    sourceUrl: 'https://www.koreatimes.co.kr',
    imageUrl: 'https://via.placeholder.com/300x200?text=Korea+Times'
  }
];

const mockKoreaHeraldNews: KoreanNewsItem[] = [
  {
    id: 'kh-1',
    title: 'National Health Insurance to expand coverage for foreign residents',
    summary: 'The National Health Insurance Service (NHIS) is set to expand coverage for foreign residents in Korea starting next month.',
    publishedAt: new Date(Date.now() - 3600000 * 24 * 1).toISOString(), // 1 day ago
    url: 'https://www.koreaherald.com/view.php?ud=20220510000000',
    source: 'The Korea Herald',
    sourceUrl: 'https://www.koreaherald.com',
    imageUrl: 'https://via.placeholder.com/300x200?text=Korea+Herald'
  },
  {
    id: 'kh-2',
    title: 'Korean medical AI technologies leading global healthcare innovation',
    summary: 'Korean companies are at the forefront of developing AI technologies for medical diagnosis and treatment.',
    publishedAt: new Date(Date.now() - 3600000 * 24 * 3).toISOString(), // 3 days ago
    url: 'https://www.koreaherald.com/view.php?ud=20220511000000',
    source: 'The Korea Herald',
    sourceUrl: 'https://www.koreaherald.com',
    imageUrl: 'https://via.placeholder.com/300x200?text=Korea+Herald'
  },
  {
    id: 'kh-3',
    title: 'Seoul launches multilingual healthcare hotline for foreigners',
    summary: 'The Seoul Metropolitan Government has launched a new 24/7 hotline providing healthcare information in 12 languages.',
    publishedAt: new Date(Date.now() - 3600000 * 24 * 6).toISOString(), // 6 days ago
    url: 'https://www.koreaherald.com/view.php?ud=20220512000000',
    source: 'The Korea Herald',
    sourceUrl: 'https://www.koreaherald.com',
    imageUrl: 'https://via.placeholder.com/300x200?text=Korea+Herald'
  }
];

export function fetchKoreanNews(limit: number = 10): Promise<KoreanNewsItem[]> {
  // In a real implementation, this would make API calls to Korean news sources
  // For now, we'll combine our mock data and sort by date
  const combinedNews = [...mockKoreaTimesNews, ...mockKoreaHeraldNews]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
  
  return Promise.resolve(combinedNews);
}

export function fetchKoreanNewsBySource(source: string, limit: number = 5): Promise<KoreanNewsItem[]> {
  let newsItems: KoreanNewsItem[] = [];
  
  if (source === 'The Korea Times') {
    newsItems = mockKoreaTimesNews;
  } else if (source === 'The Korea Herald') {
    newsItems = mockKoreaHeraldNews;
  } else {
    // Return all sources if not specified
    newsItems = [...mockKoreaTimesNews, ...mockKoreaHeraldNews];
  }
  
  return Promise.resolve(
    newsItems
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, limit)
  );
}

// Convert Korean news items to the format expected by the ScrollingBar component
export function convertToNewsItems(koreanNews: KoreanNewsItem[]): NewsItem[] {
  return koreanNews.map(news => ({
    _id: news.id,
    title: `${news.title} (${news.source})`,
    publishedAt: news.publishedAt
  }));
} 