import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'siteTitle', title: 'Site Title', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
    defineField({ name: 'igUrl', title: 'Instagram URL', type: 'url' }),
    defineField({ name: 'ytUrl', title: 'YouTube URL', type: 'url' }),
    defineField({ name: 'footerCredit', title: 'Footer Credit', type: 'string' }),
  ],
})
