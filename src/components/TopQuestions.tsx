import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

// FAQ data
const faqs = [
  {
    question: "What documentation do I need to bring to the hospital?",
    answer: "You should bring your ID (passport or ARC), health insurance card or documents, and any medical records if available. Hospitals may also ask for proof of address or contact information."
  },
  {
    question: "How do I register for health insurance?",
    answer: "Most foreigners can register for National Health Insurance through their employer or local district office. You will need your ARC and employment information to sign up."
  },
  {
    question: "Can I get emergency care without insurance?",
    answer: "Yes, emergency rooms will treat patients without insurance, but you will be billed the full amount. It's recommended to have travel or national health insurance to cover costs."
  },
  {
    question: "Are there English-speaking doctors available?",
    answer: "Many larger hospitals in Seoul and other major cities have international clinics with English-speaking staff. It's advisable to call ahead and confirm language availability."
  }
];

export default function TopQuestions() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Default first question open

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white border border-gray-100 shadow-sm p-5 md:p-6 rounded-xl">
      <h2 className="text-xl font-semibold mb-4 text-kare-800 border-b border-gray-100 pb-2">Frequently Asked Questions</h2>
      <ul className="space-y-3">
        {faqs.map((faq, index) => (
          <li key={index} className={`border border-gray-100 rounded-lg ${openIndex === index ? 'bg-lavender-50' : 'bg-white'}`}>
            <button 
              type="button"
              className="flex justify-between items-center w-full text-left cursor-pointer group p-3 focus:outline-none focus:ring-2 focus:ring-kare-200 rounded-lg"
              onClick={() => toggleQuestion(index)}
              aria-expanded={openIndex === index ? "true" : "false"}
            >
              <span className={`font-medium ${openIndex === index ? 'text-kare-800' : 'text-gray-800'} group-hover:text-kare-700 text-sm sm:text-base`}>
                {faq.question}
              </span>
              <span className="ml-2 flex-shrink-0">
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-kare-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-400 group-hover:text-kare-500 flex-shrink-0" />
                )}
              </span>
            </button>
            {openIndex === index && (
              <div className="px-3 pb-3 text-gray-700 animate-accordion-down text-sm sm:text-base">
                <p>{faq.answer}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
