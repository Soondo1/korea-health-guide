#!/usr/bin/env node

/**
 * This script simulates the Netlify build process locally
 * Run with: node netlify-build-test.mjs
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

console.log('🚀 Starting Netlify build test...');

// Verify required files exist
const requiredFiles = ['package.json', 'vite.config.ts', 'netlify.toml', '.nvmrc'];
requiredFiles.forEach(file => {
  if (!fs.existsSync(file)) {
    console.error(`❌ Required file not found: ${file}`);
    process.exit(1);
  }
});

console.log('✅ All required files found');

// Check for environment variables
const envVars = ['VITE_SANITY_PROJECT_ID', 'VITE_SANITY_DATASET', 'VITE_SANITY_API_VERSION'];
envVars.forEach(envVar => {
  if (!process.env[envVar]) {
    console.warn(`⚠️ Environment variable not set: ${envVar} (will use defaults)`);
  } else {
    console.log(`✅ Found environment variable: ${envVar}`);
  }
});

// Set fallback values for Sanity environment variables
process.env.VITE_SANITY_PROJECT_ID = process.env.VITE_SANITY_PROJECT_ID || '4zq6kq5m';
process.env.VITE_SANITY_DATASET = process.env.VITE_SANITY_DATASET || 'k-are1';
process.env.VITE_SANITY_API_VERSION = process.env.VITE_SANITY_API_VERSION || '2023-05-03';

// Make sure the dist directory is clean
console.log('🧹 Cleaning up existing build...');
try {
  if (fs.existsSync('dist')) {
    fs.rmSync('dist', { recursive: true, force: true });
  }
} catch (error) {
  console.warn(`⚠️ Error cleaning dist directory: ${error.message}`);
}

// Run the build process
console.log('🔨 Running build process...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build completed successfully');
} catch (error) {
  console.error('❌ Build failed');
  process.exit(1);
}

// Verify build output
console.log('🔍 Verifying build output...');
if (!fs.existsSync('dist')) {
  console.error('❌ No dist directory found after build');
  process.exit(1);
}

if (!fs.existsSync('dist/index.html')) {
  console.error('❌ No index.html found in dist directory');
  process.exit(1);
}

console.log('✅ Build verification passed');
console.log('✅ Netlify build test completed successfully!');
console.log('');
console.log('Next steps:');
console.log('1. Commit these changes to your repository');
console.log('2. Deploy to Netlify');
console.log(''); 