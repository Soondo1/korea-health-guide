import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchKoreanNews, KoreanNewsItem } from "@/services/koreanNewsService";
import KoreanNewsSection from "./KoreanNewsSection";
import { Clock, ExternalLink } from "lucide-react";
import { mockPosts } from "@/lib/mockData";

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
        {mockPosts.slice(0, 3).map((post) => (
          <Link 
            key={post._id}
            to={`/articles/${post.slug.current}`}
            className="block bg-white border border-gray-100 rounded-lg p-5 hover:shadow-md transition-all hover:border-kare-200 group"
          >
            <h3 className="text-lg font-medium text-kare-800 group-hover:text-kare-600 mb-3 line-clamp-2">
              {post.title}
            </h3>
            <p className="text-gray-600 mb-4 text-sm line-clamp-3">{post.summary}</p>
            <div className="flex items-center text-gray-400 text-xs">
              <Clock className="h-3.5 w-3.5 mr-1.5" />
              {formatDate(post.publishedAt)}
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
