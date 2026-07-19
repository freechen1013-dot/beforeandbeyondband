import { defineType, defineField } from 'sanity'
import { localizedString, localizedText } from '../lib/localizedFields'

export default defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    localizedString('title', 'Title'),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title.en' } }),
    defineField({ name: 'content', title: 'Content', type: 'blockContent' }),
    localizedText('excerpt', 'Excerpt'),
    defineField({ name: 'publishedAt', title: 'Published At', type: 'datetime' }),
    defineField({ name: 'author', title: 'Author', type: 'string' }),
    defineField({ name: 'coverImage', title: 'Cover Image', type: 'image', options: { hotspot: true } }),
  ],
})
