import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LoadingSpinner from "../components/LoadingSpinner";
import { fetchPostBySlug } from "@/services/sanityService";
import { Post, urlFor } from "@/lib/sanity";
import { PortableText } from '@portabletext/react';
import portableTextComponents from "@/lib/portableTextComponents";

const ArticleDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPost = async () => {
      if (!slug) return;
      
      try {
        setLoading(true);
        const fetchedPost = await fetchPostBySlug(slug);
        setPost(fetchedPost);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching post:", err);
        setError("Failed to load article. Please try again later.");
        setLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
          <div className="flex justify-center items-center py-16">
            <LoadingSpinner size="large" text="Loading article..." />
          </div>
        </main>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
          <div className="text-center py-16">
            <h1 className="text-2xl font-semibold text-gray-800">
              {error || "Article not found"}
            </h1>
            <p className="mt-2 text-gray-600">
              {error ? "Please try again later." : "The article you're looking for doesn't exist or has been removed."}
            </p>
            <Link 
              to="/articles" 
              className="mt-6 inline-block text-kare-600 hover:text-kare-800"
            >
              ← Back to all articles
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <article className="bg-white shadow-sm rounded-xl p-6 md:p-8">
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-kare-800 mb-4">
              {post.title}
            </h1>
            {post.summary && <p className="text-gray-600 text-lg mb-6">{post.summary}</p>}
            
            <div className="flex items-center justify-between text-sm text-gray-500 border-t border-b border-gray-100 py-4">
              {post.author && (
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-kare-100 text-kare-600 flex items-center justify-center font-medium">
                    {post.author.name.charAt(0)}
                  </div>
                  <span className="ml-2">{post.author.name}</span>
                </div>
              )}
              <div className="flex items-center space-x-4">
                <span>{new Date(post.publishedAt).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
            </div>
          </header>
          
          {post.mainImage && (
            <div className="mb-8">
              <img 
                src={urlFor(post.mainImage).width(800).url()} 
                alt={post.title}
                className="w-full h-auto rounded-lg"
              />
            </div>
          )}
          
          <div className="prose prose-kare max-w-none">
            {post.body ? (
              <PortableText 
                value={post.body} 
                components={portableTextComponents}
                onMissingComponent={(componentName) => {
                  console.warn(`Missing component: ${componentName}`);
                  return null;
                }}
              />
            ) : (
              <p className="text-gray-500">This article has no content yet.</p>
            )}
          </div>
          
          {post.categories && post.categories.length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="flex flex-wrap gap-2">
                {post.categories.map((category, idx) => (
                  <span key={idx} className="bg-lavender-50 text-kare-700 px-3 py-1 rounded-full text-sm">
                    {category.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </article>
        
        <div className="mt-8 text-center">
          <Link 
            to="/articles" 
            className="text-kare-600 hover:text-kare-800 inline-flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to all articles
          </Link>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ArticleDetail;
