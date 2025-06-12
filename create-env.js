import { writeFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

// Get the directory name in ES modules
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const envFilePath = path.join(__dirname, '.env');

const envContent = `# Sanity CMS Configuration
VITE_SANITY_PROJECT_ID=4zq6kq5m
VITE_SANITY_DATASET=k-are1
VITE_SANITY_API_VERSION=2023-05-03
VITE_SANITY_API_TOKEN=

# News API Configuration
VITE_NEWS_API_KEY=

# Environment (development, production, staging)
VITE_ENVIRONMENT=development
`;

// Write the .env file
try {
  await writeFile(envFilePath, envContent);
  console.log('✅ Successfully created .env file in project root!');
  console.log('To use the app with real data, you should add your own API tokens to this file.');
} catch (error) {
  console.error('❌ Error creating .env file:', error.message);
  console.log('Try creating the file manually following the instructions in the app console.');
} 