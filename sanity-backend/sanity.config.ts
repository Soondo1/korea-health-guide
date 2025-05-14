import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes/index.js'

export default defineConfig({
  name: 'default',
  title: 'K-are',

  projectId: '4zq6kq5m',
  dataset: 'k-are1',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
