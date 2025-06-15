import React, { useState, useEffect, useCallback } from "react";
import { Send, Mail, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { sanitizeInput, validateField } from "@/lib/inputSecurity";
import { generateCsrfToken, addCsrfHeader } from "@/lib/csrfProtection";
import { createRateLimiter, formatTimeRemaining } from "@/lib/rateLimiting";

interface FormData {
  name: string;
  surname: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  surname?: string;
  email?: string;
  message?: string;
}

interface ContactFormProps {
  recipientEmail?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ 
  recipientEmail = "karekoreahealth@gmail.com" 
}) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    surname: "",
    email: "",
    message: ""
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);
const [isMobile, setIsMobile] = useState(false);
const [isTouch,  setIsTouch]  = useState(false);

useEffect(() => {
  setIsMobile(window.innerWidth < 768);
  setIsTouch('ontouchstart' in window);
}, []);
  const [csrfToken, setCsrfToken] = useState<string>("");
  const [rateLimitError, setRateLimitError] = useState<string | null>(null);
  
  // Create rate limiter with a maximum of 3 form submissions in 5 minutes
  const checkRateLimit = useCallback(createRateLimiter({
    maxRequests: 3,
    timeWindow: 5 * 60 * 1000, // 5 minutes
    storageKey: 'contact_form_rate_limit'
  }), []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTouch('ontouchstart' in window);
    };
    
    // Generate CSRF token when component mounts
    const token = generateCsrfToken();
    setCsrfToken(token);
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    // Don't sanitize during typing - only sanitize on form submission
    setFormData((prev) => ({ ...prev, [name]: value }));
    
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
    
    // Validate surname (2-50 characters)
    const surnameValidation = validateField(formData.surname, 'text', true, 2, 50);
    if (!surnameValidation.isValid) {
      errors.surname = surnameValidation.errorMessage;
    }
    
    // Validate email
    const emailValidation = validateField(formData.email, 'email', true);
    if (!emailValidation.isValid) {
      errors.email = emailValidation.errorMessage;
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
    
    // Check rate limit before processing
    const rateLimitResult = checkRateLimit();
    if (!rateLimitResult.allowed) {
      const resetTimeMs = rateLimitResult.resetTime ? rateLimitResult.resetTime - Date.now() : 0;
      const timeRemaining = formatTimeRemaining(resetTimeMs);
      setRateLimitError(`Too many requests. Please try again in ${timeRemaining}.`);
      return;
    }
    
    // Clear any rate limit errors
    setRateLimitError(null);
    
    setIsSubmitting(true);
    
    try {
      // Sanitize form data before submission
      const sanitizedData = {
        name: sanitizeInput(formData.name),
        surname: sanitizeInput(formData.surname),
        email: sanitizeInput(formData.email),
        message: sanitizeInput(formData.message)
      };
      
      // Create URLSearchParams for Netlify Forms submission
      const formParams = new URLSearchParams();
      formParams.append('form-name', 'contact');
      formParams.append('bot-field', ''); // Honeypot field should be empty
      formParams.append('name', sanitizedData.name);
      formParams.append('surname', sanitizedData.surname);
      formParams.append('email', sanitizedData.email);
      formParams.append('message', sanitizedData.message);
      
      // Submit to Netlify
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formParams.toString()
      });
      
      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", surname: "", email: "", message: "" });
        
        // Clear success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus(null);
        }, 5000);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: isMobile ? 0.4 : 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: isMobile ? 0.3 : 0.5
      }
    }
  };

  return (
    <motion.div 
      className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 shadow-sm max-w-4xl mx-auto"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={containerVariants}
    >
      <motion.div variants={itemVariants} className="text-center mb-8">
        <motion.h2 
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
          variants={itemVariants}
        >
          <span className="bg-clip-text text-transparent bg-gradient-logo">CONTACT US</span>
        </motion.h2>
        <motion.p 
          className="text-lg sm:text-xl text-kare-600 max-w-3xl mx-auto"
          variants={itemVariants}
        >
          Have questions? Fill in the form below!
        </motion.p>
      </motion.div>
      
      <motion.form
        name="contact"
        method="POST"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto"
        variants={containerVariants}
      >
        {/* Hidden inputs for Netlify Forms */}
        <input type="hidden" name="form-name" value="contact" />
        <div style={{ display: 'none' }}>
          <label>
            Don't fill this out if you're human: <input name="bot-field" />
          </label>
        </div>
        <input type="hidden" name="_subject" value={`New Contact Form Submission from ${formData.name} ${formData.surname}`} />
        
        <div className="space-y-5">
          <motion.div variants={itemVariants}>
            <label htmlFor="name" className="block text-base font-medium text-kare-700 mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              maxLength={50}
              className={`flex h-12 w-full rounded-md border ${formErrors.name ? 'border-red-500' : 'border-input'} bg-background px-4 py-3 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kare-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
              placeholder="Enter your first name"
            />
            {formErrors.name && (
              <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>
            )}
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <label htmlFor="surname" className="block text-base font-medium text-kare-700 mb-2">
              Surname
            </label>
            <input
              type="text"
              id="surname"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              required
              maxLength={50}
              className={`flex h-12 w-full rounded-md border ${formErrors.surname ? 'border-red-500' : 'border-input'} bg-background px-4 py-3 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kare-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
              placeholder="Enter your family name"
            />
            {formErrors.surname && (
              <p className="mt-1 text-sm text-red-500">{formErrors.surname}</p>
            )}
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <label htmlFor="email" className="block text-base font-medium text-kare-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={`flex h-12 w-full rounded-md border ${formErrors.email ? 'border-red-500' : 'border-input'} bg-background px-4 py-3 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kare-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
              placeholder="your.email@example.com"
            />
            {formErrors.email && (
              <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>
            )}
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <label htmlFor="message" className="block text-base font-medium text-kare-700 mb-2">
              Questions or Inquiries
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              maxLength={1000}
              className={`flex min-h-[100px] w-full rounded-md border ${formErrors.message ? 'border-red-500' : 'border-input'} bg-background px-4 py-3 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kare-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
              placeholder="How can we help you with Korean healthcare? Ask your questions here..."
            />
            {formErrors.message && (
              <p className="mt-1 text-sm text-red-500">{formErrors.message}</p>
            )}
          </motion.div>
          
          <motion.div variants={itemVariants} className="pt-3">
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 text-lg bg-gradient-to-r from-kare-600 to-teal-500 text-white rounded-md hover:from-kare-700 hover:to-teal-600 transition-colors flex items-center justify-center"
              whileHover={!isTouch ? { scale: 1.02 } : {}}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? (
                <>
                  <span className="animate-spin mr-2">⌛</span>
                  Submitting...
                </>
              ) : (
                <>
                  Submit
                </>
              )}
            </motion.button>
          </motion.div>
          
          {submitStatus === "success" && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-md flex items-center text-base"
            >
              <Mail className="h-5 w-5 mr-2" />
              Your message has been sent successfully! We'll be in touch soon.
            </motion.div>
          )}
          
          {submitStatus === "error" && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-md text-base"
            >
              There was an error sending your message. Please try again.
            </motion.div>
          )}
          
          {rateLimitError && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="p-4 bg-amber-50 border border-amber-200 text-amber-700 rounded-md flex items-center text-base"
            >
              <AlertCircle className="h-5 w-5 mr-2" />
              {rateLimitError}
            </motion.div>
          )}
        </div>
      </motion.form>
    </motion.div>
  );
};

export default ContactForm; 