/**
 * Test script for the Vite build plugin
 * Simulates how Netlify would call the plugin
 */

const plugin = require('./index.js');

// Mock Netlify utils
const mockUtils = {
  run: {
    command: async (cmd) => {
      console.log(`[MOCK] Running command: ${cmd}`);
      return { stdout: 'Mock command executed successfully' };
    }
  },
  cache: {
    restore: async (path) => {
      console.log(`[MOCK] Restoring cache for: ${path}`);
      return false;
    },
    save: async (path) => {
      console.log(`[MOCK] Saving cache for: ${path}`);
      return true;
    }
  }
};

// Mock plugin inputs from netlify.toml
const mockInputs = {
  enable_verbose_logging: true
};

async function testPlugin() {
  console.log('🧪 Testing Vite Build Plugin for Netlify...');
  console.log('==========================================');
  
  try {
    // Execute the onPreBuild hook
    await plugin.onPreBuild({ utils: mockUtils, inputs: mockInputs });
    console.log('==========================================');
    console.log('✅ Plugin test completed successfully');
  } catch (error) {
    console.error('❌ Plugin test failed:', error);
    process.exit(1);
  }
}

testPlugin(); 