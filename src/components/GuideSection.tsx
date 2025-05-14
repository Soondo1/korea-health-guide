import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Hospital, Stethoscope, Pill, Clipboard, Phone } from 'lucide-react';

const GuideSection: React.FC = () => {
  const guideItems = [
    {
      title: "Finding a Hospital",
      description: "Locate English-speaking hospitals and clinics near you",
      icon: Hospital,
      color: "bg-blue-50 text-blue-600 border-blue-100",
      link: "/guide/hospitals"
    },
    {
      title: "Emergency Services",
      description: "What to do and who to call in case of emergency",
      icon: Phone,
      color: "bg-red-50 text-red-600 border-red-100",
      link: "/guide/emergency"
    },
    {
      title: "Insurance Guide",
      description: "Understand the Korean health insurance system",
      icon: Clipboard,
      color: "bg-green-50 text-green-600 border-green-100",
      link: "/guide/insurance"
    },
    {
      title: "Common Medications",
      description: "Guide to over-the-counter and prescription medications",
      icon: Pill,
      color: "bg-purple-50 text-purple-600 border-purple-100",
      link: "/guide/medications"
    },
    {
      title: "Medical Check-ups",
      description: "Recommended screenings and annual check-ups",
      icon: Stethoscope,
      color: "bg-amber-50 text-amber-600 border-amber-100",
      link: "/guide/checkups"
    }
  ];

  return (
    <section className="p-5 bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-3">
        <h2 className="text-xl font-semibold text-kare-800">Healthcare Guide</h2>
        <Link 
          to="/guide" 
          className="text-kare-600 hover:text-kare-800 text-sm font-medium flex items-center bg-kare-50 px-3 py-1 rounded-md"
        >
          View full guide <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {guideItems.map((item, index) => (
          <Link 
            key={index}
            to={item.link} 
            className="block bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 hover:border-kare-200 group"
          >
            <div className={`w-12 h-12 rounded-lg ${item.color} flex items-center justify-center mb-3 border`}>
              <item.icon className="h-6 w-6" />
            </div>
            <h3 className="font-medium text-gray-800 mb-2 group-hover:text-kare-700 transition-colors">{item.title}</h3>
            <p className="text-gray-600 text-sm mb-3">{item.description}</p>
            <span className="text-kare-600 group-hover:text-kare-800 text-sm font-medium flex items-center">
              Learn more <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default GuideSection; 