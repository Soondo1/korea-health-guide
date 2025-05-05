
import { useState, useEffect } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { FileText, Hospital, Book, Calendar, Shield } from "lucide-react";
import { fetchNewsItems, fetchCategories } from "@/services/sanityService";
import { NewsItem, Category } from "@/lib/sanity";

// Icon mapping for dynamic icon rendering
const iconMap: Record<string, React.ElementType> = {
  "fileText": FileText,
  "hospital": Hospital,
  "book": Book,
  "calendar": Calendar,
  "shield": Shield,
};

export default function BulletinBoard() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch news items from Sanity
        const news = await fetchNewsItems();
        setNewsItems(news);
        
        // Fetch categories from Sanity
        const cats = await fetchCategories();
        setCategories(cats);
        
        // Set default active category
        if (cats.length > 0) {
          setActiveCategory(cats[0]._id);
        }
        
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data from Sanity:", err);
        setError("Failed to load content. Please try again later.");
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Handle loading state
  if (loading) {
    return (
      <div className="container py-8 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center font-serif text-kare-700">Healthcare Bulletin Board</h1>
        <div className="flex justify-center items-center h-64">
          <p className="text-lg">Loading content...</p>
        </div>
      </div>
    );
  }
  
  // Handle error state
  if (error) {
    return (
      <div className="container py-8 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center font-serif text-kare-700">Healthcare Bulletin Board</h1>
        <div className="flex justify-center items-center h-64">
          <p className="text-lg text-red-500">{error}</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container py-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center font-serif text-kare-700">Healthcare Bulletin Board</h1>
      
      {/* Scrolling News Ticker */}
      <Card className="mb-10">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl text-kare-700">Latest Updates</CardTitle>
          <CardDescription>Stay informed with the latest healthcare news</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-lavender-50 p-3 rounded-md">
            <ScrollArea className="h-12 w-full overflow-hidden">
              <div className="flex gap-8 whitespace-nowrap px-1 animate-[scroll_30s_linear_infinite]">
                {newsItems.concat(newsItems).map((item, index) => (
                  <div key={index} className="flex items-center">
                    <span className="text-kare-700 font-medium">{item.title}</span>
                    <span className="mx-4 text-gray-400">•</span>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </CardContent>
      </Card>
      
      {/* Categories Section */}
      {categories.length > 0 && (
        <Tabs defaultValue={categories[0]._id} value={activeCategory} onValueChange={setActiveCategory}>
          <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-6">
            {categories.map(category => {
              const IconComponent = iconMap[category.icon] || FileText;
              return (
                <TabsTrigger key={category._id} value={category._id} className="flex items-center gap-2">
                  <IconComponent className="h-4 w-4" />
                  <span className="hidden md:inline">{category.name}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>
          
          {categories.map(category => {
            const IconComponent = iconMap[category.icon] || FileText;
            return (
              <TabsContent key={category._id} value={category._id}>
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <IconComponent className="h-5 w-5 text-kare-600" />
                      <CardTitle>{category.name}</CardTitle>
                    </div>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
                      {category.items && category.items.map((item, index) => (
                        <div key={item._id || index} className="border rounded-lg p-4 hover:bg-lavender-50 transition-colors">
                          <h3 className="font-medium mb-2 text-kare-800">{item.title}</h3>
                          <div className="flex gap-2 mt-3">
                            <Badge variant="outline" className="bg-lavender-50">
                              Healthcare
                            </Badge>
                            <Badge variant="outline" className="bg-kare-50">
                              Guide
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            );
          })}
        </Tabs>
      )}
    </div>
  );
}
