import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ChevronRight, ArrowLeft } from 'lucide-react';

// Mock data - in a real app, this would come from Sanity or another CMS
const mockGuideContent = {
  'hospitals': {
    title: 'Finding a Hospital in Korea',
    lastUpdated: '2024-05-15',
    content: `
      <h2>Understanding Hospital Types in Korea</h2>
      <p>The Korean healthcare system has several types of medical facilities:</p>
      <ul>
        <li><strong>Tertiary Hospitals (대형병원)</strong>: Large university hospitals with specialized departments and advanced equipment.</li>
        <li><strong>General Hospitals (종합병원)</strong>: Mid-sized hospitals with multiple departments.</li>
        <li><strong>Hospitals (병원)</strong>: Smaller facilities with at least 30 beds.</li>
        <li><strong>Clinics (의원)</strong>: Small private practices specializing in specific areas like internal medicine, pediatrics, etc.</li>
      </ul>
      
      <h2>Finding English-Speaking Facilities</h2>
      <p>Major cities like Seoul, Busan, and Incheon have hospitals with international clinics and English-speaking staff. Here are some resources to find them:</p>
      <ul>
        <li><strong>Global Healthcare Centers</strong>: Many large hospitals have dedicated departments for international patients.</li>
        <li><strong>Medical Korea</strong>: The official website for international healthcare in Korea (www.medicalkorea.or.kr).</li>
        <li><strong>Expat Communities</strong>: Local expat groups often maintain lists of recommended medical providers.</li>
      </ul>
      
      <h2>Recommended International Hospitals</h2>
      <p>These hospitals are known for their international patient services:</p>
      <ul>
        <li><strong>Seoul National University Hospital</strong> - Seoul</li>
        <li><strong>Severance Hospital</strong> - Seoul</li>
        <li><strong>Asan Medical Center</strong> - Seoul</li>
        <li><strong>Samsung Medical Center</strong> - Seoul</li>
        <li><strong>Inha University Hospital</strong> - Incheon</li>
        <li><strong>Pusan National University Hospital</strong> - Busan</li>
      </ul>
      
      <h2>What to Bring to Your Hospital Visit</h2>
      <p>When visiting a hospital in Korea, make sure to bring:</p>
      <ul>
        <li>Your Alien Registration Card (ARC) or passport</li>
        <li>Health insurance card (if applicable)</li>
        <li>Any previous medical records or prescriptions</li>
        <li>Cash or credit card for payment</li>
        <li>A list of any medications you're currently taking</li>
        <li>A Korean-speaking friend (if possible and if you don't speak Korean)</li>
      </ul>
      
      <h2>Hospital Etiquette in Korea</h2>
      <p>Understanding some cultural aspects of Korean healthcare can help:</p>
      <ul>
        <li>Remove your shoes if required in certain areas</li>
        <li>Doctors may not always explain everything in detail - you may need to ask questions</li>
        <li>Family involvement is common and encouraged</li>
        <li>Bring your own tissues and toiletries for inpatient stays</li>
      </ul>
    `,
    relatedTopics: [
      { title: 'Medical Insurance in Korea', link: '/guide/insurance' },
      { title: 'Emergency Services', link: '/guide/emergency' },
      { title: 'Medical Vocabulary', link: '/guide/medical-vocabulary' }
    ]
  },
  'emergency': {
    title: 'Emergency Medical Services in Korea',
    lastUpdated: '2024-05-10',
    content: `
      <h2>Emergency Numbers in Korea</h2>
      <p>In case of medical emergencies in Korea, you should know these important numbers:</p>
      <ul>
        <li><strong>119</strong>: Fire and Ambulance (equivalent to 911)</li>
        <li><strong>112</strong>: Police</li>
        <li><strong>1339</strong>: Medical Emergency Information Center (has English-speaking staff)</li>
      </ul>
      
      <h2>What to Expect When Calling 119</h2>
      <p>When you call 119:</p>
      <ul>
        <li>Try to speak slowly and clearly</li>
        <li>Provide your location as precisely as possible</li>
        <li>Describe the emergency situation</li>
        <li>Ask for an English speaker if needed (say "영어 주세요" - "yeong-eo juseyo" meaning "English please")</li>
        <li>Stay on the line until instructed to hang up</li>
      </ul>
      
      <h2>Emergency Rooms (ER)</h2>
      <p>Most large hospitals in Korea have 24-hour emergency rooms. Look for signs that say "응급실" (eung-geup-sil).</p>
      <p>Major hospitals with international services may have English-speaking staff in their ERs, especially in Seoul and other major cities.</p>
      
      <h2>What to Bring to the ER</h2>
      <ul>
        <li>Your ID (passport or ARC)</li>
        <li>Insurance information</li>
        <li>List of medications or allergies</li>
        <li>Cash or credit card</li>
      </ul>
      
      <h2>Emergency Medical Costs</h2>
      <p>Emergency medical services in Korea can be expensive without insurance:</p>
      <ul>
        <li>Ambulance services: Approximately 30,000-70,000 KRW (may be partially covered by NHIS)</li>
        <li>ER visit: Starting from 50,000 KRW and can exceed 200,000 KRW depending on treatments</li>
        <li>With National Health Insurance, you'll pay about 20-30% of the total cost</li>
      </ul>
      
      <h2>After-Hours Non-Emergency Care</h2>
      <p>For non-emergency medical needs outside regular hospital hours:</p>
      <ul>
        <li>24-hour pharmacies are available in most cities (look for "24시 약국")</li>
        <li>Some clinics offer extended hours</li>
        <li>Call 1339 for advice on where to find after-hours care near you</li>
      </ul>
    `,
    relatedTopics: [
      { title: 'Finding a Hospital', link: '/guide/hospitals' },
      { title: 'Insurance Guide', link: '/guide/insurance' },
      { title: 'Common Medications', link: '/guide/medications' }
    ]
  },
  'insurance': {
    title: 'Health Insurance in Korea',
    lastUpdated: '2024-05-12',
    content: `
      <h2>National Health Insurance System (NHIS)</h2>
      <p>Korea has a mandatory National Health Insurance System that covers all residents, including foreigners who stay in Korea for more than 6 months:</p>
      <ul>
        <li><strong>Coverage</strong>: Basic medical services including doctor visits, hospitalization, and prescription medications</li>
        <li><strong>Cost</strong>: Monthly premium based on income, typically 5-6% of your salary</li>
        <li><strong>Co-payment</strong>: 20-30% of total medical costs for most services</li>
      </ul>
      
      <h2>Enrolling in NHIS</h2>
      <p>How to enroll in the National Health Insurance:</p>
      <ul>
        <li><strong>Employed Foreigners</strong>: Your employer will typically handle the enrollment process</li>
        <li><strong>Students</strong>: Enroll through your university's international office</li>
        <li><strong>Self-employed/Others</strong>: Visit your local NHIS office with your ARC, passport, and proof of address</li>
      </ul>
      
      <h2>Private Health Insurance</h2>
      <p>Some expatriates choose to supplement NHIS with private insurance:</p>
      <ul>
        <li><strong>Benefits</strong>: Coverage for services not included in NHIS, potentially lower co-payments</li>
        <li><strong>Options</strong>: International insurance plans or Korean private insurance</li>
        <li><strong>Cost</strong>: Varies based on coverage, age, and pre-existing conditions</li>
      </ul>
      
      <h2>Using Your Insurance</h2>
      <p>When visiting a medical facility:</p>
      <ul>
        <li>Present your insurance card at registration</li>
        <li>Most medical facilities process NHIS claims directly</li>
        <li>You'll pay your portion of the cost (co-payment) at checkout</li>
        <li>For private insurance, you may need to pay upfront and file for reimbursement later</li>
      </ul>
    `,
    relatedTopics: [
      { title: 'Finding a Hospital', link: '/guide/hospitals' },
      { title: 'Payment Options', link: '/guide/payments' },
      { title: 'Reimbursement', link: '/guide/reimbursement' }
    ]
  },
  'medications': {
    title: 'Medications in Korea',
    lastUpdated: '2024-05-08',
    content: `
      <h2>Pharmacies in Korea</h2>
      <p>Understanding how to get medications in Korea:</p>
      <ul>
        <li><strong>Prescription Drugs</strong>: Available only at pharmacies (약국, "yakguk") with a doctor's prescription</li>
        <li><strong>Over-the-Counter Drugs</strong>: Available at pharmacies without prescription</li>
        <li><strong>Convenience Store Medications</strong>: Limited selection of basic medications like pain relievers</li>
      </ul>
      
      <h2>Common Over-the-Counter Medications</h2>
      <p>Familiar medications and their Korean equivalents:</p>
      <ul>
        <li><strong>Pain Relievers</strong>: Tylenol (타이레놀), Advil/Ibuprofen (이부프로펜)</li>
        <li><strong>Cold/Flu Medicine</strong>: Pancold (판콜), Theraflu (테라플루)</li>
        <li><strong>Digestive Aids</strong>: Bacchus (박카스), Gas Relief (가스 완화제)</li>
        <li><strong>Allergy Medication</strong>: Zyrtec (지르텍), Claritin (클라리틴)</li>
      </ul>
      
      <h2>Prescription Process</h2>
      <p>How to get prescription medications:</p>
      <ul>
        <li>Visit a doctor to get diagnosed and receive a prescription</li>
        <li>Take the prescription to any pharmacy</li>
        <li>Pharmacists will explain dosage and usage in English if requested</li>
        <li>Some medications from your home country may have different names or not be available</li>
      </ul>
      
      <h2>Bringing Medications to Korea</h2>
      <p>If you're bringing medications from home:</p>
      <ul>
        <li>Bring the original container with prescription label</li>
        <li>Carry a doctor's note for controlled substances</li>
        <li>Check Korea's restricted medication list before travel</li>
        <li>Quantities should be reasonable for personal use (typically up to 3 months' supply)</li>
      </ul>
    `,
    relatedTopics: [
      { title: 'Finding a Pharmacy', link: '/guide/pharmacies' },
      { title: 'Insurance Guide', link: '/guide/insurance' },
      { title: 'Finding a Hospital', link: '/guide/hospitals' }
    ]
  },
  'checkups': {
    title: 'Medical Check-ups in Korea',
    lastUpdated: '2024-05-05',
    content: `
      <h2>Preventive Healthcare in Korea</h2>
      <p>Korea has a strong emphasis on preventive health screenings:</p>
      <ul>
        <li><strong>NHIS Coverage</strong>: Basic health screenings are covered by National Health Insurance</li>
        <li><strong>Frequency</strong>: General check-ups are recommended once every 1-2 years</li>
        <li><strong>Comprehensive Options</strong>: Many hospitals offer extensive screening packages</li>
      </ul>
      
      <h2>Types of Health Check-ups</h2>
      <p>Common health check-up options in Korea:</p>
      <ul>
        <li><strong>Basic Check-up</strong>: Height, weight, blood pressure, blood/urine tests, chest X-ray</li>
        <li><strong>General Check-up</strong>: Basic tests plus additional screenings like ECG, ultrasound, etc.</li>
        <li><strong>Comprehensive Check-up</strong>: All the above plus specialized tests like cancer screenings, bone density, etc.</li>
        <li><strong>Executive Check-up</strong>: Premium packages with extensive tests and personalized care</li>
      </ul>
      
      <h2>Where to Get a Check-up</h2>
      <p>Facilities offering medical check-ups:</p>
      <ul>
        <li><strong>Health Screening Centers</strong>: Dedicated facilities within major hospitals</li>
        <li><strong>Health Promotion Centers</strong>: Independent centers focused on preventive care</li>
        <li><strong>International Clinics</strong>: Many offer check-up packages with English-speaking staff</li>
      </ul>
      
      <h2>What to Expect</h2>
      <p>The check-up process:</p>
      <ul>
        <li>Schedule an appointment (some walk-ins available but appointments preferred)</li>
        <li>Fast for 8-12 hours before the appointment (for blood tests)</li>
        <li>Check-ups typically take 2-4 hours depending on the package</li>
        <li>Results are usually available within 3-7 days</li>
        <li>Follow-up consultation to explain results is standard</li>
      </ul>
    `,
    relatedTopics: [
      { title: 'Finding a Hospital', link: '/guide/hospitals' },
      { title: 'Insurance Guide', link: '/guide/insurance' },
      { title: 'Vaccinations', link: '/guide/vaccinations' }
    ]
  }
};

