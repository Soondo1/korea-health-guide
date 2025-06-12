import React from 'react';

/**
 * CSRF Protection Utilities
 * 
 * This module provides functions for implementing Cross-Site Request Forgery (CSRF) protection.
 * In a real application, these functions would interact with server-side CSRF token validation.
 */

/**
 * Generates a CSRF token and stores it in localStorage or sessionStorage
 * Note: In production, tokens should be generated server-side and stored in HttpOnly cookies
 * @returns A CSRF token string
 */
export function generateCsrfToken(): string {
  // In a real implementation, this would be generated server-side
  // This is a simplified client-side implementation for demonstration
  const token = Array.from(
    window.crypto.getRandomValues(new Uint8Array(32)),
    (byte) => byte.toString(16).padStart(2, '0')
  ).join('');
  
  // Store the token (in production, this would be stored in a HttpOnly cookie by the server)
  sessionStorage.setItem('csrf_token', token);
  
  return token;
}

/**
 * Retrieves the stored CSRF token
 * @returns The stored CSRF token or null if not found
 */
export function getCsrfToken(): string | null {
  return sessionStorage.getItem('csrf_token');
}

/**
 * Validates that a token matches the stored CSRF token
 * In a real implementation, this validation would happen server-side
 * @param token The token to validate
 * @returns True if the token is valid, false otherwise
 */
export function validateCsrfToken(token: string): boolean {
  const storedToken = getCsrfToken();
  return storedToken !== null && token === storedToken;
}

/**
 * Creates a hidden input element containing the CSRF token
 * @returns A React element with the CSRF token
 */
export function createCsrfTokenInput(): React.ReactElement {
  // Generate a new token if one doesn't exist
  const token = getCsrfToken() || generateCsrfToken();
  
  return React.createElement('input', {
    type: 'hidden',
    name: '_csrf',
    value: token
  });
}

/**
 * Adds CSRF token to fetch or axios requests
 * @param headers Headers object to modify
 * @returns Updated headers object with CSRF token
 */
export function addCsrfHeader(headers: Record<string, string> = {}): Record<string, string> {
  const token = getCsrfToken();
  
  if (token) {
    return {
      ...headers,
      'X-CSRF-Token': token
    };
  }
  
  return headers;
} 