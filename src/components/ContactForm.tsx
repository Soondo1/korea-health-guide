import React, { useState, useEffect, useCallback } from "react";
import { Send, Mail, AlertCircle, Clock, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { sanitizeInput, validateField } from "@/lib/inputSecurity";
import { generateCsrfToken } from "@/lib/csrfProtection";
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
  submit?: string;
}

interface ContactFormProps {
  recipientEmail?: string;
}

// Enhanced rate limiting with session persistence
const RATE_LIMIT_CONFIG = {
  maxRequests: 3,
  timeWindow: 5 * 60 * 1000, // 5 minutes
  storageKey: 'kare_contact_form_rate_limit'
};

// Network timeout configuration
const NETWORK_TIMEOUT = 10000; // 10 seconds

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
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | "timeout" | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [csrfToken, setCsrfToken] = useState<string>("");
  const [rateLimitError, setRateLimitError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [isRetrying, setIsRetrying] = useState(false);
  
  // Enhanced rate limiter with better configuration
  const checkRateLimit = useCallback(createRateLimiter(RATE_LIMIT_CONFIG), []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTouch('ontouchstart' in window);
    };
    
    // Generate CSRF token when component mounts
    try {
      const token = generateCsrfToken();
      setCsrfToken(token);
    } catch (error) {
      // Handle CSRF token generation error gracefully
      console.warn("Failed to generate CSRF token, proceeding without it");
    }
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Enhanced form validation with better error messages
  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    
    // Validate name with improved criteria
    const nameValidation = validateField(formData.name.trim(), 'text', true, 2, 50);
    if (!nameValidation.isValid) {
      errors.name = nameValidation.errorMessage;
    } else if (!/^[a-zA-Z\s\-'\.]+$/.test(formData.name.trim())) {
      errors.name = "Name can only contain letters, spaces, hyphens, apostrophes, and periods";
    }
    
    // Validate surname with improved criteria
    const surnameValidation = validateField(formData.surname.trim(), 'text', true, 2, 50);
    if (!surnameValidation.isValid) {
      errors.surname = surnameValidation.errorMessage;
    } else if (!/^[a-zA-Z\s\-'\.]+$/.test(formData.surname.trim())) {
      errors.surname = "Surname can only contain letters, spaces, hyphens, apostrophes, and periods";
    }
    
    // Enhanced email validation
    const emailValidation = validateField(formData.email.trim(), 'email', true);
    if (!emailValidation.isValid) {
      errors.email = emailValidation.errorMessage;
    } else if (formData.email.trim().length > 100) {
      errors.email = "Email address is too long";
    }
    
    // Enhanced message validation
    const messageValidation = validateField(formData.message.trim(), 'message', true, 10, 1000);
    if (!messageValidation.isValid) {
      errors.message = messageValidation.errorMessage;
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Debug logging to see what's happening with the input
    if (process.env.NODE_ENV === 'development') {
      console.log(`Input change for ${name}:`, {
        originalValue: value,
        hasSpaces: value.includes(' '),
        length: value.length
      });
    }
    
    // Set the form data exactly as typed - no processing during input
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear specific field error when user starts typing
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof FormErrors];
        return newErrors;
      });
    }
    
    // Clear submit error when user makes changes
    if (formErrors.submit) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.submit;
        return newErrors;
      });
    }
  };

  // Enhanced network request with timeout and retry logic
  const submitWithTimeout = async (url: string, options: RequestInit): Promise<Response> => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), NETWORK_TIMEOUT);
    
    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('Request timeout - please check your internet connection and try again');
      }
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear previous errors
    setFormErrors({});
    setRateLimitError(null);
    
    // Validate form before submission
    if (!validateForm()) {
      return;
    }
    
    // Enhanced rate limit check with better error handling
    try {
      const rateLimitResult = checkRateLimit();
      if (!rateLimitResult.allowed) {
        const resetTimeMs = rateLimitResult.resetTime ? rateLimitResult.resetTime - Date.now() : 0;
        const timeRemaining = formatTimeRemaining(Math.max(0, resetTimeMs));
        setRateLimitError(`Too many submissions. Please wait ${timeRemaining} before trying again.`);
        return;
      }
    } catch (error) {
      // If rate limiting fails, allow submission but log the issue
      console.warn("Rate limiting check failed, allowing submission");
    }
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      // Sanitize form data before submission (preserve internal spaces)
      const sanitizedData = {
        name: sanitizeInput(formData.name, 50, true).trim(),
        surname: sanitizeInput(formData.surname, 50, true).trim(),
        email: sanitizeInput(formData.email, 100, true).trim(),
        message: sanitizeInput(formData.message, 1000, true).trim()
      };
      
      // Validate sanitized data isn't empty
      if (!sanitizedData.name || !sanitizedData.surname || !sanitizedData.email || !sanitizedData.message) {
        throw new Error("Invalid data after sanitization");
      }
      
      // Prepare form data for Netlify
      const encode = (data: Record<string, string>) => {
        return Object.keys(data)
          .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
          .join("&");
      };

      const submitData = {
        "form-name": "contact",
        "bot-field": "",
        name: sanitizedData.name,
        surname: sanitizedData.surname,
        email: sanitizedData.email,
        message: sanitizedData.message,
      };

      // Submit to Netlify with timeout handling
      const response = await submitWithTimeout("/", {
        method: "POST",
        headers: { 
          "Content-Type": "application/x-www-form-urlencoded",
          ...(csrfToken && { "X-CSRF-Token": csrfToken })
        },
        body: encode(submitData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", surname: "", email: "", message: "" });
        setRetryCount(0);
        
        // Clear success message after 8 seconds
        setTimeout(() => {
          setSubmitStatus(null);
        }, 8000);
      } else {
        // Handle different HTTP error codes
        const errorText = await response.text().catch(() => '');
        let errorMessage = `Submission failed (${response.status})`;
        
        if (response.status === 429) {
          errorMessage = "Too many requests. Please wait a moment and try again.";
        } else if (response.status >= 500) {
          errorMessage = "Server error. Please try again in a few minutes.";
        } else if (response.status === 413) {
          errorMessage = "Message is too large. Please shorten your message and try again.";
        }
        
        throw new Error(errorMessage);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      
      if (errorMessage.includes('timeout')) {
        setSubmitStatus("timeout");
      } else {
        setSubmitStatus("error");
        setFormErrors(prev => ({ ...prev, submit: errorMessage }));
      }
      
      // Don't log network errors to console in production
      if (process.env.NODE_ENV === 'development') {
        console.error("Form submission error:", error);
      }
    } finally {
      setIsSubmitting(false);
      setIsRetrying(false);
    }
  };

  // Retry functionality for failed submissions
  const handleRetry = () => {
    if (retryCount < 2) { // Allow up to 2 retries
      setRetryCount(prev => prev + 1);
      setIsRetrying(true);
      setSubmitStatus(null);
      setFormErrors({});
      
      // Add a small delay before retry
      setTimeout(() => {
        const form = document.querySelector('form[name="contact"]') as HTMLFormElement;
        if (form) {
          form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
        }
      }, 1000);
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
          Have questions about Korean healthcare? We're here to help!
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
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              maxLength={50}
              disabled={isSubmitting || isRetrying}
              className={`flex h-12 w-full rounded-md border ${
                formErrors.name ? 'border-red-500 bg-red-50' : 'border-input'
              } bg-background px-4 py-3 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kare-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors`}
              placeholder="Enter your first name"
              aria-describedby={formErrors.name ? "name-error" : undefined}
            />
            <AnimatePresence>
              {formErrors.name && (
                <motion.p 
                  id="name-error"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-1 text-sm text-red-500 flex items-center"
                >
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {formErrors.name}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <label htmlFor="surname" className="block text-base font-medium text-kare-700 mb-2">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="surname"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              required
              maxLength={50}
              disabled={isSubmitting || isRetrying}
              className={`flex h-12 w-full rounded-md border ${
                formErrors.surname ? 'border-red-500 bg-red-50' : 'border-input'
              } bg-background px-4 py-3 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kare-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors`}
              placeholder="Enter your last name"
              aria-describedby={formErrors.surname ? "surname-error" : undefined}
            />
            <AnimatePresence>
              {formErrors.surname && (
                <motion.p 
                  id="surname-error"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-1 text-sm text-red-500 flex items-center"
                >
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {formErrors.surname}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <label htmlFor="email" className="block text-base font-medium text-kare-700 mb-2">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              maxLength={100}
              disabled={isSubmitting || isRetrying}
              className={`flex h-12 w-full rounded-md border ${
                formErrors.email ? 'border-red-500 bg-red-50' : 'border-input'
              } bg-background px-4 py-3 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kare-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors`}
              placeholder="your.email@example.com"
              aria-describedby={formErrors.email ? "email-error" : undefined}
            />
            <AnimatePresence>
              {formErrors.email && (
                <motion.p 
                  id="email-error"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-1 text-sm text-red-500 flex items-center"
                >
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {formErrors.email}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <label htmlFor="message" className="block text-base font-medium text-kare-700 mb-2">
              Your Message <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              maxLength={1000}
              disabled={isSubmitting || isRetrying}
              className={`flex min-h-[100px] w-full rounded-md border ${
                formErrors.message ? 'border-red-500 bg-red-50' : 'border-input'
              } bg-background px-4 py-3 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kare-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors resize-vertical`}
              placeholder="How can we help you with Korean healthcare? Please describe your question or concern..."
              aria-describedby={formErrors.message ? "message-error" : undefined}
            />
            <div className="flex justify-between items-center mt-1">
              <AnimatePresence>
                {formErrors.message && (
                  <motion.p 
                    id="message-error"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-sm text-red-500 flex items-center"
                  >
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {formErrors.message}
                  </motion.p>
                )}
              </AnimatePresence>
              <span className={`text-xs ${
                formData.message.length > 900 ? 'text-red-500' : 'text-gray-500'
              }`}>
                {formData.message.length}/1000
              </span>
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="pt-3">
            <motion.button
              type="submit"
              disabled={isSubmitting || isRetrying}
              className="w-full py-4 text-lg bg-gradient-to-r from-kare-600 to-teal-500 text-white rounded-md hover:from-kare-700 hover:to-teal-600 transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
              whileHover={!isTouch && !(isSubmitting || isRetrying) ? { scale: 1.02 } : {}}
              whileTap={!(isSubmitting || isRetrying) ? { scale: 0.98 } : {}}
            >
              {isSubmitting || isRetrying ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="mr-2"
                  >
                    <Clock className="h-5 w-5" />
                  </motion.div>
                  {isRetrying ? 'Retrying...' : 'Submitting...'}
                </>
              ) : (
                <>
                  <Send className="h-5 w-5 mr-2" />
                  Send Message
                </>
              )}
            </motion.button>
          </motion.div>
          
          {/* Success Message */}
          <AnimatePresence>
            {submitStatus === "success" && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-md flex items-center text-base"
              >
                <CheckCircle className="h-5 w-5 mr-3 flex-shrink-0" />
                <div>
                  <p className="font-medium">Message sent successfully!</p>
                  <p className="text-sm mt-1">We'll get back to you within 24 hours.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Error Message */}
          <AnimatePresence>
            {submitStatus === "error" && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-md"
              >
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 mr-3 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium">Message could not be sent</p>
                    {formErrors.submit && (
                      <p className="text-sm mt-1">{formErrors.submit}</p>
                    )}
                    {retryCount < 2 && (
                      <button
                        type="button"
                        onClick={handleRetry}
                        className="mt-2 text-sm underline hover:no-underline focus:outline-none"
                      >
                        Try again
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Timeout Message */}
          <AnimatePresence>
            {submitStatus === "timeout" && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className="p-4 bg-amber-50 border border-amber-200 text-amber-700 rounded-md"
              >
                <div className="flex items-start">
                  <Clock className="h-5 w-5 mr-3 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium">Connection timeout</p>
                    <p className="text-sm mt-1">Please check your internet connection and try again.</p>
                    <button
                      type="button"
                      onClick={handleRetry}
                      className="mt-2 text-sm underline hover:no-underline focus:outline-none"
                    >
                      Retry submission
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Rate Limit Error */}
          <AnimatePresence>
            {rateLimitError && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className="p-4 bg-amber-50 border border-amber-200 text-amber-700 rounded-md flex items-center text-base"
              >
                <AlertCircle className="h-5 w-5 mr-3 flex-shrink-0" />
                <div>
                  <p className="font-medium">Too many submissions</p>
                  <p className="text-sm mt-1">{rateLimitError}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.form>
    </motion.div>
  );
};

export default ContactForm; 