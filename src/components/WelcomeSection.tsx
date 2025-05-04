
export default function WelcomeSection() {
  return (
    <section id="introduction" className="py-6">
      <h2 className="text-2xl font-semibold mb-4 text-kare-800">Welcome to K-are</h2>
      <p className="text-gray-700 text-lg">
        K-are is your go-to resource for navigating the Korean healthcare system. 
        Discover guides, tips, and first-hand stories from our community of expats 
        — and stay up to date with our latest articles.
      </p>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm">
          <h3 className="text-lg font-medium text-kare-700 mb-2">Healthcare Guides</h3>
          <p className="text-gray-600">Expert guides on finding doctors, understanding insurance, and navigating hospitals.</p>
        </div>
        <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm">
          <h3 className="text-lg font-medium text-kare-700 mb-2">Community Stories</h3>
          <p className="text-gray-600">Read about real experiences from other foreigners who've navigated Korean healthcare.</p>
        </div>
        <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm">
          <h3 className="text-lg font-medium text-kare-700 mb-2">Medical Translation</h3>
          <p className="text-gray-600">Essential Korean medical terms and phrases to help you communicate effectively.</p>
        </div>
      </div>
    </section>
  );
}
