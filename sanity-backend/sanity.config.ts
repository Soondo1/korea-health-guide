import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'K-are',

  projectId: '4zq6kq5m',
  dataset: 'k-are1',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
