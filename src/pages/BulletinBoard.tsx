
import { useState } from "react";
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

// Sample news data
const newsItems = [
  "New COVID-19 vaccination guidelines for foreigners in Korea",
  "Seoul National University Hospital launches English language services",
  "Changes to national health insurance policy for expats",
  "Telemedicine services now available for foreign residents",
  "Annual health checkup program expanded to include more tests",
  "Prescription medication guide now available in 12 languages",
  "Mental health resources for the foreign community in Seoul",
  "Busan Medical Center introduces multilingual consultation services"
];

// Sample category data with content
const categories = [
  {
    id: "policies",
    name: "Healthcare Policies",
    icon: FileText,
    description: "Stay updated with the latest healthcare policies for foreigners",
    items: [
      "National Health Insurance for Foreigners",
      "Emergency Healthcare Access Rights",
      "Vaccination Programs",
      "Medical Expense Claims"
    ]
  },
  {
    id: "hospitals",
    name: "Hospitals & Clinics",
    icon: Hospital,
    description: "Find hospitals and clinics with foreign language support",
    items: [
      "International Clinics in Seoul",
      "University Hospitals with English Services",
      "Specialized Medical Centers",
      "24/7 Emergency Rooms with Translators"
    ]
  },
  {
    id: "resources",
    name: "Healthcare Resources",
    icon: Book,
    description: "Essential resources for navigating healthcare in Korea",
    items: [
      "Medical Korean Language Guide",
      "Understanding Medical Bills",
      "Patient Rights in Korea",
      "Telemedicine Services Guide"
    ]
  },
  {
    id: "appointments",
    name: "Appointments & Checkups",
    icon: Calendar,
    description: "Information about medical appointments and regular checkups",
    items: [
      "How to Schedule Medical Appointments",
      "Annual Health Examination Programs",
      "Specialist Referral Process",
      "Medical Record Access Procedure"
    ]
  },
  {
    id: "insurance",
    name: "Insurance & Coverage",
    icon: Shield,
    description: "Learn about health insurance options and coverage details",
    items: [
      "National Health Insurance Coverage",
      "Private Insurance Options",
      "Travel Insurance for Visitors",
      "Reimbursement Procedures"
    ]
  }
];

export default function BulletinBoard() {
  const [activeCategory, setActiveCategory] = useState("policies");
  
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
            <ScrollArea className="h-12 w-full overflow-hidden" orientation="horizontal">
              <div className="flex gap-8 whitespace-nowrap px-1 animate-[scroll_30s_linear_infinite]">
                {newsItems.concat(newsItems).map((item, index) => (
                  <div key={index} className="flex items-center">
                    <span className="text-kare-700 font-medium">{item}</span>
                    <span className="mx-4 text-gray-400">•</span>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </CardContent>
      </Card>
      
      {/* Categories Section */}
      <Tabs defaultValue="policies" value={activeCategory} onValueChange={setActiveCategory}>
        <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-6">
          {categories.map(category => (
            <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2">
              <category.icon className="h-4 w-4" />
              <span className="hidden md:inline">{category.name}</span>
            </TabsTrigger>
          ))}
        </TabsList>
        
        {categories.map(category => (
          <TabsContent key={category.id} value={category.id}>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <category.icon className="h-5 w-5 text-kare-600" />
                  <CardTitle>{category.name}</CardTitle>
                </div>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
                  {category.items.map((item, index) => (
                    <div key={index} className="border rounded-lg p-4 hover:bg-lavender-50 transition-colors">
                      <h3 className="font-medium mb-2 text-kare-800">{item}</h3>
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
        ))}
      </Tabs>
    </div>
  );
}
