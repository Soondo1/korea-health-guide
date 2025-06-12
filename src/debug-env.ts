/**
 * Environment Variables Debugging Helper
 * This file provides utility functions to debug environment variable loading issues
 */

// Debug function to check if environment variables are properly loaded
export function debugEnvironmentVariables() {
  console.group('🔍 Environment Variables Debug Info');
  
  // Check Sanity configuration
  const sanityProjectId = import.meta.env.VITE_SANITY_PROJECT_ID;
  const sanityDataset = import.meta.env.VITE_SANITY_DATASET;
  const sanityApiVersion = import.meta.env.VITE_SANITY_API_VERSION;
  const sanityToken = import.meta.env.VITE_SANITY_API_TOKEN;
  
  console.log('Sanity Configuration:');
  console.log(`- VITE_SANITY_PROJECT_ID: ${sanityProjectId ? '✅ Set' : '❌ Not set'}`);
  console.log(`- VITE_SANITY_DATASET: ${sanityDataset ? '✅ Set' : '❌ Not set'}`);
  console.log(`- VITE_SANITY_API_VERSION: ${sanityApiVersion ? '✅ Set' : '❌ Not set'}`);
  console.log(`- VITE_SANITY_API_TOKEN: ${sanityToken ? '✅ Set' : '❌ Not set'}`);
  
  // Check News API configuration
  const newsApiKey = import.meta.env.VITE_NEWS_API_KEY;
  console.log('\nNews API Configuration:');
  console.log(`- VITE_NEWS_API_KEY: ${newsApiKey ? '✅ Set' : '❌ Not set'}`);
  
  // Check environment mode
  const isDev = import.meta.env.DEV;
  const isProd = import.meta.env.PROD;
  const mode = import.meta.env.MODE;
  
  console.log('\nEnvironment Mode:');
  console.log(`- DEV: ${isDev ? '✅ True' : '❌ False'}`);
  console.log(`- PROD: ${isProd ? '✅ True' : '❌ False'}`);
  console.log(`- MODE: ${mode}`);
  
  // Check if Vite is properly loading .env file
  console.log('\nVite Environment Processing:');
  if (!sanityProjectId && !sanityDataset && !sanityApiVersion && !sanityToken && !newsApiKey) {
    console.error('❌ No environment variables detected. Potential issues:');
    console.error('   1. .env file might be missing');
    console.error('   2. .env file might be in the wrong location (should be in project root)');
    console.error('   3. Environment variables might be incorrectly formatted');
    console.error('   4. Vite might not be loading the .env file properly');
  } else if (!sanityProjectId || !sanityDataset) {
    console.warn('⚠️ Some critical environment variables are missing');
  } else {
    console.log('✅ Environment variables are being loaded');
  }
  
  console.groupEnd();
}

// Instructions for .env file format
export function printEnvFileInstructions() {
  console.group('📝 .env File Format Instructions');
  console.log(`
Create a file named '.env' in the root of your project (same level as package.json)
with the following content:

# Sanity CMS Configuration
VITE_SANITY_PROJECT_ID=4zq6kq5m
VITE_SANITY_DATASET=k-are1
VITE_SANITY_API_VERSION=2023-05-03
VITE_SANITY_API_TOKEN=your_token_here

# News API Configuration
VITE_NEWS_API_KEY=your_news_api_key

# Environment (development, production, staging)
VITE_ENVIRONMENT=development

Make sure there are:
- No spaces around the equals sign
- No quotes around values
- No trailing spaces
- Each variable on its own line
  `);
  console.groupEnd();
} 