
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

// Mock data for articles (in a real app, this would be fetched from Sanity)
const mockArticles = {
  "new-medical-translation-service": {
    title: "New Medical Translation Service Launched",
    summary: "A new service has been introduced in major hospitals to help foreigners communicate with medical staff.",
    publishedAt: "2024-04-20T10:00:00Z",
    readingTime: "4 min read",
    author: "Sarah Kim",
    content: `
      <p>In a significant step forward for medical accessibility, major hospitals in Seoul have launched a new translation service aimed specifically at foreign residents and visitors. The service, called "MediTalk," provides real-time translation assistance in over 10 languages.</p>
      
      <h2>How MediTalk Works</h2>
      <p>MediTalk offers three types of translation services:</p>
      <ol>
        <li><strong>In-person interpreters</strong> available at designated hospitals during weekday business hours</li>
        <li><strong>Video interpretation</strong> via tablet devices provided by the hospital</li>
        <li><strong>Phone interpretation</strong> available 24/7 for emergency situations</li>
      </ol>
      
      <p>The service is the result of collaboration between the Ministry of Health and Welfare and the Seoul Metropolitan Government, addressing one of the biggest barriers to healthcare access for foreigners in Korea.</p>
      
      <h2>Participating Hospitals</h2>
      <p>The following hospitals are part of the initial phase of the MediTalk program:</p>
      <ul>
        <li>Seoul National University Hospital</li>
        <li>Severance Hospital</li>
        <li>Asan Medical Center</li>
        <li>Samsung Medical Center</li>
        <li>Korea University Anam Hospital</li>
      </ul>
      
      <p>Additional hospitals are expected to join the program later this year.</p>
      
      <h2>User Experience</h2>
      <p>Initial feedback from users has been overwhelmingly positive. John Taylor, an English teacher from Canada, shared his experience: "Having this service available made my recent hospital visit so much less stressful. The interpreter helped me explain my symptoms accurately and understand the doctor's instructions."</p>
      
      <h2>How to Access MediTalk</h2>
      <p>To use the MediTalk service:</p>
      <ol>
        <li>Inform the reception desk that you need translation assistance when you arrive at the hospital</li>
        <li>Specify your preferred language</li>
        <li>For phone interpretation, call the hotline at 1330 (the same as the Korea tourism hotline)</li>
      </ol>
      
      <p>The service is free for all users, regardless of their insurance status or visa type.</p>
    `
  },
  "free-vaccination-days-in-seoul": {
    title: "Free Vaccination Days in Seoul",
    summary: "The Seoul Metropolitan Government is offering free vaccinations for registered foreigners throughout May.",
    publishedAt: "2024-04-15T14:30:00Z",
    readingTime: "3 min read",
    author: "Min-ho Park",
    content: `
      <p>The Seoul Metropolitan Government has announced a special vaccination campaign targeting foreign residents. Throughout the month of May, registered foreigners can receive free vaccinations against influenza, hepatitis A, and COVID-19 boosters at designated public health centers.</p>
      
      <h2>Eligibility Requirements</h2>
      <p>To qualify for the free vaccinations, you must:</p>
      <ul>
        <li>Be a foreign national residing in Seoul</li>
        <li>Have an Alien Registration Card (ARC)</li>
        <li>Be registered with the local district office</li>
      </ul>
      
      <p>No appointment is necessary, but bringing your ARC and proof of residence (such as a utility bill) is required.</p>
      
      <h2>Vaccination Sites and Schedule</h2>
      <p>The vaccinations will be available at the following locations:</p>
      
      <table>
        <tr>
          <th>District</th>
          <th>Location</th>
          <th>Days</th>
          <th>Hours</th>
        </tr>
        <tr>
          <td>Gangnam</td>
          <td>Gangnam Public Health Center</td>
          <td>Mon, Wed, Fri</td>
          <td>9:00 AM - 4:00 PM</td>
        </tr>
        <tr>
          <td>Mapo</td>
          <td>Mapo Public Health Center</td>
          <td>Tue, Thu</td>
          <td>9:00 AM - 4:00 PM</td>
        </tr>
        <tr>
          <td>Yongsan</td>
          <td>Yongsan Public Health Center</td>
          <td>Mon, Wed</td>
          <td>9:00 AM - 4:00 PM</td>
        </tr>
        <tr>
          <td>Itaewon</td>
          <td>Itaewon Global Village Center</td>
          <td>Sat</td>
          <td>10:00 AM - 3:00 PM</td>
        </tr>
      </table>
      
      <h2>Important Health Information</h2>
      <p>Before getting vaccinated:</p>
      <ul>
        <li>Ensure you haven't had another vaccination within the last two weeks</li>
        <li>Bring records of previous vaccinations if available</li>
        <li>Inform staff of any allergies or current medications</li>
        <li>Do not come if you are experiencing fever or other illness symptoms</li>
      </ul>
      
      <p>Translators will be available at all vaccination sites to assist with communication.</p>
      
      <h2>Additional Resources</h2>
      <p>For more information about this program, you can:</p>
      <ul>
        <li>Call the Seoul Global Center: 02-2075-4130 (English service available)</li>
        <li>Visit the Seoul Foreign Residents Portal: <a href="#">foreign.seoul.go.kr</a></li>
        <li>Contact your local district office</li>
      </ul>
    `
  },
  "top-hospitals-accepting-foreigners": {
    title: "Top Hospitals Accepting Foreigners",
    summary: "Our community has compiled a list of the most foreigner-friendly hospitals across Korea with English-speaking staff.",
    publishedAt: "2024-04-10T09:15:00Z",
    readingTime: "7 min read",
    author: "Emma Wilson",
    content: `
      <p>Finding medical care in a foreign country can be challenging, especially with language barriers. To help the international community in Korea, we've compiled a list of hospitals known for their foreigner-friendly services and English-speaking staff.</p>
      
      <h2>Seoul Metropolitan Area</h2>
      
      <h3>1. Severance Hospital (International Health Care Center)</h3>
      <p>Located in Sinchon, Severance Hospital offers comprehensive services for international patients. Their International Health Care Center has English, Chinese, Russian, and Arabic-speaking staff.</p>
      <ul>
        <li><strong>Languages:</strong> English, Chinese, Japanese, Russian, Arabic, Mongolian</li>
        <li><strong>Specialties:</strong> General medicine, cardiology, oncology, neurology</li>
        <li><strong>Address:</strong> 50-1 Yonsei-ro, Seodaemun-gu, Seoul</li>
        <li><strong>Phone:</strong> 1599-1004 (English service available)</li>
      </ul>
      
      <h3>2. Seoul National University Hospital (International Healthcare Center)</h3>
      <p>A premier medical institution in Korea, SNUH offers specialized care for international patients with dedicated coordinators.</p>
      <ul>
        <li><strong>Languages:</strong> English, Chinese, Japanese, Russian</li>
        <li><strong>Specialties:</strong> Cancer treatment, organ transplantation, robotic surgery</li>
        <li><strong>Address:</strong> 101 Daehak-ro, Jongno-gu, Seoul</li>
        <li><strong>Phone:</strong> 02-2072-0505</li>
      </ul>
      
      <h3>3. Asan Medical Center (International Healthcare Clinic)</h3>
      <p>One of the largest hospitals in Korea, Asan Medical Center provides cutting-edge medical services with international patient coordinators.</p>
      <ul>
        <li><strong>Languages:</strong> English, Chinese, Russian, Mongolian, Arabic</li>
        <li><strong>Specialties:</strong> Liver transplantation, cancer treatment, cardiovascular medicine</li>
        <li><strong>Address:</strong> 88 Olympic-ro 43-gil, Songpa-gu, Seoul</li>
        <li><strong>Phone:</strong> 1688-7575</li>
      </ul>
      
      <h2>Busan</h2>
      
      <h3>4. Busan Paik Hospital (International Clinic)</h3>
      <p>Located in Korea's second-largest city, Busan Paik Hospital offers quality medical services for the international community in the southern region.</p>
      <ul>
        <li><strong>Languages:</strong> English, Chinese, Russian</li>
        <li><strong>Specialties:</strong> Orthopedics, neurosurgery, gastroenterology</li>
        <li><strong>Address:</strong> 75 Bokji-ro, Busanjin-gu, Busan</li>
        <li><strong>Phone:</strong> 051-890-6114</li>
      </ul>
      
      <h2>Incheon</h2>
      
      <h3>5. Inha University Hospital (International Healthcare Center)</h3>
      <p>Conveniently located near Incheon International Airport, this hospital is often the first stop for medical emergencies for travelers.</p>
      <ul>
        <li><strong>Languages:</strong> English, Chinese, Russian</li>
        <li><strong>Specialties:</strong> Emergency medicine, general surgery, internal medicine</li>
        <li><strong>Address:</strong> 27 Inhang-ro, Jung-gu, Incheon</li>
        <li><strong>Phone:</strong> 032-890-2114</li>
      </ul>
      
      <h2>Tips for Visiting Korean Hospitals as a Foreigner</h2>
      
      <ol>
        <li><strong>Bring your identification</strong> (passport or ARC) and insurance information</li>
        <li><strong>Call ahead</strong> to check if English-speaking doctors are available during your planned visit</li>
        <li><strong>Use translation apps</strong> like Papago or Google Translate as a backup</li>
        <li><strong>Ask for printed instructions</strong> in English for medications and follow-up care</li>
        <li><strong>Request a medical certificate</strong> if you need documentation for work or insurance</li>
      </ol>
      
      <p>Remember that most large hospitals in Korea operate on a first-come, first-served basis for outpatient visits, though some international clinics offer appointments. Morning visits typically mean shorter waiting times.</p>
    `
  }
};

const ArticleDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? mockArticles[slug as keyof typeof mockArticles] : null;

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
          <div className="text-center py-16">
            <h1 className="text-2xl font-semibold text-gray-800">Article not found</h1>
            <p className="mt-2 text-gray-600">The article you're looking for doesn't exist or has been removed.</p>
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
              {article.title}
            </h1>
            <p className="text-gray-600 text-lg mb-6">{article.summary}</p>
            
            <div className="flex items-center justify-between text-sm text-gray-500 border-t border-b border-gray-100 py-4">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-kare-100 text-kare-600 flex items-center justify-center font-medium">
                  {article.author.charAt(0)}
                </div>
                <span className="ml-2">{article.author}</span>
              </div>
              <div className="flex items-center space-x-4">
                <span>{new Date(article.publishedAt).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
                <span>{article.readingTime}</span>
              </div>
            </div>
          </header>
          
          <div 
            className="prose prose-blue prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          <div className="mt-10 pt-6 border-t border-gray-100">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Share this article</h3>
            <div className="flex space-x-4">
              <button className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600" aria-label="Share on Twitter">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </button>
              <button className="p-2 bg-blue-700 text-white rounded-full hover:bg-blue-800" aria-label="Share on Facebook">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                </svg>
              </button>
              <button className="p-2 bg-green-600 text-white rounded-full hover:bg-green-700" aria-label="Share on Instagram">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>
                </svg>
              </button>
            </div>
          </div>
        </article>
      </main>
      
      <footer className="bg-gray-50 border-t mt-16 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} K-are. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ArticleDetail;
