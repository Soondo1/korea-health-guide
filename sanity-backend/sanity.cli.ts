import {defineCliConfig} from 'sanity/cli'

// Use environment variables if available, otherwise use placeholder values for local development
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || '4zq6kq5m';
const dataset = process.env.SANITY_STUDIO_DATASET || 'k-are1';

export default defineCliConfig({
  api: {
    projectId,
    dataset
  },
  /**
   * Enable auto-updates for studios.
   * Learn more at https://www.sanity.io/docs/cli#auto-updates
   */
  autoUpdates: true,
})
