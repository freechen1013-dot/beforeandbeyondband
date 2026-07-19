import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './schemas'
import { TranslateAction } from './lib/TranslateAction'

export default defineConfig({
  name: 'default',
  title: 'Before and Beyond',
  projectId: '73xn8klv',
  dataset: 'production',
  plugins: [structureTool()],
  schema: { types: schemaTypes },
  document: {
    actions: (prev) => [TranslateAction, ...prev],
  },
})
