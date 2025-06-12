/**
 * Environment configuration helper
 * This file provides fallback values for environment variables
 * to ensure the application works even when .env is not properly loaded
 */

// Sanity configuration
export const SANITY_CONFIG = {
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || '4zq6kq5m',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'k-are1',
  apiVersion: import.meta.env.VITE_SANITY_API_VERSION || '2023-05-03',
  token: import.meta.env.VITE_SANITY_API_TOKEN || '',
};

// News API configuration
export const NEWS_API_CONFIG = {
  apiKey: import.meta.env.VITE_NEWS_API_KEY || '',
};

// Environment
export const ENVIRONMENT = import.meta.env.VITE_ENVIRONMENT || 'development';

// Log configuration for debugging
if (ENVIRONMENT === 'development') {
  console.log('Environment configuration loaded with the following values:');
  console.log(`- Sanity Project ID: ${SANITY_CONFIG.projectId}`);
  console.log(`- Sanity Dataset: ${SANITY_CONFIG.dataset}`);
  console.log(`- Sanity API Version: ${SANITY_CONFIG.apiVersion}`);
  console.log(`- Sanity Token: ${SANITY_CONFIG.token ? '[Set]' : '[Not set]'}`);
  console.log(`- News API Key: ${NEWS_API_CONFIG.apiKey ? '[Set]' : '[Not set]'}`);
  console.log(`- Environment: ${ENVIRONMENT}`);
  
  if (!import.meta.env.VITE_SANITY_PROJECT_ID) {
    console.warn('Warning: VITE_SANITY_PROJECT_ID not found in environment variables. Using default value.');
    console.info('If you have a .env file, make sure it contains VITE_SANITY_PROJECT_ID=4zq6kq5m');
  }
} 