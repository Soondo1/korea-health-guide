import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { 
  BrowserRouter, 
  Routes, 
  Route, 
  createBrowserRouter, 
  RouterProvider 
} from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Articles from "./pages/Articles";
import ArticleDetail from "./pages/ArticleDetail";
import NotFound from "./pages/NotFound";
import BulletinBoard from "./pages/BulletinBoard";
import Contact from "./pages/Contact";
import Guide from "./pages/Guide";
import GuideArticle from "./pages/GuideArticle";

const queryClient = new QueryClient();

// Remove unsupported future flags
const router = createBrowserRouter([
  { path: "/", element: <Index /> },
  { path: "/about", element: <About /> },
  { path: "/articles", element: <Articles /> },
  { path: "/articles/:slug", element: <ArticleDetail /> },
  { path: "/bulletin-board", element: <BulletinBoard /> },
  { path: "/bulletin", element: <BulletinBoard /> },
  { path: "/contact", element: <Contact /> },
  { path: "/guide", element: <Guide /> },
  { path: "/guide/:topic", element: <GuideArticle /> },
  { path: "/healthcare-facilities", element: <Guide /> },
  { path: "*", element: <NotFound /> }
]);

const App = () => {
  useEffect(() => {
    // Display setup instructions in development mode
    if (import.meta.env.DEV) {
      console.info(`
        🚀 Korea Health Guide App - Development Mode 🚀
        
        To use real data from Sanity:
        
        1. Create a .env file in the project root with:
          VITE_SANITY_PROJECT_ID=4zq6kq5m
          VITE_SANITY_DATASET=k-are1
          VITE_SANITY_API_VERSION=2023-05-03
          VITE_SANITY_API_TOKEN=your_token_here
        
        2. Get your token from https://www.sanity.io/manage
        
        3. Add http://localhost:3000 to CORS allowed origins:
          - Go to https://www.sanity.io/manage/project/4zq6kq5m
          - Navigate to Settings > API
          - Add http://localhost:3000 to CORS origins list
          
        Note: Without proper configuration, the app will use mock data.
      `);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <RouterProvider router={router} />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
