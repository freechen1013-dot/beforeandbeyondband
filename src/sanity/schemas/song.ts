import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'song',
  title: 'Song',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'composer', title: 'Composer', type: 'string' }),
    defineField({ name: 'year', title: 'Year', type: 'number' }),
    defineField({ name: 'era', title: 'Era', type: 'string' }),
    defineField({ name: 'genre', title: 'Genre', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
    defineField({ name: 'coverArt', title: 'Cover Art', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'performanceVideo', title: 'Performance Video', type: 'url' }),
    defineField({ name: 'songUrl', title: 'Song URL', type: 'url' }),
  ],
})
