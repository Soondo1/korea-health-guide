import DOMPurify from 'isomorphic-dompurify'; // works on both server & client

/**
 * Sanitizes user input to prevent XSS attacks
 * @param input The user input to sanitize
 * @param maxLength Optional maximum length for the input
 * @param preserveSpaces Whether to preserve internal spaces (default: true)
 * @returns Sanitized string
 */
export function sanitizeInput(input: string, maxLength: number = 1000, preserveSpaces: boolean = true): string {
  if (!input) return '';
  
  // Convert to string in case a number or other type is passed
  const stringInput = String(input);
  
  // Use DOMPurify to remove any HTML/script tags
  const sanitized = DOMPurify.sanitize(stringInput, {
    ALLOWED_TAGS: [], // Don't allow any HTML tags
    ALLOWED_ATTR: [], // Don't allow any HTML attributes
  });
  
  // If preserveSpaces is true, only trim leading/trailing whitespace
  // Otherwise, use the old behavior
  if (preserveSpaces) {
    return sanitized.slice(0, maxLength);
  } else {
    return sanitized.trim().slice(0, maxLength);
  }
}

/**
 * Validates an email address with enhanced criteria
 * @param email The email address to validate
 * @returns Boolean indicating if the email is valid
 */
export function validateEmail(email: string): boolean {
  // Use a more comprehensive regular expression for email validation
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
  // Basic format check
  if (!emailRegex.test(email)) {
    return false;
  }
  
  // Additional checks for common issues
  const trimmedEmail = email.trim();
  
  // Check for minimum and maximum length
  if (trimmedEmail.length < 5 || trimmedEmail.length > 100) {
    return false;
  }
  
  // Check for consecutive dots
  if (trimmedEmail.includes('..')) {
    return false;
  }
  
  // Check for valid TLD (at least 2 characters)
  const parts = trimmedEmail.split('.');
  const tld = parts[parts.length - 1];
  if (tld.length < 2) {
    return false;
  }
  
  return true;
}

/**
 * Validates a form field based on its type
 * @param value The value to validate
 * @param type The type of validation to perform
 * @param required Whether the field is required
 * @param minLength Minimum length (optional)
 * @param maxLength Maximum length (optional)
 * @returns An object with isValid and errorMessage properties
 */
export function validateField(
  value: string,
  type: 'text' | 'email' | 'tel' | 'url' | 'message',
  required: boolean = true,
  minLength: number = 0,
  maxLength: number = 1000
): { isValid: boolean; errorMessage: string } {
  // Check if required field is empty
  if (required && (!value || value.trim() === '')) {
    return { isValid: false, errorMessage: 'This field is required' };
  }
  
  // Skip further validation if empty and not required
  if (!value || value.trim() === '') {
    return { isValid: true, errorMessage: '' };
  }
  
  // Check length constraints
  if (value.length < minLength) {
    return { 
      isValid: false, 
      errorMessage: `Must be at least ${minLength} characters` 
    };
  }
  
  if (value.length > maxLength) {
    return { 
      isValid: false, 
      errorMessage: `Must not exceed ${maxLength} characters` 
    };
  }
  
  // Type-specific validation
  switch (type) {
    case 'email':
      if (!validateEmail(value)) {
        return { isValid: false, errorMessage: 'Please enter a valid email address' };
      }
      break;
    case 'tel':
      // Basic phone validation (allows various formats)
      if (!/^[+\s\d()-]{7,20}$/.test(value)) {
        return { isValid: false, errorMessage: 'Please enter a valid phone number' };
      }
      break;
    case 'url':
      try {
        new URL(value);
      } catch (e) {
        return { isValid: false, errorMessage: 'Please enter a valid URL' };
      }
      break;
  }
  
  return { isValid: true, errorMessage: '' };
}

/**
 * Sanitizes an entire form data object
 * @param formData Object containing form data
 * @returns New object with sanitized values
 */
export function sanitizeFormData<T extends Record<string, string>>(formData: T): Record<keyof T, string> {
  const sanitized: Record<string, string> = {};
  
  Object.keys(formData).forEach(key => {
    sanitized[key] = sanitizeInput(formData[key]);
  });
  
  return sanitized as Record<keyof T, string>;
} 