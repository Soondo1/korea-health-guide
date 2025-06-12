/**
 * Netlify Build Plugin Validation Script
 * 
 * This script validates that our custom plugin follows Netlify's expected structure.
 * It checks:
 * 1. The existence of required files (index.js, manifest.yml)
 * 2. The correct structure of the manifest.yml
 * 3. That the plugin exports the expected hooks
 */

const fs = require('fs');
const path = require('path');
const yaml = require('yaml');

// Define the directory of this script
const pluginDir = __dirname;

function validatePluginStructure() {
  console.log('🔍 Validating Netlify Build Plugin structure...');
  
  // Check for required files
  const requiredFiles = ['index.js', 'manifest.yml'];
  const missingFiles = requiredFiles.filter(file => !fs.existsSync(path.join(pluginDir, file)));
  
  if (missingFiles.length > 0) {
    console.error(`❌ Missing required files: ${missingFiles.join(', ')}`);
    return false;
  }
  
  console.log('✅ All required files are present');
  
  // Validate manifest.yml
  try {
    const manifestPath = path.join(pluginDir, 'manifest.yml');
    const manifestContent = fs.readFileSync(manifestPath, 'utf8');
    const manifest = yaml.parse(manifestContent);
    
    // Check required manifest fields
    if (!manifest.name) {
      console.error('❌ manifest.yml is missing required "name" field');
      return false;
    }
    
    if (!manifest.description) {
      console.error('❌ manifest.yml is missing required "description" field');
      return false;
    }
    
    console.log('✅ manifest.yml has required fields');
    
    // Validate inputs if they exist
    if (manifest.inputs && Array.isArray(manifest.inputs)) {
      const validInputs = manifest.inputs.every(input => {
        const hasName = !!input.name;
        const hasDescription = !!input.description;
        
        if (!hasName || !hasDescription) {
          console.error(`❌ Input "${input.name || 'unknown'}" is missing required fields`);
          return false;
        }
        
        return true;
      });
      
      if (!validInputs) {
        return false;
      }
      
      console.log(`✅ manifest.yml has ${manifest.inputs.length} valid input(s)`);
    }
  } catch (error) {
    console.error('❌ Failed to parse manifest.yml:', error);
    return false;
  }
  
  // Validate plugin exports
  try {
    const plugin = require('./index.js');
    
    // Check that the plugin exports at least one hook
    const hooks = [
      'onPreBuild',
      'onBuild',
      'onPostBuild',
      'onSuccess',
      'onError',
      'onEnd'
    ];
    
    const implementedHooks = hooks.filter(hook => typeof plugin[hook] === 'function');
    
    if (implementedHooks.length === 0) {
      console.error('❌ Plugin does not implement any Netlify Build hooks');
      return false;
    }
    
    console.log(`✅ Plugin implements ${implementedHooks.length} hook(s): ${implementedHooks.join(', ')}`);
    
  } catch (error) {
    console.error('❌ Failed to load plugin:', error);
    return false;
  }
  
  console.log('✅ Plugin validation successful!');
  return true;
}

// Check if this script is being run directly
if (require.main === module) {
  try {
    const isValid = validatePluginStructure();
    process.exit(isValid ? 0 : 1);
  } catch (error) {
    console.error('❌ Unexpected error during validation:', error);
    process.exit(1);
  }
}

module.exports = validatePluginStructure; 