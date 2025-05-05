import React from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from 'react-router-dom';
import { 
  Hospital, Stethoscope, Pill, Clipboard, Phone, 
  Paperclip, CreditCard, Heart, BadgeHelp, Map
} from 'lucide-react';

const Guide = () => {
  const guideCategories = [
    {
      title: "Finding Medical Care",
      description: "Find the right healthcare provider for your needs",
      items: [
        {
          title: "Finding a Hospital",
          description: "Locate English-speaking hospitals and clinics near you",
          icon: Hospital,
          color: "bg-blue-50 text-blue-600",
          link: "/guide/hospitals"
        },
        {
          title: "Specialist Referrals",
          description: "How to get referred to a specialist in Korea",
          icon: Stethoscope,
          color: "bg-blue-50 text-blue-600",
          link: "/guide/specialists"
        },
        {
          title: "International Clinics",
          description: "Hospitals with dedicated international patient services",
          icon: Map,
          color: "bg-blue-50 text-blue-600",
          link: "/guide/international-clinics"
        }
      ]
    },
    {
      title: "Emergency & Urgent Care",
      description: "What to do in medical emergencies",
      items: [
        {
          title: "Emergency Services",
          description: "What to do and who to call in case of emergency",
          icon: Phone,
          color: "bg-red-50 text-red-600",
          link: "/guide/emergency"
        },
        {
          title: "After-Hours Care",
          description: "Where to go when you need care outside normal hours",
          icon: BadgeHelp,
          color: "bg-red-50 text-red-600",
          link: "/guide/after-hours"
        }
      ]
    },
    {
      title: "Insurance & Payments",
      description: "Understanding healthcare costs in Korea",
      items: [
        {
          title: "Insurance Guide",
          description: "Understand the Korean health insurance system",
          icon: Clipboard,
          color: "bg-green-50 text-green-600",
          link: "/guide/insurance"
        },
        {
          title: "Payment Options",
          description: "How to pay for healthcare services in Korea",
          icon: CreditCard,
          color: "bg-green-50 text-green-600",
          link: "/guide/payments"
        },
        {
          title: "Reimbursement",
          description: "How to claim reimbursements for medical expenses",
          icon: Paperclip,
          color: "bg-green-50 text-green-600",
          link: "/guide/reimbursement"
        }
      ]
    },
    {
      title: "Medications & Pharmacy",
      description: "Information about prescriptions and over-the-counter medication",
      items: [
        {
          title: "Common Medications",
          description: "Guide to over-the-counter and prescription medications",
          icon: Pill,
          color: "bg-purple-50 text-purple-600",
          link: "/guide/medications"
        },
        {
          title: "Finding a Pharmacy",
          description: "How to locate and use pharmacies in Korea",
          icon: Map,
          color: "bg-purple-50 text-purple-600",
          link: "/guide/pharmacies"
        }
      ]
    },
    {
      title: "Preventive Care",
      description: "Stay healthy with preventive healthcare",
      items: [
        {
          title: "Medical Check-ups",
          description: "Recommended screenings and annual check-ups",
          icon: Stethoscope,
          color: "bg-amber-50 text-amber-600",
          link: "/guide/checkups"
        },
        {
          title: "Vaccinations",
          description: "Recommended vaccines and where to get them",
          icon: Heart,
          color: "bg-amber-50 text-amber-600",
          link: "/guide/vaccinations"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-kare-800 mb-4">
            Healthcare Guide for Foreigners in Korea
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Everything you need to know to navigate the Korean healthcare system confidently, 
            from finding doctors to understanding insurance.
          </p>
        </div>
        
        {guideCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="mb-12">
            <div className="border-b border-gray-200 pb-2 mb-6">
              <h2 className="text-2xl font-semibold text-kare-800">{category.title}</h2>
              <p className="text-gray-600">{category.description}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.items.map((item, itemIndex) => (
                <div 
                  key={itemIndex} 
                  className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                >
                  <div className={`w-12 h-12 rounded-lg ${item.color} flex items-center justify-center mb-4`}>
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-medium text-gray-800 text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <Link 
                    to={item.link} 
                    className="text-kare-600 hover:text-kare-800 font-medium flex items-center"
                  >
                    Read More →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))}
        
        {/* FAQ Section */}
        <div className="bg-white rounded-xl shadow-sm p-8 mt-10">
          <h2 className="text-2xl font-semibold text-kare-800 mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-lg text-gray-800 mb-2">Do I need health insurance in Korea?</h3>
              <p className="text-gray-600">
                Yes, all residents in Korea, including foreigners staying for more than 6 months, 
                are required to enroll in the National Health Insurance Service (NHIS).
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg text-gray-800 mb-2">Can I see an English-speaking doctor?</h3>
              <p className="text-gray-600">
                Yes, many hospitals in major cities have international clinics with English-speaking staff. 
                Several apps and websites can help you locate these services.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg text-gray-800 mb-2">How much do medical services cost?</h3>
              <p className="text-gray-600">
                With national health insurance, you typically pay 20-30% of the total cost for most services. 
                Without insurance, costs are significantly higher.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg text-gray-800 mb-2">What's the emergency number in Korea?</h3>
              <p className="text-gray-600">
                For medical emergencies, call 119. For the police, call 112. These services have 
                English-speaking operators available.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Guide; 