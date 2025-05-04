
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

// Mock data for articles (in a real app, this would be fetched from Sanity)
const mockArticles = [
  {
    slug: "new-medical-translation-service",
    title: "New Medical Translation Service Launched",
    summary: "A new service has been introduced in major hospitals to help foreigners communicate with medical staff.",
    publishedAt: "2024-04-20T10:00:00Z",
    readingTime: "4 min read"
  },
  {
    slug: "free-vaccination-days-in-seoul",
    title: "Free Vaccination Days in Seoul",
    summary: "The Seoul Metropolitan Government is offering free vaccinations for registered foreigners throughout May.",
    publishedAt: "2024-04-15T14:30:00Z",
    readingTime: "3 min read"
  },
  {
    slug: "top-hospitals-accepting-foreigners",
    title: "Top Hospitals Accepting Foreigners",
    summary: "Our community has compiled a list of the most foreigner-friendly hospitals across Korea with English-speaking staff.",
    publishedAt: "2024-04-10T09:15:00Z",
    readingTime: "7 min read"
  },
  {
    slug: "understanding-korean-health-insurance",
    title: "Understanding Korean Health Insurance for Foreigners",
    summary: "A comprehensive guide to the National Health Insurance system in Korea and how foreigners can navigate it effectively.",
    publishedAt: "2024-04-05T11:20:00Z",
    readingTime: "8 min read"
  },
  {
    slug: "pharmacies-in-korea-what-to-know",
    title: "Pharmacies in Korea: What Foreigners Should Know",
    summary: "Learn about how Korean pharmacies operate, what medicines are available over-the-counter, and how prescriptions work.",
    publishedAt: "2024-03-28T15:45:00Z",
    readingTime: "5 min read"
  },
  {
    slug: "mental-health-resources-for-expats",
    title: "Mental Health Resources for Expats in Korea",
    summary: "Finding mental health support as a foreigner can be challenging. We've compiled a list of English-speaking resources.",
    publishedAt: "2024-03-20T10:30:00Z",
    readingTime: "6 min read"
  }
];

const Articles = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-kare-800">Blog Articles</h1>
          <p className="text-gray-600 mt-2">
            Insights, guides, and stories about healthcare in Korea for the foreign community
          </p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {mockArticles.map((article) => (
            <div key={article.slug} className="bg-white shadow-sm rounded-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <span>{new Date(article.publishedAt).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                  <span className="mx-2">•</span>
                  <span>{article.readingTime}</span>
                </div>
                <Link 
                  to={`/articles/${article.slug}`} 
                  className="block text-xl font-medium text-kare-800 hover:text-kare-600 mb-3"
                >
                  {article.title}
                </Link>
                <p className="text-gray-600 mb-4">{article.summary}</p>
                <Link 
                  to={`/articles/${article.slug}`} 
                  className="inline-flex items-center text-kare-600 hover:text-kare-800 font-medium"
                >
                  Read more
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
      
      <footer className="bg-gray-50 border-t mt-16 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} K-are. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Articles;
