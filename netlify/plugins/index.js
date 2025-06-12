/**
 * Vite Build Helper Plugin for Netlify
 */

module.exports = {
  onPreBuild: async ({ utils, inputs }) => {
    const verboseLogging = inputs.enable_verbose_logging || false;
    
    if (verboseLogging) {
      console.log('🔍 Verbose logging enabled');
    }
    
    try {
      console.log('Preparing environment for Vite build...');
      
      // Check for required environment variables
      const requiredEnvVars = [
        'VITE_SANITY_PROJECT_ID',
        'VITE_SANITY_DATASET',
        'VITE_SANITY_API_VERSION'
      ];
      
      const missingEnvVars = requiredEnvVars.filter(
        (envVar) => !process.env[envVar]
      );
      
      if (missingEnvVars.length > 0) {
        console.warn(
          `⚠️ Missing required environment variables: ${missingEnvVars.join(', ')}`
        );
        console.log('⚠️ Using default values for missing environment variables');
        
        if (verboseLogging) {
          console.log('📋 Environment variables that will be used:');
          requiredEnvVars.forEach(envVar => {
            console.log(`   - ${envVar}: ${process.env[envVar] || '(using default from netlify.toml)'}`);
          });
        }
      }
      
      // Ensure build dependencies are available
      console.log('Checking for build dependencies...');
      try {
        require.resolve('vite');
        console.log('✅ Vite is installed and available');
        
        if (verboseLogging) {
          const vitePackage = require('vite/package.json');
          console.log(`   - Vite version: ${vitePackage.version}`);
        }
      } catch (error) {
        console.log('⚠️ Vite not found in node_modules, attempting to install...');
        await utils.run.command('npm install vite');
        
        if (verboseLogging) {
          try {
            const vitePackage = require('vite/package.json');
            console.log(`   - Installed Vite version: ${vitePackage.version}`);
          } catch (e) {
            console.log('   - Could not determine installed Vite version');
          }
        }
      }
      
      console.log('✅ Environment is ready for Vite build');
    } catch (error) {
      console.error('⛔ Error in vite-build-plugin:', error);
      // Don't fail the build, just log the error
    }
  }
}; 