import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { sanitizeInput, validateField, sanitizeFormData } from "@/lib/inputSecurity";
import { generateCsrfToken, addCsrfHeader } from "@/lib/csrfProtection";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);
  const [csrfToken, setCsrfToken] = useState<string>("");
  
  useEffect(() => {
    // Generate CSRF token when component mounts
    const token = generateCsrfToken();
    setCsrfToken(token);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    // Sanitize input on change
    const sanitizedValue = sanitizeInput(value);
    setFormData((prev) => ({ ...prev, [name]: sanitizedValue }));
    
    // Clear error when user starts typing
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof FormErrors];
        return newErrors;
      });
    }
  };
  
  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    
    // Validate name (2-50 characters)
    const nameValidation = validateField(formData.name, 'text', true, 2, 50);
    if (!nameValidation.isValid) {
      errors.name = nameValidation.errorMessage;
    }
    
    // Validate email
    const emailValidation = validateField(formData.email, 'email', true);
    if (!emailValidation.isValid) {
      errors.email = emailValidation.errorMessage;
    }
    
    // Validate subject
    const subjectValidation = validateField(formData.subject, 'text', true, 3, 100);
    if (!subjectValidation.isValid) {
      errors.subject = subjectValidation.errorMessage;
    }
    
    // Validate message (10-1000 characters)
    const messageValidation = validateField(formData.message, 'message', true, 10, 1000);
    if (!messageValidation.isValid) {
      errors.message = messageValidation.errorMessage;
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form before submission
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a production app, here you would send the sanitized data to your backend
      const sanitizedData = {
        name: sanitizeInput(formData.name),
        email: sanitizeInput(formData.email),
        subject: sanitizeInput(formData.subject),
        message: sanitizeInput(formData.message)
      };
      
      // Add CSRF token to headers for API requests
      const headers = addCsrfHeader({
        'Content-Type': 'application/json'
      });
      
      // For debugging
      console.log('Sanitized form data:', sanitizedData);
      console.log('Request headers with CSRF token:', headers);
      
      // Simulate form submission
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitStatus("success");
        // Reset form after successful submission
        setFormData({ name: "", email: "", subject: "", message: "" });
        
        // Clear success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus(null);
        }, 5000);
      }, 1500);
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="bg-white shadow-sm rounded-xl p-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-kare-800">Contact Us</h1>
          <p className="text-gray-600 mb-8">We're here to help with your healthcare questions.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Hidden CSRF token input */}
                <input type="hidden" name="_csrf" value={csrfToken} />
                
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    maxLength={50}
                    className={`w-full px-4 py-2 border ${formErrors.name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-kare-300 focus:border-transparent`}
                  />
                  {formErrors.name && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-2 border ${formErrors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-kare-300 focus:border-transparent`}
                  />
                  {formErrors.email && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-2 border ${formErrors.subject ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-kare-300 focus:border-transparent`}
                  >
                    <option value="">Select a topic</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Support Request</option>
                    <option value="feedback">Feedback</option>
                    <option value="partnership">Partnership Opportunity</option>
                  </select>
                  {formErrors.subject && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.subject}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    maxLength={1000}
                    className={`w-full px-4 py-2 border ${formErrors.message ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-kare-300 focus:border-transparent`}
                  ></textarea>
                  {formErrors.message && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.message}</p>
                  )}
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2 px-4 bg-kare-600 text-white rounded-md hover:bg-kare-700 transition-colors flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin mr-2">⌛</span>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} className="mr-2" />
                      Send Message
                    </>
                  )}
                </button>
                
                {submitStatus === "success" && (
                  <div className="p-3 bg-green-50 border border-green-200 text-green-700 rounded-md">
                    Thank you for your message! We'll get back to you soon.
                  </div>
                )}
                
                {submitStatus === "error" && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">
                    There was an error sending your message. Please try again.
                  </div>
                )}
              </form>
            </div>
            
            {/* Contact Information */}
            <div className="bg-lavender-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-kare-800 mb-4">Contact Information</h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-kare-600 mt-1 mr-3" />
                  <div>
                    <p className="font-medium">Email</p>
                    <a href="mailto:karekoreahealth@gmail.com" className="text-kare-600 hover:underline">
                      karekoreahealth@gmail.com
                    </a>
                  </div>
                </div>
                

              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-medium text-kare-800 mb-3">Follow Us</h3>
                <div className="flex space-x-3">
                  <a 
                    href="https://www.instagram.com/karekoreahealth/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 bg-white rounded-full text-kare-600 hover:text-kare-800 transition-colors"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                  <a 
                    href="https://www.linkedin.com/company/k-are/posts/?feedView=all" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 bg-white rounded-full text-kare-600 hover:text-kare-800 transition-colors"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact; 