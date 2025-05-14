import { useState } from "react";
import { PhoneCall, Ambulance, X, PlusCircle, Pill, LucideIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface EmergencyInfo {
  title: string;
  content: string;
  icon: LucideIcon;
  phoneNumber?: string;
}

const QuickHelp = () => {
  const [isOpen, setIsOpen] = useState(false);

  const emergencyInfo: EmergencyInfo[] = [
    {
      title: "Emergency Number",
      content: "Call 119 for ambulance service",
      icon: Ambulance,
      phoneNumber: "119"
    },
    {
      title: "Medical Helpline",
      content: "English-speaking medical consultation",
      icon: PhoneCall,
      phoneNumber: "1339"
    },
    {
      title: "24/7 Pharmacies",
      content: "Find open pharmacies nearby",
      icon: Pill
    }
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50">
      {/* Main Button */}
      <motion.button
        onClick={toggleMenu}
        className={`flex items-center justify-center w-16 h-16 rounded-full shadow-lg ${
          isOpen ? "bg-red-500" : "bg-kare-600"
        } text-white focus:outline-none`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? "Close emergency help" : "Open emergency help"}
      >
        {isOpen ? (
          <X size={28} />
        ) : (
          <PlusCircle size={28} />
        )}
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-20 right-0 bg-white rounded-lg shadow-xl w-full sm:w-80 md:w-96 overflow-hidden"
          >
            <div className="p-4 bg-kare-50 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-kare-800">Emergency Resources</h3>
              <p className="text-sm text-gray-600">Quick access to healthcare help</p>
            </div>
            
            <div className="p-2">
              {emergencyInfo.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div 
                    key={index}
                    className="p-3 hover:bg-gray-50 rounded-md transition-colors"
                  >
                    <div className="flex items-start">
                      <div className="bg-lavender-50 p-2 rounded-md text-kare-700 mr-3">
                        <Icon size={24} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{item.title}</h4>
                        <p className="text-sm text-gray-600">{item.content}</p>
                        {item.phoneNumber && (
                          <a 
                            href={`tel:${item.phoneNumber}`}
                            className="mt-2 inline-flex items-center text-base text-kare-600 hover:text-kare-800 py-1"
                          >
                            <PhoneCall size={16} className="mr-1" />
                            Call {item.phoneNumber}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="p-4 bg-gray-50 border-t border-gray-200">
              <a 
                href="/emergency"
                className="text-sm text-center block text-kare-600 hover:text-kare-800 py-1"
              >
                View complete emergency guide
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuickHelp; 