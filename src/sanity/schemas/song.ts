import { defineType, defineField } from 'sanity'
import { localizedString, localizedText } from '../lib/localizedFields'

export default defineType({
  name: 'song',
  title: 'Song',
  type: 'document',
  fields: [
    localizedString('title', 'Title'),
    localizedString('composer', 'Composer'),
    defineField({ name: 'year', title: 'Year', type: 'number' }),
    defineField({ name: 'era', title: 'Era', type: 'string' }),
    defineField({ name: 'genre', title: 'Genre', type: 'string' }),
    defineField({ name: 'performances', title: 'Performance Count', type: 'number', initialValue: 1 }),
    localizedText('description', 'Description'),
    defineField({ name: 'coverArt', title: 'Cover Art', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'performanceVideo', title: 'Performance Video', type: 'url' }),
    defineField({ name: 'songUrl', title: 'Song URL', type: 'url' }),
  ],
})
