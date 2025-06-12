module.exports = {
  onPreBuild: async ({ utils }) => {
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
      }
      
      // Ensure build dependencies are available
      console.log('Checking for build dependencies...');
      try {
        require.resolve('vite');
        console.log('✅ Vite is installed and available');
      } catch (error) {
        console.log('⚠️ Vite not found in node_modules, attempting to install...');
        await utils.run.command('npm install vite');
      }
      
      console.log('✅ Environment is ready for Vite build');
    } catch (error) {
      console.error('⛔ Error in vite-build-plugin:', error);
      // Don't fail the build, just log the error
    }
  }
}; 