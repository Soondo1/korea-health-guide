export default function WelcomeSection() {
  return (
    <section id="introduction" className="py-6 bg-white rounded-xl p-5 border border-gray-100 shadow-sm my-8">
      <h2 className="text-2xl font-semibold mb-4 text-kare-800 border-b border-gray-100 pb-3">About K-are</h2>
      <p className="text-gray-700 text-base sm:text-lg mb-6 max-w-4xl">
        K-are is your comprehensive resource for navigating the Korean healthcare system. 
        We provide clear guides, practical tips, and first-hand stories from our community 
        of expatriates to help you access medical care with confidence.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-lavender-50 p-5 rounded-lg border border-lavender-100 hover:shadow-md transition-shadow">
          <h3 className="text-lg font-medium text-kare-700 mb-2">Healthcare Guides</h3>
          <p className="text-gray-600 text-sm sm:text-base">Expert guides on finding doctors, understanding insurance, and navigating hospitals in Korea.</p>
        </div>
        <div className="bg-lavender-50 p-5 rounded-lg border border-lavender-100 hover:shadow-md transition-shadow">
          <h3 className="text-lg font-medium text-kare-700 mb-2">Community Stories</h3>
          <p className="text-gray-600 text-sm sm:text-base">Real experiences from fellow foreigners who have successfully navigated Korean healthcare.</p>
        </div>
        <div className="bg-lavender-50 p-5 rounded-lg border border-lavender-100 hover:shadow-md transition-shadow">
          <h3 className="text-lg font-medium text-kare-700 mb-2">Medical Translation</h3>
          <p className="text-gray-600 text-sm sm:text-base">Essential Korean medical terms and phrases to help you communicate effectively with healthcare providers.</p>
        </div>
      </div>
    </section>
  );
}
