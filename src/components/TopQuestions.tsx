
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
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-lavender-50 p-6 md:p-8 rounded-xl">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">Top Questions</h2>
      <ul className="space-y-4">
        {faqs.map((faq, index) => (
          <li key={index} className="border-b border-lavender-100 pb-3">
            <button 
              className="flex justify-between items-center w-full text-left cursor-pointer group focus:outline-none"
              onClick={() => toggleQuestion(index)}
              aria-expanded={openIndex === index}
            >
              <span className="font-medium text-gray-900 group-hover:text-kare-700">
                {faq.question}
              </span>
              {openIndex === index ? (
                <ChevronUp className="h-5 w-5 text-kare-500 flex-shrink-0" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-400 group-hover:text-kare-500 flex-shrink-0" />
              )}
            </button>
            {openIndex === index && (
              <div className="mt-2 text-gray-700 pl-2 animate-accordion-down">
                <p>{faq.answer}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
