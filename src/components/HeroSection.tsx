
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="flex flex-col-reverse md:flex-row items-center bg-gradient-to-br from-kare-50 to-lavender-50 rounded-xl overflow-hidden">
      {/* Text content */}
      <div className="md:w-1/2 p-8 md:p-12">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-kare-950">
          Foreigner&apos;s Guide to Korea
        </h1>
        <p className="text-gray-700 mb-6 text-lg">
          Helping you navigate the Korean healthcare system with confidence
        </p>
        <Link 
          to="#introduction" 
          className="inline-flex items-center justify-center bg-kare-600 hover:bg-kare-700 text-white px-6 py-2.5 rounded-md text-lg font-medium transition-colors"
        >
          View Guide
        </Link>
      </div>
      {/* Illustration Image */}
      <div className="md:w-1/2 p-6 md:p-8 flex justify-center">
        <img 
          src="/assets/medical-illustration.svg" 
          alt="Medical guide illustration" 
          className="max-w-full h-auto object-contain max-h-80"
        />
      </div>
    </section>
  );
}
