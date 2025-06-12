import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes/index.js'

// Use environment variables if available, otherwise use placeholder values for local development
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || '4zq6kq5m';
const dataset = process.env.SANITY_STUDIO_DATASET || 'k-are1';

export default defineConfig({
  name: 'default',
  title: 'K-are',

  projectId,
  dataset,

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
