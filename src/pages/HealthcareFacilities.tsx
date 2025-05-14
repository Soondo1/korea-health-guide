import { useState, useEffect, ChangeEvent } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getHospitals, getPharmacies, Hospital, Pharmacy } from "../services/healthFacilityService";
import { MapPin, Phone, Clock, Globe, Languages, Search } from "lucide-react";
import { useLocation } from "react-router-dom";

export default function HealthcareFacilities() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const tabParam = queryParams.get('tab');
  
  const [activeTab, setActiveTab] = useState<'hospitals' | 'pharmacies'>(
    tabParam === 'pharmacies' ? 'pharmacies' : 'hospitals'
  );
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFacility, setSelectedFacility] = useState<Hospital | Pharmacy | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
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
  }, []);
  
  // Update the active tab when URL query parameters change
  useEffect(() => {
    if (tabParam === 'pharmacies') {
      setActiveTab('pharmacies');
    } else if (tabParam === 'hospitals') {
      setActiveTab('hospitals');
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

  const handleFacilityClick = (facility: Hospital | Pharmacy) => {
    setSelectedFacility(facility);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="mb-10">
          <h1 className="text-3xl font-bold text-kare-900 mb-2">Healthcare Facilities in Korea</h1>
          <p className="text-gray-600 mb-6">
            Find hospitals and pharmacies in Korea with English-speaking staff.
          </p>
          
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
              onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
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
        </section>
        
        {/* Map section placeholder - would implement with a mapping library */}
        <section className="mt-10 bg-gray-100 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-kare-900 mb-4">Map View</h2>
          <div className="bg-gray-200 h-96 rounded flex items-center justify-center">
            <p className="text-gray-600">
              Map view would be implemented with a mapping library like Google Maps or Mapbox
            </p>
          </div>
        </section>
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
                          <p><span className="text-gray-500">Weekdays:</span> {selectedFacility.openingHours.weekdays}</p>
                        )}
                        {selectedFacility.openingHours.saturday && (
                          <p><span className="text-gray-500">Saturday:</span> {selectedFacility.openingHours.saturday}</p>
                        )}
                        {selectedFacility.openingHours.sunday && (
                          <p><span className="text-gray-500">Sunday:</span> {selectedFacility.openingHours.sunday}</p>
                        )}
                        {selectedFacility.openingHours.holidays && (
                          <p><span className="text-gray-500">Holidays:</span> {selectedFacility.openingHours.holidays}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                
                {'website' in selectedFacility && selectedFacility.website && (
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
                
                {'specialties' in selectedFacility && selectedFacility.specialties && (
                  <div className="mt-4">
                    <p className="font-medium mb-2">Specialties</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedFacility.specialties.map((specialty, index) => (
                        <span 
                          key={index}
                          className="bg-kare-50 text-kare-700 px-2 py-1 rounded text-sm"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {'description' in selectedFacility && selectedFacility.description && (
                  <div className="mt-4">
                    <p className="font-medium mb-2">About</p>
                    <p className="text-gray-600">{selectedFacility.description}</p>
                  </div>
                )}
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-kare-600 hover:bg-kare-700 text-white py-2 px-4 rounded-md transition-colors duration-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
} 