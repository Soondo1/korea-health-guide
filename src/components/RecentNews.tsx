
import { Link } from "react-router-dom";

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
  return (
    <section className="py-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Recent News</h2>
        <Link to="/articles" className="text-kare-600 hover:text-kare-800 text-sm font-medium">
          View all articles →
        </Link>
      </div>
      <div className="space-y-6">
        {mockArticles.map((article) => (
          <div key={article.slug} className="border-b border-gray-100 pb-5">
            <Link 
              to={`/articles/${article.slug}`} 
              className="block text-xl font-medium text-kare-800 hover:text-kare-600 mb-2"
            >
              {article.title}
            </Link>
            <p className="text-gray-600 mb-2">{article.summary}</p>
            <p className="text-gray-400 text-sm">
              {new Date(article.publishedAt).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
