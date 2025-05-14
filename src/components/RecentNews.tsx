import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchKoreanNews, KoreanNewsItem } from "@/services/koreanNewsService";
import KoreanNewsSection from "./KoreanNewsSection";
import { Clock, ExternalLink } from "lucide-react";

// Mock data for articles (in a real app, this would be fetched from Sanity)
const mockArticles = [
  {
    slug: "new-medical-translation-service",
    title: "New Medical Translation Service Launched",
    summary: "A new service has been introduced in major hospitals to help foreigners communicate with medical staff.",
    publishedAt: "2024-04-20T10:00:00Z"
  },
  {
    slug: "free-vaccination-days-in-seoul",
    title: "Free Vaccination Days in Seoul",
    summary: "The Seoul Metropolitan Government is offering free vaccinations for registered foreigners throughout May.",
    publishedAt: "2024-04-15T14:30:00Z"
  },
  {
    slug: "top-hospitals-accepting-foreigners",
    title: "Top Hospitals Accepting Foreigners",
    summary: "Our community has compiled a list of the most foreigner-friendly hospitals across Korea with English-speaking staff.",
    publishedAt: "2024-04-10T09:15:00Z"
  }
];

export default function RecentNews() {
  const [koreanNews, setKoreanNews] = useState<KoreanNewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getKoreanNews = async () => {
      setIsLoading(true);
      try {
        const news = await fetchKoreanNews(4);
        setKoreanNews(news);
      } catch (error) {
        console.error("Error fetching Korean news:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getKoreanNews();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      {/* Korean News Section */}
      {!isLoading && koreanNews.length > 0 && <KoreanNewsSection news={koreanNews} />}
      
      {/* Original Articles Section */}
      <div className="flex items-center justify-between mb-5 border-b border-gray-100 pb-3">
        <h2 className="text-xl font-semibold text-kare-800">Latest Articles</h2>
        <Link 
          to="/articles" 
          className="text-kare-600 hover:text-kare-800 text-sm font-medium flex items-center bg-kare-50 px-3 py-1 rounded-md"
        >
          View all articles <ExternalLink className="h-3.5 w-3.5 ml-1" />
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {mockArticles.map((article) => (
          <Link 
            key={article.slug}
            to={`/articles/${article.slug}`}
            className="block bg-white border border-gray-100 rounded-lg p-5 hover:shadow-md transition-all hover:border-kare-200 group"
          >
            <h3 className="text-lg font-medium text-kare-800 group-hover:text-kare-600 mb-3 line-clamp-2">
              {article.title}
            </h3>
            <p className="text-gray-600 mb-4 text-sm line-clamp-3">{article.summary}</p>
            <div className="flex items-center text-gray-400 text-xs">
              <Clock className="h-3.5 w-3.5 mr-1.5" />
              {formatDate(article.publishedAt)}
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
