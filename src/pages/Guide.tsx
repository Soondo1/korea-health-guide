import React, { useState, useEffect } from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link, useLocation } from 'react-router-dom';
import { 
  Hospital, Stethoscope, Pill, Clipboard, Phone, 
  Paperclip, CreditCard, Heart, BadgeHelp, Map,
  Building, Search, Globe, Languages, Clock, MapPin
} from 'lucide-react';
import { getHospitals, getPharmacies, Hospital as HospitalType, Pharmacy } from "../services/healthFacilityService";

const Guide = () => {
  // Get URL query parameters
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const tabParam = queryParams.get('tab');
  
  // State for healthcare facilities section
  const [showFacilities, setShowFacilities] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'hospitals' | 'pharmacies'>(
    tabParam === 'pharmacies' ? 'pharmacies' : 'hospitals'
  );
  const [hospitals, setHospitals] = useState<HospitalType[]>([]);
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFacility, setSelectedFacility] = useState<HospitalType | Pharmacy | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Fetch facilities data when showFacilities is true
    if (showFacilities) {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const [hospitalsData, pharmaciesData] = await Promise.all([
            getHospitals(),
            getPharmacies()
          ]);
          
          setHospitals(hospitalsData);
          setPharmacies(pharmaciesData);
        } catch (error) {
          console.error("Error fetching health facilities:", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    }
  }, [showFacilities]);
  
  // Update the active tab when URL query parameters change
  useEffect(() => {
    if (tabParam === 'pharmacies') {
      setActiveTab('pharmacies');
      setShowFacilities(true);
    } else if (tabParam === 'hospitals') {
      setActiveTab('hospitals');
      setShowFacilities(true);
    }
  }, [tabParam]);

  const filteredHospitals = hospitals.filter(hospital => 
    hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (hospital.nameEn?.toLowerCase().includes(searchTerm.toLowerCase())) ||
    hospital.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (hospital.addressEn?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredPharmacies = pharmacies.filter(pharmacy => 
    pharmacy.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (pharmacy.nameEn?.toLowerCase().includes(searchTerm.toLowerCase())) ||
    pharmacy.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (pharmacy.addressEn?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleFacilityClick = (facility: HospitalType | Pharmacy) => {
    setSelectedFacility(facility);
    setShowModal(true);
  };

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
          title: "Healthcare Facilities Directory",
          description: "Browse our comprehensive directory of hospitals and pharmacies",
          icon: Building,
          color: "bg-blue-50 text-blue-600",
          onClick: () => setShowFacilities(true)
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
        },
        {
          title: "Pharmacy Directory",
          description: "Browse our comprehensive directory of pharmacies in Korea",
          icon: Building,
          color: "bg-purple-50 text-purple-600",
          onClick: () => {
            setShowFacilities(true);
            setActiveTab('pharmacies');
          }
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
        {!showFacilities ? (
          <>
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
                      className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100 cursor-pointer"
                      onClick={() => item.onClick ? item.onClick() : null}
                    >
                      <div className={`w-12 h-12 rounded-lg ${item.color} flex items-center justify-center mb-4`}>
                        <item.icon className="h-6 w-6" />
                      </div>
                      <h3 className="font-medium text-gray-800 text-lg mb-2">{item.title}</h3>
                      <p className="text-gray-600 mb-4">{item.description}</p>
                      {item.link ? (
                        <Link 
                          to={item.link} 
                          className="text-kare-600 hover:text-kare-800 font-medium flex items-center"
                        >
                          Read More →
                        </Link>
                      ) : (
                        <span className="text-kare-600 hover:text-kare-800 font-medium flex items-center">
                          View Directory →
                        </span>
                      )}
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
          </>
        ) : (
          /* Healthcare Facilities Section */
          <section>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold text-kare-900 mb-2">Healthcare Facilities in Korea</h1>
                <p className="text-gray-600">
                  Find hospitals and pharmacies in Korea with English-speaking staff.
                </p>
              </div>
              <button 
                onClick={() => setShowFacilities(false)}
                className="text-kare-600 hover:text-kare-800 font-medium flex items-center gap-2"
              >
                ← Back to Guide
              </button>
            </div>
            
            {/* Search bar */}
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-kare-500 focus:border-kare-500"
                placeholder="Search by name, address..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Tab navigation */}
            <div className="flex border-b border-gray-200 mb-6">
              <button
                className={`py-2 px-4 font-medium text-sm ${activeTab === 'hospitals' ? 'text-kare-600 border-b-2 border-kare-600' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('hospitals')}
              >
                Hospitals
              </button>
              <button
                className={`py-2 px-4 font-medium text-sm ${activeTab === 'pharmacies' ? 'text-kare-600 border-b-2 border-kare-600' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('pharmacies')}
              >
                Pharmacies
              </button>
            </div>
            
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-kare-600"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeTab === 'hospitals' && filteredHospitals.map(hospital => (
                  <div 
                    key={hospital.id} 
                    className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer"
                    onClick={() => handleFacilityClick(hospital)}
                  >
                    <div className="p-5">
                      <h3 className="text-lg font-semibold text-kare-900 mb-1">{hospital.nameEn || hospital.name}</h3>
                      <p className="text-sm text-gray-500 mb-3">{hospital.name}</p>
                      
                      <div className="flex items-start gap-2 mb-2">
                        <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-600">{hospital.addressEn || hospital.address}</p>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <p className="text-sm text-gray-600">{hospital.phone}</p>
                      </div>
                      
                      {hospital.englishAvailable && (
                        <div className="flex items-center gap-2 mt-3">
                          <Languages className="h-4 w-4 text-kare-600" />
                          <p className="text-sm font-medium text-kare-600">English Available</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {activeTab === 'pharmacies' && filteredPharmacies.map(pharmacy => (
                  <div 
                    key={pharmacy.id} 
                    className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer"
                    onClick={() => handleFacilityClick(pharmacy)}
                  >
                    <div className="p-5">
                      <h3 className="text-lg font-semibold text-kare-900 mb-1">{pharmacy.nameEn || pharmacy.name}</h3>
                      <p className="text-sm text-gray-500 mb-3">{pharmacy.name}</p>
                      
                      <div className="flex items-start gap-2 mb-2">
                        <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-600">{pharmacy.addressEn || pharmacy.address}</p>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <p className="text-sm text-gray-600">{pharmacy.phone}</p>
                      </div>
                      
                      {pharmacy.englishAvailable && (
                        <div className="flex items-center gap-2 mt-3">
                          <Languages className="h-4 w-4 text-kare-600" />
                          <p className="text-sm font-medium text-kare-600">English Available</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {/* Empty state */}
                {activeTab === 'hospitals' && filteredHospitals.length === 0 && (
                  <div className="col-span-full text-center py-10">
                    <p className="text-gray-500">No hospitals found matching your search.</p>
                  </div>
                )}
                
                {activeTab === 'pharmacies' && filteredPharmacies.length === 0 && (
                  <div className="col-span-full text-center py-10">
                    <p className="text-gray-500">No pharmacies found matching your search.</p>
                  </div>
                )}
              </div>
            )}
            
            {/* Map section with proper sourcing */}
            <section className="mt-10 bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-kare-900 mb-4">Map View</h2>
              <div className="bg-gray-100 h-96 rounded relative">
                {/* Naver Maps implementation */}
                <iframe 
                  src="https://map.naver.com/p/entry/seoul-medical-center?c=15.00,0,0,0,dh" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  title="Healthcare facilities map"
                  className="rounded"
                ></iframe>
                
                {/* Map attribution */}
                <div className="absolute bottom-2 right-2 bg-white px-2 py-1 rounded text-xs text-gray-600 shadow-sm">
                  Map data ©2023 NAVER Corp. | <a href="https://www.navercorp.com/en/terms/naver" target="_blank" rel="noopener noreferrer" className="underline">Terms of Use</a>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Data Source: Korea Health Guide database. Map data provided by NAVER Maps.
              </p>
            </section>
          </section>
        )}
      </main>
      
      {/* Detail modal */}
      {showModal && selectedFacility && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-kare-900">{selectedFacility.nameEn || selectedFacility.name}</h2>
                  <p className="text-gray-500">{selectedFacility.name}</p>
                </div>
                <button 
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                  aria-label="Close details"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-gray-600">{selectedFacility.addressEn || selectedFacility.address}</p>
                    <p className="text-gray-500 text-sm">{selectedFacility.address}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-gray-600">{selectedFacility.phone}</p>
                  </div>
                </div>
                
                {'openingHours' in selectedFacility && selectedFacility.openingHours && (
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Opening Hours</p>
                      <div className="text-gray-600 space-y-1">
                        {selectedFacility.openingHours.weekdays && (
                          <p>Weekdays: {selectedFacility.openingHours.weekdays}</p>
                        )}
                        {selectedFacility.openingHours.saturday && (
                          <p>Saturday: {selectedFacility.openingHours.saturday}</p>
                        )}
                        {selectedFacility.openingHours.sunday && (
                          <p>Sunday: {selectedFacility.openingHours.sunday}</p>
                        )}
                        {selectedFacility.openingHours.holidays && (
                          <p>Holidays: {selectedFacility.openingHours.holidays}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                
                {selectedFacility.website && (
                  <div className="flex items-start gap-3">
                    <Globe className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Website</p>
                      <a 
                        href={selectedFacility.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-kare-600 hover:underline"
                      >
                        {selectedFacility.website}
                      </a>
                    </div>
                  </div>
                )}
                
                {'specialties' in selectedFacility && selectedFacility.specialties && selectedFacility.specialties.length > 0 && (
                  <div className="flex items-start gap-3">
                    <Stethoscope className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Specialties</p>
                      <p className="text-gray-600">{selectedFacility.specialties.join(', ')}</p>
                    </div>
                  </div>
                )}
                
                {selectedFacility.description && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-gray-700">{selectedFacility.description}</p>
                  </div>
                )}
                
                {/* Display individual facility map */}
                {selectedFacility.coordinates && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <h3 className="font-medium text-lg text-gray-800 mb-3">Location</h3>
                    <div className="bg-gray-100 h-64 rounded relative">
                      <iframe 
                        src={`https://map.naver.com/p?c=${selectedFacility.coordinates.lng},${selectedFacility.coordinates.lat},15z`}
                        width="100%" 
                        height="100%" 
                        style={{ border: 0 }} 
                        allowFullScreen 
                        loading="lazy" 
                        className="rounded"
                      ></iframe>
                      <div className="absolute bottom-2 right-2 bg-white px-2 py-1 rounded text-xs text-gray-600 shadow-sm">
                        Map data ©2023 NAVER Corp.
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Map data ©2023 NAVER Corp. | <a href="https://www.navercorp.com/en/terms/naver" target="_blank" rel="noopener noreferrer" className="underline">Terms of Use</a></p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default Guide; 