const GuideArticle = () => {
  const { topic } = useParams<{ topic: string }>();
  
  // Check if the requested topic exists
  const guideContent = topic && mockGuideContent[topic as keyof typeof mockGuideContent];
  
  if (!guideContent) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-kare-800 mb-4">Guide Topic Not Found</h1>
            <p className="text-gray-600 mb-6">
              Sorry, we couldn't find the guide topic you're looking for.
            </p>
            <Link 
              to="/guide" 
              className="inline-flex items-center text-kare-600 hover:text-kare-800"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Return to Guide Home
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Breadcrumbs */}
        <div className="text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-kare-600">Home</Link>
          <ChevronRight className="inline h-3 w-3 mx-1" />
          <Link to="/guide" className="hover:text-kare-600">Guide</Link>
          <ChevronRight className="inline h-3 w-3 mx-1" />
          <span className="text-gray-700">{guideContent.title}</span>
        </div>
        
        {/* Article Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-kare-800 mb-2">{guideContent.title}</h1>
          <p className="text-sm text-gray-500">
            Last updated: {guideContent.lastUpdated}
          </p>
        </header>
        
        {/* Content */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <div 
            className="prose prose-kare max-w-none"
            dangerouslySetInnerHTML={{ __html: guideContent.content }}
          />
        </div>
        
        {/* Related Topics */}
        {guideContent.relatedTopics && guideContent.relatedTopics.length > 0 && (
          <div className="bg-kare-50 rounded-xl p-6">
            <h3 className="text-lg font-medium text-kare-800 mb-4">Related Topics</h3>
            <div className="space-y-2">
              {guideContent.relatedTopics.map((topic, index) => (
                <Link 
                  key={index}
                  to={topic.link}
                  className="block text-kare-600 hover:text-kare-800 hover:underline"
                >
                  {topic.title}
                </Link>
              ))}
            </div>
          </div>
        )}
        
        {/* Back to Guide Button */}
        <div className="mt-8 text-center">
          <Link 
            to="/guide" 
            className="inline-flex items-center text-kare-600 hover:text-kare-800"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Guide Home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GuideArticle; 