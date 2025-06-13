/**
 * Vite Build Helper Plugin for Netlify
 */

export const onPreBuild = async ({ utils, inputs }) => {
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
    
    // Determine package manager (npm or pnpm)
    const usesPnpm = process.env.NETLIFY_USE_PNPM === 'true';
    const packageManager = usesPnpm ? 'pnpm' : 'npm';
    
    if (verboseLogging) {
      console.log(`📦 Using package manager: ${packageManager}`);
    }
    
    // Ensure build dependencies are available
    console.log('Checking for build dependencies...');
    
    const checkDependencies = ['vite', 'terser'];
    
    for (const dep of checkDependencies) {
      try {
        require.resolve(dep);
        console.log(`✅ ${dep} is installed and available`);
        
        if (verboseLogging) {
          try {
            const depPackage = require(`${dep}/package.json`);
            console.log(`   - ${dep} version: ${depPackage.version}`);
          } catch (e) {
            console.log(`   - Could not determine ${dep} version`);
          }
        }
      } catch (error) {
        console.log(`⚠️ ${dep} not found in node_modules, attempting to install...`);
        await utils.run.command(`${packageManager} install ${dep}`);
        
        if (verboseLogging) {
          try {
            const depPackage = require(`${dep}/package.json`);
            console.log(`   - Installed ${dep} version: ${depPackage.version}`);
          } catch (e) {
            console.log(`   - Could not determine installed ${dep} version`);
          }
        }
      }
    }
    
    console.log('✅ Environment is ready for Vite build');
  } catch (error) {
    console.error('⛔ Error in vite-build-plugin:', error);
    // Don't fail the build, just log the error
  }
}; 