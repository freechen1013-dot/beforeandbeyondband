import { defineType, defineField } from 'sanity'
import { localizedText } from '../lib/localizedFields'

export default defineType({
  name: 'performance',
  title: 'Performance',
  type: 'document',
  fields: [
    defineField({ name: 'year', title: 'Year', type: 'number' }),
    defineField({ name: 'date', title: 'Date', type: 'datetime' }),
    defineField({ name: 'venue', title: 'Venue', type: 'string' }),
    localizedText('description', 'Description'),
    defineField({ name: 'photos', title: 'Photos', type: 'array', of: [{ type: 'image', options: { hotspot: true } }] }),
  ],
  orderings: [{ title: 'Date', name: 'dateDesc', by: [{ field: 'date', direction: 'desc' }] }],
})
